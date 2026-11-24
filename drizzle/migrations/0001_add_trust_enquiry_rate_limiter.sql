CREATE OR REPLACE FUNCTION public.consume_trust_enquiry_rate_limit(
  _rate_key TEXT,
  _window_start TIMESTAMPTZ,
  _limit INTEGER
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_count INTEGER;
BEGIN
  IF _limit < 1 OR _limit > 100 THEN
    RAISE EXCEPTION 'Invalid rate limit';
  END IF;

  INSERT INTO public.trust_enquiry_rate_limits (rate_key, window_started_at, request_count, updated_at)
  VALUES (_rate_key, _window_start, 1, now())
  ON CONFLICT (rate_key) DO UPDATE
  SET
    request_count = CASE
      WHEN public.trust_enquiry_rate_limits.window_started_at = EXCLUDED.window_started_at
        THEN public.trust_enquiry_rate_limits.request_count + 1
      ELSE 1
    END,
    window_started_at = EXCLUDED.window_started_at,
    updated_at = now()
  RETURNING request_count INTO current_count;

  RETURN current_count;
END;
$$;

REVOKE ALL ON FUNCTION public.consume_trust_enquiry_rate_limit(TEXT, TIMESTAMPTZ, INTEGER) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_trust_enquiry_rate_limit(TEXT, TIMESTAMPTZ, INTEGER) TO service_role;