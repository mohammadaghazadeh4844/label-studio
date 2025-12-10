import { Button } from "@humansignal/ui";
import { cn } from "apps/labelstudio/src/utils/bem";
import type { FC } from "react";
import "./EmptyList.scss";
import { HeidiAi } from "apps/labelstudio/src/assets/images";
import { useTranslation } from "react-i18next";

export const EmptyList: FC = () => {
  const { t } = useTranslation();
  return (
    <div className={cn("empty-models-list").toClassName()}>
      <div className={cn("empty-models-list").elem("content").toClassName()}>
        <div className={cn("empty-models-list").elem("heidy").toClassName()}>
          <HeidiAi />
        </div>
        <div className={cn("empty-models-list").elem("title").toClassName()}>
          {t("organization.models.empty.title")}
        </div>
        <div className={cn("empty-models-list").elem("caption").toClassName()}>
          {t("organization.models.empty.caption")}
        </div>
        <Button aria-label={t("organization.models.empty.createAria")}>{t("organization.models.empty.create")}</Button>
      </div>
    </div>
  );
};
