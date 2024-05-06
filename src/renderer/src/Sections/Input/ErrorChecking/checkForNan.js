import inputState from '../../GlobalState/inputState';
import i18n from 'i18next';

const checkForNan = (testSortArray) => {
  let passesTest = true;

  testSortArray.forEach((item) => {
    item.forEach((value) => {
      if (isNaN(value)) {
        passesTest = false;
        inputState.setState({ showWarningMessageBar: false });
        inputState.setState({ showErrorMessageBar: true });
        inputState.setState({ errorMessage: i18n.t('The Q sorts contain a non-numeric value') });
        inputState.setState({ errorStackTrace: i18n.t("Error in 'standardErrorChecks' function") });
        inputState.setState({
          extendedErrorMessage: i18n.t('Check the Q sort data for non-numeric values'),
        });
        inputState.setState({ isLoadZipButtonGreen: false });
        inputState.setState({ isCsvDataErrorCheckButtonGreen: false });
        inputState.setState({ showDataImportSuccessMessage: false });
      }
    });
  });

  return passesTest;
};

export default checkForNan;
