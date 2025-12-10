import { useMemo, useState } from "react";
import { useHistory } from "react-router";
import { Button, Typography, useToast } from "@humansignal/ui";
import { useUpdatePageTitle, createTitleFromSegments } from "@humansignal/core";
import { Label } from "../../components/Form";
import { modal } from "../../components/Modal/Modal";
import { useModalControls } from "../../components/Modal/ModalPopup";
import Input from "../../components/Form/Elements/Input/Input";
import { Space } from "../../components/Space/Space";
import { Spinner } from "../../components/Spinner/Spinner";
import { useAPI } from "../../providers/ApiProvider";
import { useProject } from "../../providers/ProjectProvider";
import { cn } from "../../utils/bem";
import { useTranslation } from "react-i18next";

export const DangerZone = () => {
  const { project } = useProject();
  const api = useAPI();
  const history = useHistory();
  const toast = useToast();
  const [processing, setProcessing] = useState(null);
  const { t } = useTranslation();

  useUpdatePageTitle(createTitleFromSegments([project?.title, t("settings.danger.title")]));

  const showDangerConfirmation = ({ title, message, requiredWord, buttonText, onConfirm }) => {
    const isDev = process.env.NODE_ENV === "development";

    return modal({
      title,
      width: 600,
      allowClose: false,
      body: () => {
        const ctrl = useModalControls();
        const inputValue = ctrl?.state?.inputValue || "";

        return (
          <div>
            <Typography variant="body" size="medium" className="mb-tight">
              {message}
            </Typography>
            <Input
              label={t("settings.danger.confirmPrompt", { word: requiredWord })}
              value={inputValue}
              onChange={(e) => ctrl?.setState({ inputValue: e.target.value })}
              autoFocus
              data-testid="danger-zone-confirmation-input"
              autoComplete="off"
            />
          </div>
        );
      },
      footer: () => {
        const ctrl = useModalControls();
        const inputValue = (ctrl?.state?.inputValue || "").trim().toLowerCase();
        const isValid = isDev || inputValue === requiredWord.toLowerCase();

        return (
          <Space align="end">
            <Button variant="neutral" look="outline" onClick={() => ctrl?.hide()} data-testid="danger-zone-cancel-button">
              {t("common.cancel")}
            </Button>
            <Button
              variant="negative"
              disabled={!isValid}
              onClick={async () => {
                await onConfirm();
                ctrl?.hide();
              }}
              data-testid="danger-zone-confirm-button"
            >
              {buttonText}
            </Button>
          </Space>
        );
      },
    });
  };

  const handleOnClick = (type) => () => {
    const actionConfig = {
      reset_cache: {
        title: t("settings.danger.resetCache.title"),
        message: (
          <>
            {t("settings.danger.resetCache.message", { title: project.title })}
          </>
        ),
        requiredWord: t("settings.danger.resetCache.word"),
        buttonText: t("settings.danger.resetCache.button"),
      },
      tabs: {
        title: t("settings.danger.dropTabs.title"),
        message: (
          <>
            {t("settings.danger.dropTabs.message", { title: project.title })}
          </>
        ),
        requiredWord: t("settings.danger.dropTabs.word"),
        buttonText: t("settings.danger.dropTabs.button"),
      },
      project: {
        title: t("settings.danger.deleteProject.title"),
        message: (
          <>
            {t("settings.danger.deleteProject.message", { title: project.title })}
          </>
        ),
        requiredWord: t("settings.danger.deleteProject.word"),
        buttonText: t("settings.danger.deleteProject.button"),
      },
    };

    const config = actionConfig[type];

    if (!config) {
      return;
    }

    showDangerConfirmation({
      ...config,
      onConfirm: async () => {
        setProcessing(type);
        try {
          if (type === "reset_cache") {
            await api.callApi("projectResetCache", {
              params: {
                pk: project.id,
              },
            });
            toast.show({ message: t("settings.danger.resetCache.success") });
          } else if (type === "tabs") {
            await api.callApi("deleteTabs", {
              body: {
                project: project.id,
              },
            });
            toast.show({ message: t("settings.danger.dropTabs.success") });
          } else if (type === "project") {
            await api.callApi("deleteProject", {
              params: {
                pk: project.id,
              },
            });
            toast.show({ message: t("settings.danger.deleteProject.success") });
            history.replace("/projects");
          }
        } catch (error) {
          toast.show({ message: t("settings.danger.error", { error: error.message }), type: "error" });
        } finally {
          setProcessing(null);
        }
      },
    });
  };

  const buttons = useMemo(
    () => [
      {
        type: "annotations",
        disabled: true,
        label: t("settings.danger.deleteAnnotations", { count: project.total_annotations_number }),
      },
      {
        type: "tasks",
        disabled: true,
        label: t("settings.danger.deleteTasks", { count: project.task_number }),
      },
      {
        type: "predictions",
        disabled: true,
        label: t("settings.danger.deletePredictions", { count: project.total_predictions_number }),
      },
      {
        type: "reset_cache",
        help: t("settings.danger.resetCache.help"),
        label: t("settings.danger.resetCache.title"),
      },
      {
        type: "tabs",
        help: t("settings.danger.dropTabs.help"),
        label: t("settings.danger.dropTabs.title"),
      },
      {
        type: "project",
        help: t("settings.danger.deleteProject.help"),
        label: t("settings.danger.deleteProject.title"),
      },
    ],
    [project, t],
  );

  return (
    <div className={cn("simple-settings")}>
      <Typography variant="headline" size="medium" className="mb-tighter">
        {t("settings.danger.title")}
      </Typography>
      <Typography variant="body" size="medium" className="text-neutral-content-subtler !mb-base">
        {t("settings.danger.subtitle")}
      </Typography>

      {project.id ? (
        <div style={{ marginTop: 16 }}>
          {buttons.map((btn) => {
            const waiting = processing === btn.type;
            const disabled = btn.disabled || (processing && !waiting);

            return (
              btn.disabled !== true && (
                <div className={cn("settings-wrapper")} key={btn.type}>
                  <Typography variant="title" size="large">
                    {btn.label}
                  </Typography>
                  {btn.help && <Label description={btn.help} style={{ width: 600, display: "block" }} />}
                  <Button
                    key={btn.type}
                    variant="negative"
                    look="outlined"
                    disabled={disabled}
                    waiting={waiting}
                    onClick={handleOnClick(btn.type)}
                    style={{ marginTop: 16 }}
                  >
                    {btn.label}
                  </Button>
                </div>
              )
            );
          })}
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
          <Spinner size={32} />
        </div>
      )}
    </div>
  );
};

DangerZone.title = "Danger Zone";
DangerZone.path = "/danger-zone";
