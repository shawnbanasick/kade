import uniq from 'lodash/uniq';
import i18n from 'i18next';
import inputState from '../../../GlobalState/inputState';

const sortErrorCheckT2 = (newQsortPattern, symmetryCheckArray, respondentNames) => {
  // check for out of range values in Q sorts
  let maxVal = Math.max(...newQsortPattern);
  let minVal = Math.min(...newQsortPattern);
  let maxArray = [];
  let minArray = [];
  let matchArray = [];
  let testVal1 = [...newQsortPattern];

  symmetryCheckArray.forEach((sort, i) => {
    let checkVal = [...sort];
    if (checkVal.length !== testVal1.length) {
      matchArray.push(respondentNames[i]);
    }
    sort.forEach((item) => {
      if (+item > maxVal) {
        maxArray.push(respondentNames[i]);
      }
      if (+item < minVal) {
        minArray.push(item);
      }
    });
  });

  maxArray = uniq(maxArray);
  minArray = uniq(minArray);
  matchArray = uniq(matchArray);

  if (maxArray.length > 0 || minArray.length > 0) {
    inputState.setState({ showWarningMessageBar: false });
    inputState.setState({ showErrorMessageBar: true });
    inputState.setState({
      errorMessage: `${i18n.t('There is a Q sort with values beyond the range of the Q sort design')}`,
    });
    inputState.setState({ errorStackTrace: i18n.t('no stack trace available') });
    inputState.setState({
      extendedErrorMessage: `${i18n.t(
        'Participants with a value beyond the range of the Q sort design'
      )}: ${maxArray.join(', ')} ${minArray.join(', ')}.`,
    });
    inputState.setState({ isLoadZipButtonGreen: false });
    inputState.setState({ isCsvDataErrorCheckButtonGreen: false });
    inputState.setState({ showDataImportSuccessMessage: false });
    throw new Error(
      `Q sort values outside allowed range! [ ${maxArray.join()} , ${minArray.join()} ] Check your Excel file, reload the webpage, and try again.`
    );
  }

  if (matchArray.length > 0) {
    inputState.setState({ showWarningMessageBar: false });
    inputState.setState({ showErrorMessageBar: true });
    inputState.setState({
      errorMessage: `${i18n.t('There are problems with Q sort values in the participant sorts')}`,
    });
    inputState.setState({ errorStackTrace: i18n.t('no stack trace available') });
    inputState.setState({
      extendedErrorMessage: `${i18n.t(
        'There are problems with Q sort values in the participant sorts'
      )}: ${matchArray.join(', ')} .`,
    });
    inputState.setState({ isLoadZipButtonGreen: false });
    inputState.setState({ isCsvDataErrorCheckButtonGreen: false });
    inputState.setState({ showDataImportSuccessMessage: false });
    throw new Error(
      `There are problems with Q sort values in the participant sorts! [ ${matchArray.join()} ] Check your Excel file, reload the webpage, and try again.`
    );
  }
};

export default sortErrorCheckT2;
