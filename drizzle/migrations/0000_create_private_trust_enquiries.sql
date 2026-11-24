CREATE TABLE public.trust_enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  primary_goal TEXT NOT NULL CHECK (primary_goal IN ('family_planning', 'business_succession', 'property_investments', 'review_existing_trust', 'guidance')),
  preferred_contact_method TEXT NOT NULL CHECK (preferred_contact_method IN ('email', 'phone', 'whatsapp')),
  province TEXT,
  intended_timeframe TEXT CHECK (intended_timeframe IS NULL OR intended_timeframe IN ('asap', 'within_3_months', 'exploring')),
  message TEXT,
  consent BOOLEAN NOT NULL CHECK (consent = true),
  consent_version TEXT NOT NULL,
  consented_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'closed')),
  source_page TEXT NOT NULL DEFAULT '/trust-enquiry',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  submission_key UUID NOT NULL UNIQUE,
  notification_status TEXT NOT NULL DEFAULT 'pending' CHECK (notification_status IN ('pending', 'sent', 'failed', 'not_configured')),
  notification_error TEXT,
  notified_at TIMESTAMPTZ,
  is_test BOOLEAN NOT NULL DEFAULT false
);

GRANT ALL ON public.trust_enquiries TO service_role;
REVOKE ALL ON public.trust_enquiries FROM anon, authenticated;
ALTER TABLE public.trust_enquiries ENABLE ROW LEVEL SECURITY;

CREATE INDEX trust_enquiries_created_at_idx ON public.trust_enquiries (created_at DESC);

CREATE TABLE public.trust_enquiry_rate_limits (
  rate_key TEXT PRIMARY KEY,
  window_started_at TIMESTAMPTZ NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 0 CHECK (request_count >= 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT ALL ON public.trust_enquiry_rate_limits TO service_role;
REVOKE ALL ON public.trust_enquiry_rate_limits FROM anon, authenticated;
ALTER TABLE public.trust_enquiry_rate_limits ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.trust_enquiries IS 'Private trust enquiries submitted through the public website. No anonymous or authenticated Data API access.';
COMMENT ON TABLE public.trust_enquiry_rate_limits IS 'Private hashed network counters for public trust enquiry submission protection.';