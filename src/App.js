import React from "react";
import { view } from "react-easy-state";
import styled, { css } from "styled-components";
import Start from "./Sections/Start/Start";
import Input from "./Sections/Input/Input";
import Data from "./Sections/Data/Data";
import Correlations from "./Sections/Correlations/Correlations";
import Factors from "./Sections/Factors/Factors";
import Rotation from "./Sections/Rotation/Rotation";
import Loadings from "./Sections/Loadings/Loadings";
import Output from "./Sections/Output/Output";
import ProjectHistory from "./Sections/ProjectHistory/ProjectHistory";
import Help from "./Sections/Help/Help";
import License from "./Sections/License/License";
import ClearProject from "./Sections//ClearProject/ClearProject";
import UpdateModal from "./Sections/Start/UpdateModal";
import ErrorBoundary from "./Utils/ErrorBoundary";
import appState from "./Sections/GlobalState/appState";
import inputState from "./Sections/GlobalState/inputState";
import indicateDataButtonColor from "./Sections/Start/indicateDataButtonColor";
import "./Utils/ag-grid.css";
import "./Utils/ag-theme-fresh.css";
import "./Utils/loadingsTable.css";
import { useTranslation } from "react-i18next";

const semverEq = require("semver/functions/eq");
const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

ipcRenderer.on("shouldUpdate", function(event, data) {
  const updateVersion = data[1];
  const versionStoredInUserSettings = data[2];
  const areSameVersion = semverEq(updateVersion, versionStoredInUserSettings);

  if (!areSameVersion) {
    appState.updateVersion = `${data[0].releaseVersion}`;
    appState.changes = data[0].changes;
    appState.showUpdateModal = true;
  }
});

window.onerror = function(errorMsg, url, lineNumber, column, error) {
  console.log(`stack ${JSON.stringify(error.stack)}`);

  appState.errorMessage = "An unexpected error occurred.";
  appState.extendedErrorMessage = errorMsg;
  appState.errorStackTrace = error.stack;
  appState.showErrorMessageBar = true;
  return false;
};

const handleClick = target => {
  const activeWindow = appState.activeWindow;
  appState[activeWindow] = false;
  appState[target] = true;
  appState.activeWindow = target;
};

const App = props => {
  const [t] = useTranslation();

  const {
    viewStart,
    viewInput,
    viewData,
    viewClearProject,
    viewCorrelations,
    viewFactors,
    viewRotation,
    viewLoadings,
    viewOutput,
    viewProjectHistory,
    viewHelp,
    viewLicense
  } = appState;

  const { isDataButtonGreen, hasUnforcedBeenConfirmed } = appState;

  const isForcedQsortPattern = inputState;

  let showUpdateModal = appState.showUpdateModal;

  // const installedVersion = appState.version;
  // const updateVersion = appState.updateVersion;

  // getState
  const inputButtonColor = appState.isInputButtonGreen
    ? "var(--main-theme-color)"
    : "#d6dbe0";
  const correlationsButtonColor = appState.isCorrelationsButtonGreen
    ? "var(--main-theme-color)"
    : "#d6dbe0";
  const factorsButtonColor = appState.isFactorsButtonGreen
    ? "var(--main-theme-color)"
    : "#d6dbe0";
  const rotationButtonColor = appState.isRotationButtonGreen
    ? "var(--main-theme-color)"
    : "#d6dbe0";
  const loadingsButtonColor = appState.isLoadingsButtonGreen
    ? "var(--main-theme-color)"
    : "#d6dbe0";
  const outputButtonColor = appState.isOutputButtonGreen
    ? "var(--main-theme-color)"
    : "#d6dbe0";

  let showTopBar = false;
  // if (process.platform === "darwin") {
  //   showTopBar = true;
  // }

  return (
    <AppWrap active={showTopBar}>
      {showTopBar ? <Header>KADE</Header> : null}
      <ErrorBoundary>
        <Split>
          <FilesWindow>
            <StartButton
              active={viewStart}
              onClick={() => handleClick("viewStart")}
            >
              <p className="title">KADE v1.2.0</p>
            </StartButton>
            <FileButton
              buttonColor={inputButtonColor}
              active={viewInput}
              onClick={() => handleClick("viewInput")}
            >
              <p className="title">{`1. ${t("Input")}`}</p>
            </FileButton>
            <FileButton
              buttonColor={indicateDataButtonColor(
                isForcedQsortPattern,
                isDataButtonGreen,
                hasUnforcedBeenConfirmed
              )}
              active={viewData}
              onClick={() => handleClick("viewData")}
            >
              <p className="title">{`2. ${t("Data")}`}</p>
            </FileButton>
            <FileButton
              buttonColor={correlationsButtonColor}
              active={viewCorrelations}
              onClick={() => handleClick("viewCorrelations")}
            >
              <p className="title">{`3. ${t("Correlations")}`}</p>
            </FileButton>
            <FileButton
              buttonColor={factorsButtonColor}
              active={viewFactors}
              onClick={() => handleClick("viewFactors")}
            >
              <p className="title">{`4. ${t("Factors")}`}</p>
            </FileButton>
            <FileButton
              buttonColor={rotationButtonColor}
              active={viewRotation}
              onClick={() => handleClick("viewRotation")}
            >
              <p className="title">{`5. ${t("Rotation")}`}</p>
            </FileButton>
            <FileButton
              buttonColor={loadingsButtonColor}
              active={viewLoadings}
              onClick={() => handleClick("viewLoadings")}
            >
              <p className="title">{`6. ${t("Loadings")}`}</p>
            </FileButton>
            <FileButton
              buttonColor={outputButtonColor}
              active={viewOutput}
              onClick={() => handleClick("viewOutput")}
            >
              <p className="title">{`7. ${t("Output")}`}</p>
            </FileButton>
            <FileButton
              active={viewProjectHistory}
              onClick={() => handleClick("viewProjectHistory")}
            >
              <p className="title">{t("Project Log")}</p>
            </FileButton>

            {showUpdateModal ? <UpdateModal /> : <NoUpdateSpacer />}

            <FileButton
              active={viewClearProject}
              onClick={() => handleClick("viewClearProject")}
            >
              <p className="title">{t("Clear Project")}</p>
            </FileButton>
            <FileButton
              active={viewHelp}
              onClick={() => handleClick("viewHelp")}
            >
              <p className="title">{t("Help")}</p>
            </FileButton>
            <FileButton
              className="attributionBox"
              active={viewLicense}
              onClick={() => handleClick("viewLicense")}
            >
              <p className="title">
                {t("Attribution")} <br /> / {t("License")}
              </p>
            </FileButton>
          </FilesWindow>
          <ActionWindow>
            {viewStart && <Start view={viewStart} />}
            {viewInput && <Input view={viewInput} />}
            {viewData && <Data view={viewData} />}
            {viewCorrelations && <Correlations view={viewCorrelations} />}
            {viewFactors && <Factors view={viewFactors} />}
            {viewRotation && <Rotation view={viewRotation} />}
            {viewLoadings && <Loadings view={viewLoadings} />}
            {viewOutput && <Output view={viewOutput} />}
            {viewProjectHistory && <ProjectHistory view={viewProjectHistory} />}
            {viewHelp && <Help view={viewHelp} />}
            {viewLicense && <License view={viewLicense} />}
            {viewClearProject && <ClearProject view={viewClearProject} />}
          </ActionWindow>
        </Split>
      </ErrorBoundary>
    </AppWrap>
  );
};

