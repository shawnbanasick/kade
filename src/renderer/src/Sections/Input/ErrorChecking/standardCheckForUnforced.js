import inputState from '../../GlobalState/inputState';
import isEqual from 'lodash/isEqual';
import i18n from 'i18next';

const standardCheckForUnforced = (testSortArray, qSortPattern, respondentNames) => {
  let passesTest = true;
  let unforcedParticipantNamesArray = [];
  let numUnforcedParts = 0;

  testSortArray.forEach((item, index) => {
    let sortedItem = [...item].sort((a, b) => a - b);
    let sortedPattern = [...qSortPattern].sort((a, b) => a - b);
    let unforcedTest = isEqual(sortedPattern, sortedItem);
    let nameString = respondentNames[index];
    if (!unforcedTest) {
      unforcedParticipantNamesArray.push(nameString);
      numUnforcedParts = numUnforcedParts + 1;
    }
  });

  if (numUnforcedParts > 0) {
    passesTest = false;
    inputState.setState({ showWarningMessageBar: true });
    inputState.setState({
      errorMessage: `${i18n.t(
        'Unforced Q sorts'
      )} ${numUnforcedParts} >>> ${unforcedParticipantNamesArray.join(', ')}`,
    });
    inputState.setState({ errorStackTrace: i18n.t("Warning in 'standardErrorChecks' function") });
    inputState.setState({
      extendedErrorMessage: `${i18n.t(
        'Unforced Q sorts'
      )} ${unforcedParticipantNamesArray.join(', ')}. 
        \n\n ${i18n.t('Check the sort data in the Data section')}`,
    });
    inputState.setState({ showDataImportSuccessMessage: true });
    inputState.setState({ isLoadZipButtonGreen: true });
    inputState.setState({ isCsvDataErrorCheckButtonGreen: true });
    inputState.setState({ showDataImportSuccessMessage: true });
  }
  return passesTest;
};

export default standardCheckForUnforced;
