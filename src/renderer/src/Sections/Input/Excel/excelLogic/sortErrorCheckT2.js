import uniq from 'lodash/uniq';
import i18n from 'i18next';

const sortErrorCheckT2 = (newQsortPattern, symmetryCheckArray, respondentNames, errorObject) => {
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
    errorObject.hasError = true;
    errorObject.outOfRangeError = true;
    errorObject.errorMessage = i18n.t(
      'There is a Q sort with values beyond the range of the Q sort design'
    );
    errorObject.extendedErrorMessage = `${i18n.t(
      'Participants with a value beyond the range of the Q sort design'
    )}: ${maxArray.join(', ')} ${minArray.join(', ')}.`;
    errorObject.errorStackTrace = i18n.t('no stack trace available');
    return { errorObject };
  }

  if (matchArray.length > 0) {
    errorObject.hasError = true;
    errorObject.sortsError = true;
    errorObject.errorMessage = i18n.t(
      'There are problems with Q sort values in the participant sorts'
    );
    errorObject.extendedErrorMessage = `${i18n.t('There are problems with Q sort values in the participant sorts')}: ${matchArray.join(', ')}.`;
    errorObject.errorStackTrace = i18n.t('no stack trace available');
    return { errorObject };
  }
  return { errorObject };
};

export default sortErrorCheckT2;