export default view(App);

const Header = styled.header`
  box-sizing: border-box;
  display: grid;
  background-color: black;
  font-family: Helvetica;
  color: #d6dbe0;
  font-size: 1rem;
  height: 23px;
  align-items: center;
  text-align: center;
  position: fixed;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  -webkit-app-region: drag;
  user-select: none;
`;

const AppWrap = styled.div`
  box-sizing: border-box;
  font-family: Helvetica;
  height: 100vh;
  width: 100vw;
  ${({ active }) =>
    active &&
    css`
      margin-top: 23px;
    `};
`;

const Split = styled.div`
  box-sizing: border-box;
  display: flex;
`;

const FilesWindow = styled.div`
  box-sizing: border-box;
  background: #d6dbe0;
  width: 135px;
  min-width: 135px;
  height: 100vh;
  overflow: hidden;
`;

const ActionWindow = styled.div`
  background-color: white;
  height: 100vh;
  flex: 1;
  html {
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  overflow: auto;
`;

// background: #191324;

// hover -> border-left: solid 8px #d6dbe0;
// active -> border-left: solid 8px #d6dbe0;
// border-bottom: solid 1px #302b3a;
// border-bottom: solid 1px gray;
const FileButton = styled.button`
  box-sizing: border-box;
  padding: 10px;
  padding-bottom: 8px;
  padding-top: 15px;
  width: 100%;
  height: auto;
  background: ${props => props.buttonColor || "#d6dbe0"};
  color: black;
  border: none;
  text-align: left;
  transition: 0.3s ease all;
  outline: none !important;
  user-select: none;

  &:hover {
    opacity: 1;
    box-shadow: inset 0 0 0 4px #666, 0 0 1px transparent;
  }

  ${({ active }) =>
    active &&
    `
    background-color: white;
    opacity: 1;
    `};

  .title {
    font-weight: bold;
    font-size: 0.9rem;
    margin: 0 0 5px;
    color: black;
  }
`;

// border-bottom: solid 1px gray;
// ${props => props.width};

const StartButton = styled.button`
  box-sizing: border-box;
  height: 45px;
  padding: 5px;
  padding-right: 25px;
  width: 100%;
  background-color: var(--main-theme-color);
  border: none;
  text-align: center;
  transition: 0.3s ease all;
  outline: none !important;
  user-select: none;

  .title {
    font-weight: bold;
    font-size: 1.2rem;
    margin: 5px 0 5px;
    color: black;
  }

  &:hover {
    opacity: 1;
    box-shadow: inset 0 0 0 4px #666, 0 0 1px transparent;
  }

  ${({ active }) =>
    active &&
    `
    background-color: white;
    opacity: 1;
    .title {
    font-weight: bold;
    font-size: 1.2rem;
    margin: 5px 0 5px;
    color: black;
  } 
    `};
`;

const NoUpdateSpacer = styled.button`
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  height: 75px;
  background: #d6dbe0;
  color: black;
  border: none;
  text-align: left;
  transition: 0.3s ease all;
`;
