import { Button } from "@humansignal/ui";
import { modal } from "../../components/Modal/Modal";
import { useModalControls } from "../../components/Modal/ModalPopup";
import { Space } from "../../components/Space/Space";
import { cn } from "../../utils/bem";
import i18n from "i18next";

export const WebhookDeleteModal = ({ onDelete }) => {
  return modal({
    title: i18n.t("webhooks.deleteModal.title"),
    body: () => {
      const ctrl = useModalControls();
      const rootClass = cn("webhook-delete-modal");
      return (
        <div className={rootClass}>
          <div className={rootClass.elem("modal-text")}>
            {i18n.t("webhooks.deleteModal.body")}
          </div>
        </div>
      );
    },
    footer: () => {
      const ctrl = useModalControls();
      const rootClass = cn("webhook-delete-modal");
      return (
        <Space align="end">
          <Button
            look="outlined"
            onClick={() => {
              ctrl.hide();
            }}
            aria-label={i18n.t("webhooks.deleteModal.cancelAria")}
          >
            {i18n.t("common.cancel")}
          </Button>
          <Button
            variant="negative"
            onClick={async () => {
              await onDelete();
              ctrl.hide();
            }}
            aria-label={i18n.t("webhooks.deleteModal.confirmAria")}
          >
            {i18n.t("webhooks.form.delete")}
          </Button>
        </Space>
      );
    },
    style: { width: 512 },
  });
};
