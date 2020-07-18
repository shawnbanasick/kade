const i18n = require("i18next");
const i18nextBackend = require("i18next-node-fs-backend");
const config = require("./app.config");

const i18nextOptions = {
  backend: {
    // path where resources get loaded from
    loadPath: "build/locales/{{lng}}/{{ns}}.json",

    // path to post missing resources
    addPath: "build/locales/{{lng}}/{{ns}}.missing.json",

    // jsonIndent to use when storing json files
    jsonIndent: 2
  },
  interpolation: {
    escapeValue: false
  },
  keySeparator: '>',
  nsSeparator: '|',
  saveMissing: false,
  fallbackLng: config.fallbackLng,
  whitelist: config.languages,
  react: {
    wait: false
  }
};

i18n.use(i18nextBackend);

// initialize if not already initialized
if (!i18n.isInitialized) {
  console.log("initialized from i18next.config.js");
  i18n.init(i18nextOptions);
}

module.exports = i18n;
