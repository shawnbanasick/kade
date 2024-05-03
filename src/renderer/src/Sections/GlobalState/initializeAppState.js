import appState from "../GlobalState/appState";

const initializeAppState = () => {
  appState.activeWindow = "viewClearProject";

  appState.changes = [];

  appState.errorMessage = "";
  appState.extendedErrorMessage = "";
  appState.errorStackTrace = "";

  appState.hasDataBeenConfirmed = false;

  appState.isDataButtonGreen = false;
  appState.isInputButtonGreen = false;
  appState.isCorrelationsButtonGreen = false;
  appState.isFactorsButtonGreen = false;
  appState.isLoadingsButtonGreen = false;
  appState.isRotationButtonGreen = false;
  appState.isOutputButtonGreen = false;

  appState.showErrorMessageBar = false;
  appState.showUpdateModal = false;

  appState.updateVersion = "";

  appState.version = "1.3.0";
  appState.viewAttribution = false;
  appState.viewData = false;
  appState.viewClearProject = true;
  appState.viewCorrelations = false;
  appState.viewFactors = false;
  appState.viewHelp = false;
  appState.viewInput = false;
  appState.viewLicense = false;
  appState.viewLoadings = false;
  appState.viewOutput = false;
  appState.viewProjectHistory = false;
  appState.viewRotation = false;
  appState.viewStart = false;

  return;
};

export default initializeAppState;
