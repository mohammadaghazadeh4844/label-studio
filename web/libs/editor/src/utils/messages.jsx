import { htmlEscape } from "./html";
import i18n from "i18next";

const URL_CORS_DOCS = "https://labelstud.io/guide/storage.html#Troubleshoot-CORS-and-access-problems";
const URL_TAGS_DOCS = "https://labelstud.io/tags";

const t = (key, params = {}) => i18n.t(key, { ...params, interpolation: { escapeValue: false } });

export default {
  DONE: t("editorMessages.done"),
  NO_COMP_LEFT: t("editorMessages.noCompLeft"),
  NO_NEXT_TASK: t("editorMessages.noNextTask"),
  NO_ACCESS: t("editorMessages.noAccess"),

  CONFIRM_TO_DELETE_ALL_REGIONS: t("editorMessages.confirmDeleteAllRegions"),

  // Tree validation messages
  ERR_REQUIRED: ({ modelName, field }) => {
    return t("editorMessages.errRequired", { modelName, field });
  },

  ERR_UNKNOWN_TAG: ({ modelName, field, value }) => {
    return t("editorMessages.errUnknownTag", { modelName, field, value });
  },

  ERR_TAG_NOT_FOUND: ({ modelName, field, value }) => {
    return t("editorMessages.errTagNotFound", { modelName, field, value });
  },

  ERR_TAG_UNSUPPORTED: ({ modelName, field, value, validType }) => {
    const valid = [].concat(validType).join(", ");
    return t("editorMessages.errTagUnsupported", { modelName, field, value, validType: valid });
  },

  ERR_PARENT_TAG_UNEXPECTED: ({ validType, value }) => {
    const valid = [].concat(validType).join(", ");
    return t("editorMessages.errParentTagUnexpected", { validType: valid, value });
  },

  ERR_BAD_TYPE: ({ modelName, field, validType }) => {
    return t("editorMessages.errBadType", { modelName, field, validType });
  },

  ERR_INTERNAL: ({ value }) => {
    return t("editorMessages.errInternal", { value });
  },

  ERR_GENERAL: ({ value }) => {
    return t("editorMessages.errGeneral", { value });
  },

  // Object loading errors
  URL_CORS_DOCS,
  URL_TAGS_DOCS,

  ERR_LOADING_AUDIO({ attr, url, error }) {
    return (
      <div data-testid="error:audio">
        <p>{t("editorMessages.errLoadingAudio.message", { attr })}</p>
        <p>{t("editorMessages.errLoadingAudio.description", { error })}</p>
        <p>{t("editorMessages.errLoadingAudio.url", { url: htmlEscape(url) })}</p>
      </div>
    );
  },

  ERR_LOADING_S3({ attr, url }) {
    return t("editorMessages.errLoadingS3", {
      attr,
      url: htmlEscape(url),
      urlEscaped: encodeURI(url),
    });
  },

  ERR_LOADING_CORS({ attr, url }) {
    return t("editorMessages.errLoadingCORS", {
      attr,
      corsDocs: URL_CORS_DOCS,
      url: htmlEscape(url),
      urlEscaped: encodeURI(url),
    });
  },

  ERR_LOADING_HTTP({ attr, url, error }) {
    return t("editorMessages.errLoadingHTTP", {
      attr,
      url: htmlEscape(url),
      urlEscaped: encodeURI(url),
      error,
      corsDocs: URL_CORS_DOCS,
    });
  },
};
