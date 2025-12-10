import { buttonVariant, Space } from "@humansignal/ui";
import { useUpdatePageTitle } from "@humansignal/core";
import { cn } from "apps/labelstudio/src/utils/bem";
import { Link } from "react-router-dom";
import type { Page } from "../../types/Page";
import { EmptyList } from "./@components/EmptyList";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

export const ModelsPage: Page = () => {
  const { t } = useTranslation();

  useUpdatePageTitle(t("organization.models.title"));

  return (
    <div className={cn("prompter").toClassName()}>
      <EmptyList />
    </div>
  );
};

ModelsPage.title = () => i18n.t("organization.models.title");
ModelsPage.titleRaw = "Models";
ModelsPage.path = "/models";

ModelsPage.context = () => {
  const { t } = i18n;
  return (
    <Space size="small">
      <Link to="/prompt/settings" className={buttonVariant({ size: "small" })}>
        {t("organization.models.create")}
      </Link>
    </Space>
  );
};
