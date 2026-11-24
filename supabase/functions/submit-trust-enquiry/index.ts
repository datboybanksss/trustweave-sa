import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { createClient } from 'npm:@supabase/supabase-js@2.119.0'
import { z } from 'npm:zod@3.25.76'

const OWNER_EMAIL = 'mylegacy@legacybuilder.co.za'
const CONSENT_VERSION = 'trust-enquiry-2026-11-24-v1'
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 15 * 60 * 1000

const optionalText = (max: number) =>
  z.preprocess((value) => value === '' ? null : value, z.string().trim().max(max).nullable().optional())

const campaignValue = z.preprocess(
  (value) => value === '' || value === undefined ? null : value,
  z.string().trim().max(120).regex(/^[A-Za-z0-9_.:-]+$/).nullable().optional(),
)

const bodySchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40)
    .regex(/^\+?[0-9\s().-]+$/)
    .refine((value) => {
      const digits = value.replace(/\D/g, '').length
      return digits >= 7 && digits <= 15
    }),
  primaryGoal: z.enum(['family_planning', 'business_succession', 'property_investments', 'review_existing_trust', 'guidance']),
  preferredContact: z.enum(['email', 'phone', 'whatsapp']),
  preferredLanguage: z.enum(['en', 'af', 'zu', 'xh', 'nr', 'ss', 'nso', 'st', 'tn', 've', 'ts']).default('en'),
  province: optionalText(100),
  intendedTimeframe: z.preprocess(
    (value) => value === '' || value === undefined ? null : value,
    z.enum(['asap', 'within_3_months', 'exploring']).nullable().optional(),
  ),
  message: optionalText(2000),
  consent: z.literal(true),
  website: z.string().max(200).optional(),
  submissionKey: z.string().uuid(),
  sourcePage: z.enum(['/trust-enquiry', '/trust-builder', '/']),
  utmSource: campaignValue,
  utmMedium: campaignValue,
  utmCampaign: campaignValue,
}).strict()

const goalLabels = {
  family_planning: 'Family planning',
  business_succession: 'Business succession',
  property_investments: 'Property or investments',
  review_existing_trust: 'Review an existing trust',
  guidance: 'Not sure, I need guidance',
} as const

function response(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

async function hashedNetworkKey(request: Request, secret: string) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const networkAddress = request.headers.get('cf-connecting-ip') || forwarded || 'unknown'
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(networkAddress))
  return Array.from(new Uint8Array(signature)).map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  if (request.method !== 'POST') {
    return response({ error: 'Method not allowed' }, 405)
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceRoleKey) {
    return response({ error: 'Submission service is not configured' }, 503)
  }

  let input: unknown
  try {
    input = await request.json()
  } catch {
    return response({ error: 'Invalid request body' }, 400)
  }

  const parsed = bodySchema.safeParse(input)
  if (!parsed.success) {
    return response({ error: 'Please check the submitted fields' }, 400)
  }

  const values = parsed.data
  if (values.website) {
    return response({ success: true, duplicate: false, notificationStatus: 'not_configured' })
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const existing = await supabase
    .from('trust_enquiries')
    .select('id, notification_status')
    .eq('submission_key', values.submissionKey)
    .maybeSingle()

  if (existing.error) {
    return response({ error: 'Unable to check this submission' }, 503)
  }
  if (existing.data) {
    return response({
      success: true,
      duplicate: true,
      notificationStatus: existing.data.notification_status,
    })
  }

  const rateKey = await hashedNetworkKey(request, serviceRoleKey)
  const windowStart = new Date(Math.floor(Date.now() / RATE_WINDOW_MS) * RATE_WINDOW_MS).toISOString()
  const rateLimit = await supabase.rpc('consume_trust_enquiry_rate_limit', {
    _rate_key: rateKey,
    _window_start: windowStart,
    _limit: RATE_LIMIT,
  })

  if (rateLimit.error) {
    return response({ error: 'Unable to process this submission' }, 503)
  }
  if (typeof rateLimit.data === 'number' && rateLimit.data > RATE_LIMIT) {
    return response({ error: 'Too many enquiries. Please try again later.' }, 429)
  }

  const isTest = /(?:^|\s)TEST(?:\s|:|$)/i.test(values.fullName) || /\[TEST\]/i.test(values.message || '')
  const inserted = await supabase
    .from('trust_enquiries')
    .insert({
      full_name: values.fullName,
      email: values.email.toLowerCase(),
      phone: values.phone,
      primary_goal: values.primaryGoal,
      preferred_contact_method: values.preferredContact,
      preferred_language: values.preferredLanguage,
      province: values.province || null,
      intended_timeframe: values.intendedTimeframe || null,
      message: values.message || null,
      consent: values.consent,
      consent_version: CONSENT_VERSION,
      consented_at: new Date().toISOString(),
      status: 'new',
      source_page: values.sourcePage,
      utm_source: values.utmSource || null,
      utm_medium: values.utmMedium || null,
      utm_campaign: values.utmCampaign || null,
      submission_key: values.submissionKey,
      notification_status: 'pending',
      is_test: isTest,
    })
    .select('id')
    .single()

  if (inserted.error?.code === '23505') {
    const duplicate = await supabase
      .from('trust_enquiries')
      .select('notification_status')
      .eq('submission_key', values.submissionKey)
      .single()
    if (!duplicate.error) {
      return response({ success: true, duplicate: true, notificationStatus: duplicate.data.notification_status })
    }
  }

  if (inserted.error || !inserted.data) {
    return response({ error: 'Unable to save this enquiry' }, 503)
  }

  const enquiryId = inserted.data.id
  let notificationStatus = 'not_configured'
  let notificationError: string | null = 'Owner email sender is not configured'
  let notifiedAt: string | null = null

  if (Deno.env.get('TRUST_ENQUIRY_NOTIFICATIONS_ENABLED') === 'true') {
    try {
      const notification = await fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${serviceRoleKey}`,
          apikey: serviceRoleKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateName: 'trust-enquiry-notification',
          recipientEmail: OWNER_EMAIL,
          idempotencyKey: `trust-enquiry-owner-${enquiryId}`,
          templateData: {
            enquiryId,
            fullName: values.fullName,
            email: values.email,
            phone: values.phone,
            primaryGoal: goalLabels[values.primaryGoal],
            preferredContact: values.preferredContact,
            preferredLanguage: values.preferredLanguage,
            province: values.province || '',
            intendedTimeframe: values.intendedTimeframe || '',
            message: values.message || '',
            isTest,
          },
          replyTo: values.email,
        }),
      })

      if (notification.ok) {
        notificationStatus = 'sent'
        notificationError = null
        notifiedAt = new Date().toISOString()
      } else {
        notificationStatus = 'failed'
        notificationError = `Owner email service returned HTTP ${notification.status}`
      }
    } catch {
      notificationStatus = 'failed'
      notificationError = 'Owner email service could not be reached'
    }
  }

  await supabase
    .from('trust_enquiries')
    .update({
      notification_status: notificationStatus,
      notification_error: notificationError?.slice(0, 300) || null,
      notified_at: notifiedAt,
      updated_at: new Date().toISOString(),
    })
    .eq('id', enquiryId)

  return response({ success: true, duplicate: false, notificationStatus })
})
