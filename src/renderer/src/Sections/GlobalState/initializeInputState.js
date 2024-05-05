import inputState from '../GlobalState/inputState';

const initializeInputState = () => {
  // keep visible section to clear project to aviod toastify error;

  const updateAreStatementsLoaded = inputState((state) => state.updateAreStatementsLoaded);
  const updateAreQsortsLoaded = inputState((state) => state.updateAreQsortsLoaded);
  const updateAreQsortsVerified = inputState((state) => state.updateAreQsortsVerified);
  const updateIsQsortPatternLoaded = inputState((state) => state.updateIsQsortPatternLoaded);

  const updateCsvErrorMessage1 = inputState((state) => state.updateCsvErrorMessage1);

  const updateDataOrigin = inputState((state) => state.updateDataOrigin);

  const updateExcelErrorMessage1 = inputState((state) => state.updateExcelErrorMessage1);
  const updateErrorMessage = inputState((state) => state.updateErrorMessage);
  const updateErrorStackTrace = inputState((state) => state.updateErrorStackTrace);
  const updateExtendedErrorMessage = inputState((state) => state.updateExtendedErrorMessage);

  const updateHasAddedProjectName = inputState((state) => state.updateHasAddedProjectName);

  const updateIsDataAlreadyLoaded = inputState((state) => state.updateIsDataAlreadyLoaded);
  const updateIsForcedQsortPattern = inputState((state) => state.updateIsForcedQsortPattern);
  const updateIsLoadCsvQsortsButtonGreen = inputState(
    (state) => state.updateIsLoadCsvQsortsButtonGreen
  );
  const updateIsLoadCsvTextButtonGreen = inputState(
    (state) => state.updateIsLoadCsvTextButtonGreen
  );
  const updateIsCsvDataErrorCheckButtonGreen = inputState(
    (state) => state.updateIsCsvDataErrorCheckButtonGreen
  );
  const updateIsLoadExcelT3ButtonGreen = inputState(
    (state) => state.updateIsLoadExcelT3ButtonGreen
  );
  const updateIsLoadExcelT2ButtonGreen = inputState(
    (state) => state.updateIsLoadExcelT2ButtonGreen
  );
  const updateIsLoadExcelT1ButtonGreen = inputState(
    (state) => state.updateIsLoadExcelT1ButtonGreen
  );
  const updateIsLoadJsonTextButtonGreen = inputState(
    (state) => state.updateIsLoadJsonTextButtonGreen
  );
  const updateIsLoadJsonQsortsButtonGreen = inputState(
    (state) => state.updateIsLoadJsonQsortsButtonGreen
  );
  const updateIsLoadSheetsCsvButtonGreen = inputState(
    (state) => state.updateIsLoadSheetsCsvButtonGreen
  );
  const updateIsLoadNetlifyCsvButtonGreen = inputState(
    (state) => state.updateIsLoadNetlifyCsvButtonGreen
  );
  const updateIsLoadPqmethodTextButtonButtonGreen = inputState(
    (state) => state.updateIsLoadPqmethodTextButtonButtonGreen
  );
  const updateIsLoadPqmethodQsortsButtonGreen = inputState(
    (state) => state.updateIsLoadPqmethodQsortsButtonGreen
  );
  const updateIsLoadLipsetButtonGreen = inputState((state) => state.updateIsLoadLipsetButtonGreen);
  const updateIsLoadBuzzwordsButtonGreen = inputState(
    (state) => state.updateIsLoadBuzzwordsButtonGreen
  );
  const updateIsLoadMotivationalButtonGreen = inputState(
    (state) => state.updateIsLoadMotivationalButtonGreen
  );
  const updateIsLoadIpadSurveyButtonGreen = inputState(
    (state) => state.updateIsLoadIpadSurveyButtonGreen
  );
  const updateIsShowFirebaseInputButtonGreen = inputState(
    (state) => state.updateIsShowFirebaseInputButtonGreen
  );
  const updateIsShowSheetsInputButtonGreen = inputState(
    (state) => state.updateIsShowSheetsInputButtonGreen
  );
  const updateIsShowNetlifyInputButtonGreen = inputState(
    (state) => state.updateIsShowNetlifyInputButtonGreen
  );
  const updateIsLoadZipButtonGreen = inputState((state) => state.updateIsLoadZipButtonGreen);

  const updateDisabledFirebaseButton = inputState((state) => state.updateDisabledFirebaseButton);
  const updateDisabledSheetsButton = inputState((state) => state.updateDisabledSheetsButton);
  const updateDisabledNetlifyButton = inputState((state) => state.updateDisabledNetlifyButton);
  const updateUserSelectSheetsPartId = inputState((state) => state.updateUserSelectSheetsPartId);

  const updateJsonParticipantId = inputState((state) => state.updateJsonParticipantId);

  const updateNotifyDataUploadSuccess = inputState((state) => state.updateNotifyDataUploadSuccess);

  const updateRequiredQsortPatternInput = inputState(
    (state) => state.updateRequiredQsortPatternInput
  );

  const updateShowCsvErrorModal = inputState((state) => state.updateShowCsvErrorModal);
  const updateShowDataImportSuccessMessage = inputState(
    (state) => state.updateShowDataImportSuccessMessage
  );
  const updateShowExcelErrorModal = inputState((state) => state.updateShowExcelErrorModal);
  const updateShowErrorMessageBar = inputState((state) => state.updateShowErrorMessageBar);
  const updateShowWarningMessageBar = inputState((state) => state.updateShowWarningMessageBar);
  const updateShowWarningMessage = inputState((state) => state.updateShowWarningMessage);
  const updateShowFirebaseInput = inputState((state) => state.updateShowFirebaseInput);
  const updateShowForcedInput = inputState((state) => state.updateShowForcedInput);
  const updateShowSheetsInput = inputState((state) => state.updateShowSheetsInput);
  const updateShowExportButtons = inputState((state) => state.updateShowExportButtons);
  const updateShowJsonFileLoadedMessage = inputState(
    (state) => state.updateShowJsonFileLoadedMessage
  );
  const updateShowJsonParticipantIdDropdown = inputState(
    (state) => state.updateShowJsonParticipantIdDropdown
  );
  const updateShowNetlifyInput = inputState((state) => state.updateShowNetlifyInput);
  const updateSortsLoaded = inputState((state) => state.updateSortsLoaded);
  const updateSortsPasteTextArea = inputState((state) => state.updateSortsPasteTextArea);
  const updateStatementsLoaded = inputState((state) => state.updateStatementsLoaded);

  const updateUnforcedRadioButtonState = inputState(
    (state) => state.updateUnforcedRadioButtonState
  );

  updateAreStatementsLoaded(false);
  updateAreQsortsLoaded(false);
  updateAreQsortsVerified(false);
  updateIsQsortPatternLoaded(false);

  updateCsvErrorMessage1('');

  updateDataOrigin('');

  updateExcelErrorMessage1('');
  updateErrorMessage('');
  updateErrorStackTrace('');
  updateExtendedErrorMessage('');

  updateHasAddedProjectName(false);

  updateIsDataAlreadyLoaded(false);
  updateIsForcedQsortPattern(true);
  updateIsLoadCsvQsortsButtonGreen(false);
  updateIsLoadCsvTextButtonGreen(false);
  updateIsCsvDataErrorCheckButtonGreen(false);
  updateIsLoadExcelT3ButtonGreen(false);
  updateIsLoadExcelT2ButtonGreen(false);
  updateIsLoadExcelT1ButtonGreen(false);
  updateIsLoadJsonTextButtonGreen(false);
  updateIsLoadJsonQsortsButtonGreen(false);
  updateIsLoadSheetsCsvButtonGreen(false);
  updateIsLoadNetlifyCsvButtonGreen(false);
  updateIsLoadPqmethodTextButtonButtonGreen(false);
  updateIsLoadPqmethodQsortsButtonGreen(false);
  updateIsLoadLipsetButtonGreen(false);
  updateIsLoadBuzzwordsButtonGreen(false);
  updateIsLoadMotivationalButtonGreen(false);
  updateIsLoadIpadSurveyButtonGreen(false);
  updateIsShowFirebaseInputButtonGreen(false);
  updateIsShowSheetsInputButtonGreen(false);
  updateIsShowNetlifyInputButtonGreen(false);
  updateIsLoadZipButtonGreen(false);

  updateDisabledFirebaseButton(false);
  updateDisabledSheetsButton(false);
  updateDisabledNetlifyButton(false);
  updateUserSelectSheetsPartId('randomId');

  updateJsonParticipantId([]);

  updateNotifyDataUploadSuccess(false);

  updateRequiredQsortPatternInput(false);

  updateShowCsvErrorModal(false);
  updateShowDataImportSuccessMessage(false);
  updateShowExcelErrorModal(false);
  updateShowErrorMessageBar(false);
  updateShowWarningMessageBar(false);
  updateShowWarningMessage(false);
  updateShowFirebaseInput(false);
  updateShowForcedInput(false);
  updateShowSheetsInput(false);
  updateShowExportButtons(false);
  updateShowJsonFileLoadedMessage(false);
  updateShowJsonParticipantIdDropdown(false);
  updateShowNetlifyInput(false);
  updateSortsLoaded(false);
  updateSortsPasteTextArea('');
  updateStatementsLoaded(false);

  updateUnforcedRadioButtonState('forced');

  return;
};

export default initializeInputState;
