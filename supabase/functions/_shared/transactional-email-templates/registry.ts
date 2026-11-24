import type * as React from 'npm:react@18.3.1'
import { template as trustEnquiryNotification } from './trust-enquiry-notification.tsx'

export interface TemplateEntry {
  component: React.ComponentType
  subject: string
  displayName?: string
  previewData?: Record<string, unknown>
  to?: string
}

export const TEMPLATES = {
  'trust-enquiry-notification': trustEnquiryNotification,
}
