import Versions from './components/Versions';
import electronLogo from './assets/electron.svg';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import i18next from 'i18next';

function App() {
  const { t } = useTranslation();
  const ipcHandle = () => window.electron.ipcRenderer.send('ping');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    window.languageChange.language((value) => {
      setLanguage(value);
    });

    i18next.changeLanguage(language);
  }, [language]);

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <br />
      <mark>
        <h2>{`Translations:    ${t('Copy')},   ${t('Paste')}`}</h2>
      </mark>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
      </div>
      <Versions></Versions>
    </>
  );
}

export default App;
