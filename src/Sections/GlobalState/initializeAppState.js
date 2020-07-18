import appState from '../GlobalState/appState';

const initializeAppState = () => {
 
    // keep visible section to clear project to aviod toastify error;

    appState.activeWindow = "viewClearProject";
    appState.errorMessage = "";
    appState.extendedErrorMessage = "";
    appState.errorStackTrace = "";
    appState.hasUnforcedBeenConfirmed = false;
    appState.isDataButtonGreen = false;
    appState.isInputButtonGreen = false;
    appState.isCorrelationsButtonGreen = false;
    appState.isFactorsButtonGreen = false;
    appState.isLoadingsButtonGreen = false;
    appState.isRotationButtonGreen = false;
    appState.isOutputButtonGreen = false;
    appState.showErrorMessageBar = false;
    appState.version = "2.0.0";
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
    
}

export default initializeAppState;