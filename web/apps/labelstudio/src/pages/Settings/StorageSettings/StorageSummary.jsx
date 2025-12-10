import { format } from "date-fns/esm";
import { Button, CodeBlock, IconFileCopy, Space, Tooltip } from "@humansignal/ui";
import { DescriptionList } from "../../../components/DescriptionList/DescriptionList";
import { modal } from "../../../components/Modal/Modal";
import { Oneof } from "../../../components/Oneof/Oneof";
import { getLastTraceback } from "../../../utils/helpers";
import { useCopyText } from "@humansignal/core";
import { useTranslation } from "react-i18next";

// Component to handle copy functionality within the modal
const CopyButton = ({ msg }) => {
  const [copyText, copied] = useCopyText({ defaultText: msg });

  return (
    <Button variant="neutral" icon={<IconFileCopy />} onClick={() => copyText()} disabled={copied} className="w-[7rem]">
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
};

export const StorageSummary = ({ target, storage, className, storageTypes = [] }) => {
  const { t } = useTranslation();
  const storageStatus = storage.status.replace(/_/g, " ").replace(/(^\w)/, (match) => match.toUpperCase());
  const last_sync_count = storage.last_sync_count ? storage.last_sync_count : 0;

  const tasks_existed =
    typeof storage.meta?.tasks_existed !== "undefined" && storage.meta?.tasks_existed !== null
      ? storage.meta.tasks_existed
      : 0;
  const total_annotations =
    typeof storage.meta?.total_annotations !== "undefined" && storage.meta?.total_annotations !== null
      ? storage.meta.total_annotations
      : 0;

  // help text for tasks and annotations
  const tasks_added_help = t("settings.storage.summary.tasksAdded", { count: last_sync_count });
  const tasks_total_help = [
    t("settings.storage.summary.tasksExisting", { count: tasks_existed }),
    t("settings.storage.summary.tasksTotal", { count: tasks_existed + last_sync_count }),
  ].join("\n");
  const annotations_help = t("settings.storage.summary.annotationsAdded", { count: last_sync_count });
  const total_annotations_help =
    typeof storage.meta?.total_annotations !== "undefined"
      ? t("settings.storage.summary.annotationsTotal", { count: storage.meta.total_annotations })
      : "";

  const handleButtonClick = () => {
    const msg =
      `Error logs for ${target === "export" ? "export " : ""}${storage.type} ` +
      `storage ${storage.id} in project ${storage.project} and job ${storage.last_sync_job}:\n\n` +
      `${getLastTraceback(storage.traceback)}\n\n` +
      `meta = ${JSON.stringify(storage.meta)}\n`;

    const currentModal = modal({
      title: t("settings.storage.summary.errorLogTitle"),
      body: <CodeBlock code={msg} variant="negative" className="max-h-[50vh] overflow-y-auto" />,
      footer: (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* {!window.APP_SETTINGS?.whitelabel_is_active && (
            <div>
              <>
                <a
                  href="https://labelstud.io/guide/storage.html#Troubleshooting"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={t("settings.storage.summary.troubleshootAria")}
                >
                  {t("settings.storage.summary.troubleshootLink")}
                </a>{" "}
                {t("settings.storage.summary.troubleshootText")}
              </>
            </div>
          )} */}
          <Space>
            <CopyButton msg={msg} />
            <Button variant="primary" className="w-[7rem]" onClick={() => currentModal.close()}>
              {t("common.close")}
            </Button>
          </Space>
        </div>
      ),
      style: { width: "700px" },
      optimize: false,
      allowClose: true,
    });
  };

  return (
    <div className={className}>
      <DescriptionList>
      <DescriptionList.Item term={t("settings.storage.summary.type")}>
        {(storageTypes ?? []).find((s) => s.name === storage.type)?.title ?? storage.type}
      </DescriptionList.Item>

        <Oneof value={storage.type}>
          <SummaryS3 case={["s3", "s3s"]} storage={storage} />
          <GSCStorage case="gcs" storage={storage} />
          <AzureStorage case="azure" storage={storage} />
          <RedisStorage case="redis" storage={storage} />
          <LocalStorage case="localfiles" storage={storage} />
        </Oneof>

        <DescriptionList.Item
          term={t("settings.storage.summary.status")}
          help={t("settings.storage.summary.statusHelp", { returnObjects: true }).join("\n")}
        >
          {storageStatus === "Failed" || storageStatus === "Completed with errors" ? (
            <span
              className="cursor-pointer border-b border-dashed border-negative-border-subtle text-negative-content"
              onClick={handleButtonClick}
            >
              {storageStatus} ({t("settings.storage.summary.viewLogs")})
            </span>
          ) : (
            storageStatus
          )}
        </DescriptionList.Item>

        {target === "export" ? (
          <DescriptionList.Item term={t("settings.storage.summary.annotations")} help={`${annotations_help}\n${total_annotations_help}`}>
            <Tooltip title={annotations_help}>
              <span>{last_sync_count}</span>
            </Tooltip>
            <Tooltip title={total_annotations_help}>
              <span> ({t("settings.storage.summary.totalCount", { count: total_annotations })})</span>
            </Tooltip>
          </DescriptionList.Item>
        ) : (
          <DescriptionList.Item term={t("settings.storage.summary.tasks")} help={`${tasks_added_help}\n${tasks_total_help}`}>
            <Tooltip title={`${tasks_added_help}\n${tasks_total_help}`} style={{ whiteSpace: "pre-wrap" }}>
              <span>{last_sync_count + tasks_existed}</span>
            </Tooltip>
            <Tooltip title={tasks_added_help}>
              <span> ({t("settings.storage.summary.newCount", { count: last_sync_count })})</span>
            </Tooltip>
          </DescriptionList.Item>
        )}

        <DescriptionList.Item term={t("settings.storage.summary.lastSync")}>
          {storage.last_sync ? format(new Date(storage.last_sync), "MMMM dd, yyyy ƒ^T HH:mm:ss") : t("settings.storage.summary.notSynced")}
        </DescriptionList.Item>
      </DescriptionList>
    </div>
  );
};

const SummaryS3 = ({ storage }) => {
  const { t } = useTranslation();
  return <DescriptionList.Item term={t("settings.storage.summary.bucket")}>{storage.bucket}</DescriptionList.Item>;
};

const GSCStorage = ({ storage }) => {
  const { t } = useTranslation();
  return <DescriptionList.Item term={t("settings.storage.summary.bucket")}>{storage.bucket}</DescriptionList.Item>;
};

const AzureStorage = ({ storage }) => {
  const { t } = useTranslation();
  return <DescriptionList.Item term={t("settings.storage.summary.container")}>{storage.container}</DescriptionList.Item>;
};

const RedisStorage = ({ storage }) => {
  const { t } = useTranslation();
  return (
    <>
      <DescriptionList.Item term={t("settings.storage.summary.path")}>{storage.path}</DescriptionList.Item>
      <DescriptionList.Item term={t("settings.storage.summary.host")}>
        {storage.host}
        {storage.port ? `:${storage.port}` : ""}
      </DescriptionList.Item>
    </>
  );
};

const LocalStorage = ({ storage }) => {
  const { t } = useTranslation();
  return <DescriptionList.Item term={t("settings.storage.summary.path")}>{storage.path}</DescriptionList.Item>;
};
