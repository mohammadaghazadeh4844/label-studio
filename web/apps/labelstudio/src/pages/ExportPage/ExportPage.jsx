import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { Button } from "@humansignal/ui";
import { Form, Input } from "../../components/Form";
import { Modal } from "../../components/Modal/Modal";
import { Space } from "../../components/Space/Space";
import { useAPI } from "../../providers/ApiProvider";
import { useFixedLocation, useParams } from "../../providers/RoutesProvider";
import { cn } from "../../utils/bem";
import { isDefined } from "../../utils/helpers";
import "./ExportPage.scss";
import { useTranslation, Trans } from "react-i18next";

// const formats = {
//   json: 'JSON',
//   csv: 'CSV',
// };

const downloadFile = (blob, filename) => {
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

const wait = () => new Promise((resolve) => setTimeout(resolve, 5000));

export const ExportPage = () => {
  const history = useHistory();
  const location = useFixedLocation();
  const pageParams = useParams();
  const api = useAPI();
  const { t } = useTranslation();

  const [previousExports, setPreviousExports] = useState([]);
  const [downloading, setDownloading] = useState(false);
  const [downloadingMessage, setDownloadingMessage] = useState(false);
  const [availableFormats, setAvailableFormats] = useState([]);
  const [currentFormat, setCurrentFormat] = useState("JSON");

  /** @type {import('react').RefObject<Form>} */
  const form = useRef();

  const proceedExport = async () => {
    setDownloading(true);

    const message = setTimeout(() => {
      setDownloadingMessage(true);
    }, 1000);

    const params = form.current.assembleFormData({
      asJSON: true,
      full: true,
      booleansAsNumbers: true,
    });

    const response = await api.callApi("exportRaw", {
      params: {
        pk: pageParams.id,
        ...params,
      },
    });

    if (response.ok) {
      const blob = await response.blob();

      downloadFile(blob, response.headers.get("filename"));
    } else {
      api.handleError(response);
    }

    setDownloading(false);
    setDownloadingMessage(false);
    clearTimeout(message);
  };

  useEffect(() => {
    if (isDefined(pageParams.id)) {
      api
        .callApi("previousExports", {
          params: {
            pk: pageParams.id,
          },
        })
        .then(({ export_files }) => {
          setPreviousExports(export_files.slice(0, 1));
        });

      api
        .callApi("exportFormats", {
          params: {
            pk: pageParams.id,
          },
        })
        .then((formats) => {
          setAvailableFormats(formats);
          setCurrentFormat(formats[0]?.name);
        });
    }
  }, [pageParams]);

  return (
    <Modal
      onHide={() => {
        const path = location.pathname.replace(ExportPage.path, "");
        const search = location.search;

        history.replace(`${path}${search !== "?" ? search : ""}`);
      }}
      title={t("export.title")}
      style={{ width: 720 }}
      closeOnClickOutside={false}
      allowClose={!downloading}
      // footer="Read more about supported export formats in the Documentation."
      visible
    >
      <div className={cn("export-page").toClassName()}>
        <FormatInfo
          availableFormats={availableFormats}
          selected={currentFormat}
          onClick={(format) => setCurrentFormat(format.name)}
        />

        <Form ref={form}>
          <Input type="hidden" name="exportType" value={currentFormat} />
        </Form>

        <div className={cn("export-page").elem("footer").toClassName()}>
          <Space style={{ width: "100%" }} spread>
            <div className={cn("export-page").elem("recent").toClassName()}>{/* {exportHistory} */}</div>
            <div className={cn("export-page").elem("actions").toClassName()}>
              <Space>
                {downloadingMessage && t("export.preparing")}
                <Button className="w-[135px]" onClick={proceedExport} waiting={downloading} aria-label={t("export.aria")}>
                  {t("export.action")}
                </Button>
              </Space>
            </div>
          </Space>
        </div>
      </div>
    </Modal>
  );
};

const FormatInfo = ({ availableFormats, selected, onClick }) => {
  const { t } = useTranslation();
  return (
    <div className={cn("formats").toClassName()}>
      <div className={cn("formats").elem("info").toClassName()}>
        {t("export.info")}
      </div>
      <div className={cn("formats").elem("list").toClassName()}>
        {availableFormats.filter((format) => !format.disabled).map((format) => (
          <div
            key={format.name}
            className={cn("formats")
              .elem("item")
              .mod({
                active: !format.disabled,
                selected: format.name === selected,
              })
              .toClassName()}
            onClick={() => onClick(format)}
          >
            <div className={cn("formats").elem("name").toClassName()}>
              {format.title}

              <Space size="small">
                {format.tags?.map?.((tag, index) => (
                  <div key={index} className={cn("formats").elem("tag").toClassName()}>
                    {tag}
                  </div>
                ))}
              </Space>
            </div>

            {format.description && (
              <div className={cn("formats").elem("description").toClassName()}>{format.description}</div>
            )}
          </div>
        ))}
      </div>
      <div className={cn("formats").elem("feedback").toClassName()}>
        <Trans
          i18nKey="export.feedback"
          // components={{
          //   slack: (
          //     <a
          //       className="no-go"
          //       href="https://slack.labelstud.io/?source=product-export"
          //       target="_blank"
          //       rel="noreferrer"
          //     />
          //   ),
          //   repo: (
          //     <a
          //       className="no-go"
          //       href="https://github.com/HumanSignal/label-studio-converter/issues"
          //       target="_blank"
          //       rel="noreferrer"
          //     />
          //   ),
          //   br: <br />,
          // }}
        >
          Can't find an export format?
          <br />
          Please let us know in <slack>Slack</slack> or submit an issue to the <repo>Repository</repo>
        </Trans>
      </div>
    </div>
  );
};

ExportPage.path = "/export";
ExportPage.modal = true;
