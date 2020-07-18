import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import i18n from "./configs/i18next.config.client";
import { I18nextProvider } from "react-i18next";
import { ipcRenderer } from "./exportHelpers";
import "react-toastify/dist/ReactToastify.min.css";
import "semantic-ui-css/semantic.min.css";
import "./customSettings.css";
// import { ipcRenderer } from './exportHelpers/ipcRenderer';

let initialI18nStore = ipcRenderer.sendSync("get-initial-translations");

ipcRenderer.on("language-changed", (event, message) => {
  if (!i18n.hasResourceBundle(message.language, message.namespace)) {
    i18n.addResourceBundle(
      message.language,
      message.namespace,
      message.resource
    );
  }
  i18n.changeLanguage(message.language);
});

ReactDOM.render(
  <React.Suspense fallback={<div>Loading...</div>}>
    <I18nextProvider i18n={i18n} initialI18nStore={initialI18nStore}>
      <App />
    </I18nextProvider>
  </React.Suspense>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
