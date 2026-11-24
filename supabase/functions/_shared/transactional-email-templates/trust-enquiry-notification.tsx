import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  enquiryId?: string
  fullName?: string
  email?: string
  phone?: string
  primaryGoal?: string
  preferredContact?: string
  preferredLanguage?: string
  province?: string
  intendedTimeframe?: string
  message?: string
  isTest?: boolean
}

const timeframeLabels: Record<string, string> = {
  asap: 'As soon as possible',
  within_3_months: 'Within 3 months',
  exploring: 'Still exploring',
}

const languageLabels: Record<string, string> = {
  en: 'English', af: 'Afrikaans', zu: 'isiZulu', xh: 'isiXhosa', nr: 'isiNdebele', ss: 'siSwati',
  nso: 'Sepedi', st: 'Sesotho', tn: 'Setswana', ve: 'Tshivenda', ts: 'Xitsonga',
}

const provinceLabels: Record<string, string> = {
  eastern_cape: 'Eastern Cape', free_state: 'Free State', gauteng: 'Gauteng', kwazulu_natal: 'KwaZulu-Natal',
  limpopo: 'Limpopo', mpumalanga: 'Mpumalanga', northern_cape: 'Northern Cape', north_west: 'North West',
  western_cape: 'Western Cape', outside_south_africa: 'Outside South Africa',
}

const Email = ({
  enquiryId,
  fullName,
  email,
  phone,
  primaryGoal,
  preferredContact,
  preferredLanguage,
  province,
  intendedTimeframe,
  message,
  isTest,
}: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{isTest ? 'TEST — ' : ''}New LegacyBuilder trust enquiry{fullName ? ` from ${fullName}` : ''}</Preview>
    <Body style={main}>
      <Container style={container}>
        {isTest && <Text style={testBanner}>TEST ENQUIRY — synthetic test data</Text>}
        <Heading style={heading}>New LegacyBuilder trust enquiry</Heading>
        <Text style={text}>A visitor submitted the trust enquiry form. Their details are below.</Text>
        <Section style={details}>
          <Text style={detail}><strong>Name:</strong> {fullName || 'Not provided'}</Text>
          <Text style={detail}><strong>Email:</strong> {email || 'Not provided'}</Text>
          <Text style={detail}><strong>Phone:</strong> {phone || 'Not provided'}</Text>
          <Text style={detail}><strong>Primary goal:</strong> {primaryGoal || 'Not provided'}</Text>
          <Text style={detail}><strong>Preferred contact:</strong> {preferredContact || 'Not provided'}</Text>
          <Text style={detail}><strong>Website language:</strong> {languageLabels[preferredLanguage || 'en'] || 'English'}</Text>
          {province && <Text style={detail}><strong>Province:</strong> {provinceLabels[province] || province}</Text>}
          {intendedTimeframe && <Text style={detail}><strong>Timeframe:</strong> {timeframeLabels[intendedTimeframe] || intendedTimeframe}</Text>}
        </Section>
        {message && (
          <Section>
            <Heading as="h2" style={subheading}>Visitor message</Heading>
            <Text style={messageStyle}>{message}</Text>
          </Section>
        )}
        <Hr style={divider} />
        <Text style={footer}>Enquiry reference: {enquiryId || 'Not available'}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'New LegacyBuilder trust enquiry',
  displayName: 'Trust enquiry owner notification',
  to: 'mylegacy@legacybuilder.co.za',
  previewData: {
    enquiryId: 'TEST-0000-0000',
    fullName: 'TEST Thandi Example',
    email: 'test@example.com',
    phone: '+27 82 123 4567',
    primaryGoal: 'Planning for my family',
    preferredContact: 'email',
    preferredLanguage: 'af',
    province: 'gauteng',
    intendedTimeframe: 'within_3_months',
    message: '[TEST] This is a synthetic enquiry used to verify the notification layout.',
    isTest: true,
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '28px 25px', maxWidth: '600px', margin: '0 auto' }
const heading = { color: '#1F3D2B', fontSize: '26px', lineHeight: '1.3', margin: '0 0 16px' }
const subheading = { color: '#1F3D2B', fontSize: '18px', margin: '24px 0 8px' }
const text = { color: '#374151', fontSize: '15px', lineHeight: '1.6' }
const details = { backgroundColor: '#E8DCC4', borderRadius: '8px', padding: '12px 18px', margin: '20px 0' }
const detail = { color: '#1F2937', fontSize: '14px', lineHeight: '1.6', margin: '8px 0', overflowWrap: 'anywhere' as const }
const messageStyle = { ...text, whiteSpace: 'pre-wrap' as const, overflowWrap: 'anywhere' as const }
const testBanner = { backgroundColor: '#FEF3C7', color: '#78350F', fontSize: '13px', fontWeight: 'bold', padding: '10px', textAlign: 'center' as const }
const divider = { borderColor: '#E8DCC4', margin: '24px 0' }
const footer = { color: '#6B7280', fontSize: '12px', overflowWrap: 'anywhere' as const }
