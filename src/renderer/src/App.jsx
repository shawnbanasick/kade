import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Start from './Sections/Start/Start';
import Input from './Sections/Input/Input';
import Data from './Sections/Data/Data';
import Correlations from './Sections/Correlations/Correlations';
import Factors from './Sections/Factors/Factors';
import Rotation from './Sections/Rotation/Rotation';
import Structure from './Sections/Structure/Structure';
import Loadings from './Sections/Loadings/Loadings';
import Output from './Sections/Output/Output';
import ProjectHistory from './Sections/ProjectHistory/ProjectHistory';
import Help from './Sections/Help/Help';
import License from './Sections/License/License';
import ClearProject from './Sections//ClearProject/ClearProject';
// import getInputState from "./Sections/GlobalState/getInputState";
import UpdateModal from './Sections/Start/UpdateModal';
import ErrorBoundary from './Utils/ErrorBoundary';
import appState from './Sections/GlobalState/appState';
import indicateDataButtonColor from './Sections/Start/indicateDataButtonColor';
import './Utils/ag-grid.css';
import './Utils/ag-theme-fresh.css';
import './Utils/loadingsTable.css';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import FileButton from './FileButton';
import './App.css';

// const semverEq = require('semver/functions/eq');
// const electron = window.require('electron');
// const ipcRenderer = electron.ipcRenderer;
const ipcRenderer = window.electron.ipcRenderer;

ipcRenderer.on('shouldUpdate', function (event, data) {
  const updateVersion = data[1];
  console.log(updateVersion);
  // const versionStoredInUserSettings = data[2];
  // const areSameVersion = semverEq(updateVersion, versionStoredInUserSettings);

  // if (!areSameVersion) {
  //   updateUpdateVersion = `${data[0].releaseVersion}`;
  //   appState.changes = data[0].changes;
  //   appState.showUpdateModal = true;
  // }
});

window.onerror = function (errorMsg, url, lineNumber, column, error) {
  console.log(`stack ${JSON.stringify(error.stack)}`);

  // appState.errorMessage = 'An unexpected error occurred.';
  // appState.extendedErrorMessage = errorMsg;
  // appState.errorStackTrace = error.stack;
  // appState.showErrorMessageBar = true;
  return false;
};

