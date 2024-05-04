import appState from '../GlobalState/appState';

const initializeAppState = () => {
  const updateActiveWindow = appState((state) => state.updateActiveWindow);

  const updateChanges = appState((state) => state.updateChanges);

  const updateErrorMessage = appState((state) => state.updateErrorMessage);
  const updateExtendedErrorMessage = appState((state) => state.updateExtendedErrorMessage);
  const updateErrorStackTrace = appState((state) => state.updateErrorStackTrace);
  const updateHasDataBeenConfirmed = appState((state) => state.updateHasDataBeenConfirmed);
  const updateIsDataButtonGreen = appState((state) => state.updateIsDataButtonGreen);
  const updateIsInputButtonGreen = appState((state) => state.updateIsInputButtonGreen);
  const updateIsCorrelationsButtonGreen = appState(
    (state) => state.updateIsCorrelationsButtonGreen
  );
  const updateIsFactorsButtonGreen = appState((state) => state.updateIsFactorsButtonGreen);
  const updateIsLoadingsButtonGreen = appState((state) => state.updateIsLoadingsButtonGreen);
  const updateIsRotationButtonGreen = appState((state) => state.updateIsRotationButtonGreen);
  const updateIsOutputButtonGreen = appState((state) => state.updateIsOutputButtonGreen);

  const updateShowErrorMessageBar = appState((state) => state.updateShowErrorMessageBar);
  const updateShowUpdateModal = appState((state) => state.updateShowUpdateModal);

  const updateUpdateVersion = appState((state) => state.updateUpdateVersion);

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

  updateActiveWindow('viewClearProject');
  updateChanges([]);

  updateErrorMessage('');
  updateExtendedErrorMessage('');
  updateErrorStackTrace('');
  updateHasDataBeenConfirmed(false);
  updateIsDataButtonGreen(false);
  updateIsInputButtonGreen(false);
  updateIsCorrelationsButtonGreen(false);
  updateIsFactorsButtonGreen(false);
  updateIsLoadingsButtonGreen(false);
  updateIsRotationButtonGreen(false);
  updateIsOutputButtonGreen(false);

  updateShowErrorMessageBar(false);
  updateShowUpdateModal(false);

  updateUpdateVersion('1.4.0');

  updateViewAttribution(false);
  updateViewData(false);
  updateViewClearProject(true);
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

  return;
};

export default initializeAppState;
