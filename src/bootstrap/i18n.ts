import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "uk",
    debug: false,

    // TODO: check to include all subfiles
    ns: ["common", "pages/404", "pages/500", "pages/login", "pages/register", "pages/posts", "pages/overview"],
    defaultNS: "common",

    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage"],
    },

    supportedLngs: ["uk", "en"],

    react: {
      useSuspense: true,
    },
  });

export default i18n;
