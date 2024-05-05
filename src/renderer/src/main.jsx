import './assets/main.css';
import { I18nextProvider } from 'react-i18next';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import i18n from './configs/i18nResources';
import './customSettings.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Suspense fallback="loading">
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </React.StrictMode>
  </React.Suspense>
);
