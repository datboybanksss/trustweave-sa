ALTER TABLE public.trust_enquiries
  ADD COLUMN preferred_language TEXT NOT NULL DEFAULT 'en';

ALTER TABLE public.trust_enquiries
  ADD CONSTRAINT trust_enquiries_preferred_language_check
  CHECK (preferred_language IN ('en', 'af', 'zu', 'xh', 'nr', 'ss', 'nso', 'st', 'tn', 've', 'ts'));

COMMENT ON COLUMN public.trust_enquiries.preferred_language IS 'Visitor-selected public website language code for appropriate follow-up; does not imply fluent adviser availability or automatic translation.';