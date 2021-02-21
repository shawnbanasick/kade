const i18n = require("i18next");
const appConfig = require("electron-settings");
const reactI18nextModule = require("react-i18next").reactI18nextModule;
const config = require("../configs/app.config");

let currentLanguage;

if (appConfig.has(`currentLanguage`)) {
  currentLanguage = appConfig.get(`currentLanguage`);
} else {
  currentLanguage = "en";
}

const i18nextOptions = {
  interpolation: {
    escapeValue: false
  },
  saveMissing: false,
  lng: currentLanguage,
  fallbackLng: config.fallbackLng,
  whitelist: config.languages,
  keySeparator: ">",
  nsSeparator: "|",
  react: {
    wait: false
  }
};

i18n.use(reactI18nextModule);

// initialize if not already initialized
if (!i18n.isInitialized) {
  i18n.init(i18nextOptions);
}

module.exports = i18n;
