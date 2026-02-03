import inputState from "../../GlobalState/inputState";

const setDuplicatedNamesErrorContent = () => {
  inputState.showErrorMessageBar = true;
  inputState.errorMessage = `There are duplicated participant names`;
  inputState.errorStackTrace = "Error in 'standardErrorChecks' function.";
  inputState.extendedErrorMessage = `Participant names are duplicated. Check the Q sorts input file and give unique IDs to each participant.`;
  inputState.isLoadCsvQsortsButtonGreen = false;
  inputState.isCsvDataErrorCheckButtonGreen = false;
  inputState.showDataImportSuccessMessage = false;
};

export default setDuplicatedNamesErrorContent;
