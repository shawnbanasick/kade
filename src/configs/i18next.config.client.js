import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import config from "./app.config";

const appConfig = require("electron-settings");

let currentLanguage;

if (appConfig.has(`currentLanguage`)) {
  currentLanguage = appConfig.get(`currentLanguage`);
} else {
  currentLanguage = "en";
}

const i18nextOptions = {
  backend: {
    // path where resources get loaded from
    // loadPath: "../../public/locales/{{lng}}/{{ns}}.json",
    // working
    // working -> loadPath: "../build/locales/{{lng}}/{{ns}}.json",

    loadPath: `../build/locales/${currentLanguage}/translation.json`,

    // path to post missing resources
    // working
    //addPath: "../../public/locales/{{lng}}/{{ns}}.missing.json",
    // addPath: "../build/locales/{{lng}}/{{ns}}.missing.json",

    // jsonIndent to use when storing json files
    jsonIndent: 2
  },
  interpolation: {
    escapeValue: false
  },
  keySeparator: ">",
  nsSeparator: "|",
  saveMissing: false,
  lng: currentLanguage,
  fallbackLng: config.fallbackLng,
  whitelist: config.languages,
  react: {
    wait: false
  }
};

i18n.use(initReactI18next);

// initialize if not already initialized
if (!i18n.isInitialized) {
  console.log("initialized from i18next.config.client.js in source");
  i18n.init(i18nextOptions);
}

export default i18n;
