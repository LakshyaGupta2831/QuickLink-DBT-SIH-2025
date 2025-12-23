import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import global_en from "./locales/en/en.json";
import global_hin from "./locales/hin/hin.json";
import global_mar from "./locales/mar/mar.json";

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: { global: global_en },
    mar: { global: global_mar },
    hin: { global: global_hin },
  },
});

export default i18next;
