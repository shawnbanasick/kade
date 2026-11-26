import i18n from 'i18next';

const extremeValueErrorCheck = (participantSorts, errorObject) => {
  // Global State
  let overRangeSorts = participantSorts.overRangeSorts;
  let underRangeSorts = participantSorts.underRangeSorts;
  let nonNumericSorts = participantSorts.nonNumericSorts;

  if (overRangeSorts.length > 0 || underRangeSorts.length > 0) {
    errorObject.hasError = true;
    errorObject.outOfRangeError = true;
    errorObject.errorMessage = i18n.t(
      'There is a Q sort with values beyond the range of the Q sort design'
    );
    ((errorObject.extendedErrorMessage = `${i18n.t(
      'Participants with a value beyond the range of the Q sort design'
    )}: ${overRangeSorts.join(', ')} ${underRangeSorts.join(', ')}.`),
      (errorObject.errorStackTrace = i18n.t('no stack trace available')));
    return { errorObject };
  }

  if (nonNumericSorts.length > 0) {
    errorObject.hasError = true;
    errorObject.sortsError = true;
    errorObject.errorMessage = i18n.t('The Q sorts contain a non-numeric value');
    ((errorObject.extendedErrorMessage = `${i18n.t('Check the Q sort data for non-numeric values')}: ${nonNumericSorts.join(', ')}.`),
      (errorObject.errorStackTrace = i18n.t('no stack trace available')));
    return { errorObject };
  }
  return { errorObject };
};

export default extremeValueErrorCheck;