const App = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    window.languageChange.language((value) => {
      setLanguage(value);
    });

    i18next.changeLanguage(language);
  }, [language]);

  const { t } = useTranslation();

  const viewStart = appState((state) => state.viewStart);
  const viewInput = appState((state) => state.viewInput);
  const viewData = appState((state) => state.viewData);
  const viewCorrelations = appState((state) => state.viewCorrelations);
  const viewFactors = appState((state) => state.viewFactors);
  const viewRotation = appState((state) => state.viewRotation);
  const viewLoadings = appState((state) => state.viewLoadings);
  const viewOutput = appState((state) => state.viewOutput);
  const viewProjectHistory = appState((state) => state.viewProjectHistory);
  const viewClearProject = appState((state) => state.viewClearProject);
  const viewHelp = appState((state) => state.viewHelp);
  const viewLicense = appState((state) => state.viewLicense);
  const viewStructure = appState((state) => state.viewStructure);

  const isDataButtonGreen = appState((state) => state.isDataButtonGreen);
  const hasDataBeenConfirmed = appState((state) => state.hasDataBeenConfirmed);
  const showUpdateModal = appState((state) => state.showUpdateModal);
  const isInputButtonGreen = appState((state) => state.isInputButtonGreen);
  const isCorrelationsButtonGreen = appState((state) => state.isCorrelationsButtonGreen);
  const isFactorsButtonGreen = appState((state) => state.isFactorsButtonGreen);
  const isRotationButtonGreen = appState((state) => state.isRotationButtonGreen);
  const isLoadingsButtonGreen = appState((state) => state.isLoadingsButtonGreen);
  const isOutputButtonGreen = appState((state) => state.isOutputButtonGreen);
  const isStructureButtonGreen = appState((state) => state.isStructureButtonGreen);

  const updateViewAttribution = appState((state) => state.updateViewAttribution);
  const updateViewData = appState((state) => state.updateViewData);
  const updateViewClearProject = appState((state) => state.updateViewClearProject);
  const updateViewCorrelations = appState((state) => state.updateViewCorrelations);
  const updateViewFactors = appState((state) => state.updateViewFactors);
  const updateViewHelp = appState((state) => state.updateViewHelp);
  const updateViewInput = appState((state) => state.updateViewInput);
  const updateViewLicense = appState((state) => state.updateViewLicense);
  const updateViewLoadings = appState((state) => state.updateViewLoadings);
  const updateViewOutput = appState((state) => state.updateViewOutput);
  const updateViewProjectHistory = appState((state) => state.updateViewProjectHistory);
  const updateViewRotation = appState((state) => state.updateViewRotation);
  const updateViewStart = appState((state) => state.updateViewStart);
  const updateActiveWindow = appState((state) => state.updateActiveWindow);
  const updateViewStructure = appState((state) => state.updateViewStructure);

  // const installedVersion = appState.version;
  // const updateVersion = appState.updateVersion;

  // get button colors
  const inputButtonColor = isInputButtonGreen ? 'bg-primary-button' : 'bg-grey-button';
  const correlationsButtonColor = isCorrelationsButtonGreen
    ? 'bg-primary-button'
    : 'bg-grey-button';
  const factorsButtonColor = isFactorsButtonGreen ? 'bg-primary-button' : 'bg-grey-button';
  const rotationButtonColor = isRotationButtonGreen ? 'bg-primary-button' : 'bg-grey-button';
  const loadingsButtonColor = isLoadingsButtonGreen ? 'bg-primary-button' : 'bg-grey-button';
  const outputButtonColor = isOutputButtonGreen ? 'bg-primary-button' : 'bg-grey-button';
  const structureButtonColor = isStructureButtonGreen ? 'bg-primary-button' : '#d6dbe0';

  const isDataButtonGreenCombined = indicateDataButtonColor(
    isDataButtonGreen,
    hasDataBeenConfirmed
  );

  const handleClick = (target) => {
    updateViewAttribution(false);
    updateViewData(false);
    updateViewClearProject(false);
    updateViewCorrelations(false);
    updateViewFactors(false);
    updateViewHelp(false);
    updateViewInput(false);
    updateViewLicense(false);
    updateViewLoadings(false);
    updateViewOutput(false);
    updateViewProjectHistory(false);
    updateViewRotation(false);
    updateViewStart(false);
    updateViewStructure(false);

    updateActiveWindow(target);

    if (target === 'viewStart') {
      updateViewStart(true);
    }
    if (target === 'viewInput') {
      updateViewInput(true);
    }
    if (target === 'viewData') {
      updateViewData(true);
    }
    if (target === 'viewCorrelations') {
      updateViewCorrelations(true);
    }
    if (target === 'viewFactors') {
      updateViewFactors(true);
    }
    if (target === 'viewRotation') {
      updateViewRotation(true);
    }
    if (target === 'viewLoadings') {
      updateViewLoadings(true);
    }
    if (target === 'viewOutput') {
      updateViewOutput(true);
    }
    if (target === 'viewProjectHistory') {
      updateViewProjectHistory(true);
    }
    if (target === 'viewHelp') {
      updateViewHelp(true);
    }
    if (target === 'viewLicense') {
      updateViewLicense(true);
    }
    if (target === 'viewClearProject') {
      updateViewClearProject(true);
    }
    if (target === 'viewStructure') {
      updateViewStructure(true);
    }
  };

  let showTopBar = false;

  return (
    <div id="AppWrap" className="box-border font-sans mt-[50px] h-[100vh] w-[100vw]">
      <ErrorBoundary>
        <div id="window" className="grid grid-cols-[135px_1fr] h-full">
          <div id="buttonColumn" className="flex flex-col box-border bg-[#d6dbe0] overflow-hidden">
            <button
              id="startButton"
              className={`box-border h-[100px] p-[5px] pr-[25px] w-full text-center transition-all duration-300 ease-[ease] outline-none select-none hover:opacity-100 hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] border-b-1 border-gray-400 ${viewStart ? 'bg-primary-button' : 'bg-primary-button'}`}
              onClick={() => handleClick('viewStart')}
            >
              <p className="title font-bold text-xl m-[5px_0_5px] text-black">KADE v1.4.0</p>
            </button>

            <FileButton
              className={`${inputButtonColor}`}
              active={viewInput}
              onClick={() => handleClick('viewInput')}
            >
              <p className="title">{`1. ${t('Input')}`}</p>
            </FileButton>
            <FileButton
              className={`${isDataButtonGreenCombined}`}
              active={viewData ? 1 : 0}
              onClick={() => handleClick('viewData')}
            >
              <p className="title">{`2. ${t('Data')}`}</p>
            </FileButton>
            <FileButton
              className={`${correlationsButtonColor}`}
              active={viewCorrelations}
              onClick={() => handleClick('viewCorrelations')}
            >
              <p className="title">{`3. ${t('Correlations')}`}</p>
            </FileButton>
            <FileButton
              className={`${structureButtonColor}`}
              active={viewStructure}
              onClick={() => handleClick('viewStructure')}
            >
              <p className="title">{`4. ${t('Structure')}`}</p>
            </FileButton>
            <FileButton
              className={`${factorsButtonColor}`}
              active={viewFactors}
              onClick={() => handleClick('viewFactors')}
            >
              <p className="title">{`5. ${t('Factors')}`}</p>
            </FileButton>
            <FileButton
              className={`${rotationButtonColor}`}
              active={viewRotation}
              onClick={() => handleClick('viewRotation')}
            >
              <p className="title">{`6. ${t('Rotation')}`}</p>
            </FileButton>
            <FileButton
              className={`${loadingsButtonColor}`}
              active={viewLoadings}
              onClick={() => handleClick('viewLoadings')}
            >
              <p className="title">{`7. ${t('Loadings')}`}</p>
            </FileButton>
            <FileButton
              className={`${outputButtonColor}`}
              active={viewOutput}
              onClick={() => handleClick('viewOutput')}
            >
              <p className="title">{`8. ${t('Output')}`}</p>
            </FileButton>
            <FileButton
              active={viewProjectHistory}
              onClick={() => handleClick('viewProjectHistory')}
            >
              <p className="title">{t('Project Log')}</p>
            </FileButton>

            {showUpdateModal ? (
              <UpdateModal />
            ) : (
              <div className="box-border p-[10px] w-full h-[75px] bg-[#d6dbe0] text-black border-none text-left transition-all duration-300 ease-[ease]" />
            )}

            <FileButton $active={viewClearProject} onClick={() => handleClick('viewClearProject')}>
              <p className="title">{t('Clear Project')}</p>
            </FileButton>
            <FileButton $active={viewHelp} onClick={() => handleClick('viewHelp')}>
              <p className="title">{t('Help')}</p>
            </FileButton>
            <FileButton
              className="attributionBox"
              $active={viewLicense}
              onClick={() => handleClick('viewLicense')}
            >
              <p className="title">
                {t('Attribution')} <br /> / {t('License')}
              </p>
            </FileButton>
          </div>

          <div
            id="actionWindow"
            className="bg-white overflow-auto [&_*]:[box-sizing:inherit] [&_*:before]:[box-sizing:inherit] [&_*:after]:[box-sizing:inherit]"
          >
            {viewStart && <Start view={viewStart} />}
            {viewInput && <Input view={viewInput} />}
            {viewData && <Data view={viewData} />}
            {viewCorrelations && <Correlations view={viewCorrelations} />}
            {viewStructure && <Structure view={viewStructure} />}
            {viewFactors && <Factors view={viewFactors} />}
            {viewRotation && <Rotation view={viewRotation} />}
            {viewLoadings && <Loadings view={viewLoadings} />}
            {viewOutput && <Output view={viewOutput} />}
            {viewProjectHistory && <ProjectHistory view={viewProjectHistory} />}
            {viewLicense && <License view={viewLicense} />}
            {viewClearProject && <ClearProject view={viewClearProject} />}
            {viewHelp && <Help view={viewHelp} />}
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default App;
