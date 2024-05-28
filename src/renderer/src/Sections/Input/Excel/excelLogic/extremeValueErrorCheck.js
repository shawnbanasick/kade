import inputState from '../../../GlobalState/inputState';
import i18n from 'i18next';

const extremeValueErrorCheck = (participantSorts) => {
  // Global State
  let overRangeSorts = participantSorts.overRangeSorts;
  let underRangeSorts = participantSorts.underRangeSorts;
  let nonNumericSorts = participantSorts.nonNumericSorts;

  if (overRangeSorts.length > 0 || underRangeSorts.length > 0) {
    inputState.setState({ showWarningMessageBar: false });
    inputState.setState({ showErrorMessageBar: true });
    inputState.setState({
      errorMessage: `${i18n.t('There is a Q sort with values beyond the range of the Q sort design')}`,
    });
    inputState.setState({ errorStackTrace: i18n.t('no stack trace available') });
    inputState.setState({
      extendedErrorMessage: `${i18n.t(
        'Participants with a value beyond the range of the Q sort design'
      )}: ${overRangeSorts.join(', ')} ${underRangeSorts.join(', ')}.`,
    });
    inputState.setState({ isLoadZipButtonGreen: false });
    inputState.setState({ isCsvDataErrorCheckButtonGreen: false });
    inputState.setState({ showDataImportSuccessMessage: false });
    throw new Error(
      `There is a Q sort with values beyond the range of the Q sort design! [ ${overRangeSorts.join()} ] Check your Excel file, reload the webpage, and try again.`
    );
  }

  if (nonNumericSorts.length > 0) {
    inputState.setState({ showWarningMessageBar: false });
    inputState.setState({ showErrorMessageBar: true });
    inputState.setState({ errorMessage: `${i18n.t('The Q sorts contain a non-numeric value')}` });
    inputState.setState({ errorStackTrace: i18n.t('no stack trace available') });
    inputState.setState({
      extendedErrorMessage: `${i18n.t('Check the Q sort data for non-numeric values')}: ${nonNumericSorts.join(', ')}.`,
    });
    inputState.setState({ isLoadZipButtonGreen: false });
    inputState.setState({ isCsvDataErrorCheckButtonGreen: false });
    inputState.setState({ showDataImportSuccessMessage: false });
    throw new Error(
      `There are problems with Q sort values in the participant sorts! [ ${nonNumericSorts.join()} ] Check your Excel file, reload the webpage, and try again.`
    );
  }
};

export default extremeValueErrorCheck;
