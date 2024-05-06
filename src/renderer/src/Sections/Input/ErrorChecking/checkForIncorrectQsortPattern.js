import inputState from '../../GlobalState/inputState';
import i18n from 'i18next';

const checkForIncorrectQsortPattern = (testSortArray, qSortPattern, numStatements) => {
  let passesTest = true;
  let totalQsorts = qSortPattern.length;

  if (totalQsorts !== numStatements) {
    passesTest = false;
    inputState.setState({ showWarningMessageBar: false });
    inputState.setState({ showErrorMessageBar: true });
    inputState.setState({
      errorMessage: i18n.t('The Q sort pattern input or number of statements is incorrect'),
    });
    inputState.setState({ errorStackTrace: i18n.t("Error in 'standardErrorChecks' function") });
    inputState.setState({
      extendedErrorMessage: i18n.t('Check the statements input and the Q sort pattern data'),
    });
    inputState.setState({ isLoadZipButtonGreen: false });
    inputState.setState({ isCsvDataErrorCheckButtonGreen: false });
    inputState.setState({ showDataImportSuccessMessage: false });
  }
  return passesTest;
};

export default checkForIncorrectQsortPattern;
