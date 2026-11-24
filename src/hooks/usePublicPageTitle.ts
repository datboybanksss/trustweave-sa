import { useEffect } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";

export function usePublicPageTitle(key: "meta.homeTitle" | "meta.trustTitle" | "meta.notFoundTitle") {
  const { t } = useI18n();
  useEffect(() => {
    document.title = t(key);
  }, [key, t]);
}
