import i18n from 'i18next';
import checkUniqueParticipantName from '../../logic/checkUniqueParticipantNames';

const transformExcelType2Ver2Sorts = (sortData, qSortPatternArray, errorObject) => {
  let maxValue = Math.max(...qSortPatternArray);
  let minValue = Math.min(...qSortPatternArray);
  let matchValue = qSortPatternArray.length;
  let matchArray = [];
  let maxValueArray = [];
  let minValueArray = [];
  let nonNumericArray = [];
  let sortsArray = [];
  let namesArray = [];
  let missingNamesArray = [];

  sortData[0].forEach((row, index) => {
    let tempArray = [];
    row = row.split(',');
    // check for missing participant names
    if (row[0] === '' && row[1] !== '') {
      missingNamesArray.push(index + 1);
    }
    // process each row of sort data, skipping the first column (participant name)
    if (row[0] !== '') {
      row.forEach((item, index) => {
        if (item !== '') {
          if (index > 0) {
            item = parseInt(item, 10);
            if (item > maxValue) {
              maxValueArray.push(row[0]);
            }
            if (item < minValue) {
              minValueArray.push(row[0]);
            }
            if (isNaN(item)) {
              nonNumericArray.push(row[0]);
            }
            tempArray.push(item);
          } else {
            namesArray.push(item);
          }
        }
      });
      if (tempArray.length !== matchValue) {
        matchArray.push(row[0]);
      }
      sortsArray.push(tempArray);
    }
  });

  if (maxValueArray.length > 0 || minValueArray.length > 0) {
    errorObject.hasError = true;
    errorObject.errorMessage = i18n.t(
      'There is a Q sort with values beyond the range of the Q sort design'
    );
    errorObject.errorStackTrace = i18n.t('no stack trace available');
    errorObject.extendedErrorMessage = `${i18n.t(
      'Participants with a value beyond the range of the Q sort design'
    )} ${maxValueArray.join(', ')}, ${minValueArray.join(', ')}.`;
    return { errorObject };
  }

  if (nonNumericArray.length > 0) {
    errorObject.hasError = true;
    errorObject.errorMessage = i18n.t('There is a Q sort with a non-numeric value');
    errorObject.errorStackTrace = i18n.t('no stack trace available');
    errorObject.extendedErrorMessage = `${i18n.t(
      'Participants with a non-numeric value in their Q sort'
    )}: ${nonNumericArray.join(', ')}.`;
    return { errorObject };
  }

  if (matchArray.length > 0) {
    errorObject.hasError = true;
    errorObject.errorMessage = i18n.t(
      'There is a Q sort with a number of values that does not match the Q sort design'
    );
    errorObject.errorStackTrace = i18n.t('no stack trace available');
    errorObject.extendedErrorMessage = `${i18n.t('Participants with a number of values that does not match the Q sort design')}: ${matchArray.join(', ')}.`;
    return { errorObject };
  }

  if (missingNamesArray.length > 0) {
    errorObject.hasError = true;
    errorObject.errorMessage = i18n.t('There is a Q sort with a missing participant name');
    errorObject.errorStackTrace = i18n.t('no stack trace available');
    errorObject.extendedErrorMessage = `${i18n.t('Data with a missing participant name - row(s)')}: ${missingNamesArray.join(', ')}.`;
    return { errorObject };
  }

  namesArray = checkUniqueParticipantName(namesArray);
  return { sortsArray, namesArray, errorObject };
};

export default transformExcelType2Ver2Sorts;
