import { formatDistanceToNow, format, parseISO } from "date-fns";
import { useCallback, useContext } from "react";

import truncate from "truncate-middle";
import { Menu } from "../../../components";
import { Button, Dropdown } from "@humansignal/ui";
import { confirm } from "../../../components/Modal/Modal";
import { Oneof } from "../../../components/Oneof/Oneof";
import { IconEllipsis } from "@humansignal/icons";
import { Tooltip } from "@humansignal/ui";
import { ApiContext } from "../../../providers/ApiProvider";
import { cn } from "../../../utils/bem";
import { useTranslation } from "react-i18next";

import "./MachineLearningList.scss";

export const MachineLearningList = ({ backends, fetchBackends, onEdit, onTestRequest, onStartTraining }) => {
  const api = useContext(ApiContext);
  const { t } = useTranslation();

  const onDeleteModel = useCallback(
    async (backend) => {
      await api.callApi("deleteMLBackend", {
        params: {
          pk: backend.id,
        },
      });
      await fetchBackends();
    },
    [fetchBackends, api],
  );

  return (
    <div>
      {backends.map((backend) => (
        <BackendCard
          key={backend.id}
          backend={backend}
          onStartTrain={onStartTraining}
          onDelete={onDeleteModel}
          onEdit={onEdit}
          onTestRequest={onTestRequest}
        />
      ))}
    </div>
  );
};

const BackendCard = ({ backend, onStartTrain, onEdit, onDelete, onTestRequest }) => {
  const { t } = useTranslation();
  const confirmDelete = useCallback(
    (backend) => {
      confirm({
        title: t("settings.ml.deleteTitle"),
        body: t("settings.ml.deleteBody"),
        buttonLook: "destructive",
        onOk() {
          onDelete?.(backend);
        },
      });
    },
    [backend, onDelete, t],
  );

  const rootClass = cn("backend-card");

  return (
    <div className={rootClass.toClassName()}>
      <div className={rootClass.elem("title-container")}>
        <div>
          <BackendState backend={backend} />
          <div className={rootClass.elem("title")}>{backend.title}</div>
        </div>

        <div className={rootClass.elem("menu")}>
          <Dropdown.Trigger
            align="right"
            content={
              <Menu size="medium" contextual>
                <Menu.Item onClick={() => onEdit(backend)}>{t("settings.ml.menu.edit")}</Menu.Item>
                <Menu.Item onClick={() => onTestRequest(backend)}>{t("settings.ml.menu.test")}</Menu.Item>
                <Menu.Item onClick={() => onStartTrain(backend)}>{t("settings.ml.menu.train")}</Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={() => confirmDelete(backend)} isDangerous>
                  {t("settings.ml.menu.delete")}
                </Menu.Item>
              </Menu>
            }
          >
            <Button
              look="string"
              size="small"
              className="!p-0"
              aria-label={t("settings.ml.menu.optionsAria")}
            >
              <IconEllipsis />
            </Button>
          </Dropdown.Trigger>
        </div>
      </div>

      <div className={rootClass.elem("meta")}>
        <div className={rootClass.elem("group")}>{truncate(backend.url, 20, 10, "...")}</div>
        <div className={rootClass.elem("group")}>
          <Tooltip title={format(parseISO(backend.created_at), "yyyy-MM-dd HH:mm:ss")}>
            <span>
              {t("settings.ml.createdPrefix")}
              {formatDistanceToNow(parseISO(backend.created_at), {
                addSuffix: true,
              })}
            </span>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

const BackendState = ({ backend }) => {
  const { t } = useTranslation();
  const { state } = backend;

  return (
    <div className={cn("ml").elem("status")}>
      <span className={cn("ml").elem("indicator").mod({ state })} />
      <Oneof value={state} className={cn("ml").elem("status-label")}>
        <span case="DI">{t("settings.ml.status.DI")}</span>
        <span case="CO">{t("settings.ml.status.CO")}</span>
        <span case="ER">{t("settings.ml.status.ER")}</span>
        <span case="TR">{t("settings.ml.status.TR")}</span>
        <span case="PR">{t("settings.ml.status.PR")}</span>
      </Oneof>
    </div>
  );
};
