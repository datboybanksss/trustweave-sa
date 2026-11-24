import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { usePublicPageTitle } from "@/hooks/usePublicPageTitle";

const NotFound = () => {
  const location = useLocation();
  const { t } = useI18n();
  usePublicPageTitle("meta.notFoundTitle");

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-sand/20 px-4">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t("notFound.message")}</p>
        <Link to="/" className="font-medium text-primary underline underline-offset-4">
          {t("common.returnHome")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
