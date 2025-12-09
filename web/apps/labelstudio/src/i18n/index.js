import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import faCommon from "./locales/fa/common.json";
import enCommon from "./locales/en/common.json";

const resources = {
  fa: { translation: faCommon },
  en: { translation: enCommon },
};

const language =
  window?.APP_SETTINGS?.language ||
  window?.APP_SETTINGS?.locale ||
  navigator?.language?.split?.("-")?.[0] ||
  "fa";

i18n.use(initReactI18next).init({
  resources,
  lng: language,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
