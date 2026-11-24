# Architecture

- Public internationalization uses synchronous checked-in dictionaries in `src/lib/public-translations` through `I18nProvider`, ensuring immediate offline switching and English fallback without API keys or per-visitor translation calls.
