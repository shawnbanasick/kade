import transposeMatrix from '../../../../Utils/transposeMatrix';
import uniq from 'lodash/uniq';
import i18n from 'i18next';
import inputState from '../../../GlobalState/inputState';

const transformExcelType1Ver2Sorts = (sortData, numStatements, participantNames) => {
  function removeEmptyStrings(array) {
    return array.map((subArray) => subArray.filter((str) => str !== ''));
  }

  function removeEmptyArrays(array) {
    return array.filter((subArray) => subArray.length > 0);
  }

  // Format data
  const sortData2 = removeEmptyStrings(sortData);
  const sortData3 = removeEmptyArrays(sortData2);
  sortData3.shift();
  const sortData4 = transposeMatrix(sortData3);
  const sortPattern = sortData4.shift();
  const updateShowWarningMessageBar = inputState((state) => state.updateShowWarningMessageBar);
  const updateShowErrorMessageBar = inputState((state) => state.updateShowErrorMessageBar);
  const updateErrorMessage = inputState((state) => state.updateErrorMessage);
  const updateErrorStackTrace = inputState((state) => state.updateErrorStackTrace);
  const updateExtendedErrorMessage = inputState((state) => state.updateExtendedErrorMessage);
  const updateIsLoadZipButtonGreen = inputState((state) => state.updateIsLoadZipButtonGreen);
  const updateIsCsvDataErrorCheckButtonGreen = inputState(
    (state) => state.updateIsCsvDataErrorCheckButtonGreen
  );
  const updateShowDataImportSuccessMessage = inputState(
    (state) => state.updateShowDataImportSuccessMessage
  );

  let overRangeSorts = [];
  let underRangeSorts = [];
  let nonNumericSorts = [];

  // Create new array of sortable objects and text => number
  let newDataArray = [];
  let statementNum;
  let sortValue;
  sortData4.forEach((item, i) => {
    let tempArray = [];
    let length = item.length;

    if (length !== +numStatements) {
      updateShowWarningMessageBar(false);
      updateShowErrorMessageBar(true);
      updateErrorMessage(
        i18n.t(
          'One or more participants have a different number of Q sorts values than the project design'
        )
      );
      updateErrorStackTrace(i18n.t('no stack trace available'));
      updateExtendedErrorMessage(i18n.t('Check the Q sort data'));
      updateIsLoadZipButtonGreen(false);
      updateIsCsvDataErrorCheckButtonGreen(false);
      updateShowDataImportSuccessMessage(false);

      /*
      inputState.showWarningMessageBar = false;
      inputState.showErrorMessageBar = true;
      inputState.errorMessage = i18n.t(
        'One or more participants have a different number of Q sorts values than the project design'
      );
      inputState.errorStackTrace = i18n.t('no stack trace available');
      inputState.extendedErrorMessage = i18n.t('Check the Q sort data');
      inputState.isLoadZipButtonGreen = false;
      inputState.isCsvDataErrorCheckButtonGreen = false;
      inputState.showDataImportSuccessMessage = false;
      */
      throw new Error('Check the Q sort data');
    }
    item.forEach((item2, index) => {
      let tempObject = {};
      sortValue = parseInt(sortPattern[index], 10);
      if (isNaN(parseInt(sortPattern[index], 10)) || sortPattern[index] === null) {
        nonNumericSorts.push(participantNames[i]);
      }
      tempObject.sortValue = sortValue;
      statementNum = parseInt(item2, 10);
      tempObject.statementNum = statementNum;
      tempArray.push(tempObject);
      // error check - q sort pattern range
      if (statementNum > +numStatements) {
        overRangeSorts.push(participantNames[i]);
      }
      if (statementNum < 1) {
        underRangeSorts.push(participantNames[i]);
      }
      if (isNaN(statementNum)) {
        nonNumericSorts.push(participantNames[i]);
      }
    });
    newDataArray.push(tempArray);
  });

  let participantSorts = [];

  // Sort each array of objects and push sort values to new array
  newDataArray.forEach((item) => {
    let tempArray = [];
    // sort
    item.sort((a, b) => a.statementNum - b.statementNum);
    // assign
    item.forEach((item2) => {
      tempArray.push(item2.sortValue);
    });
    participantSorts.push(tempArray);
  });

  overRangeSorts = uniq(overRangeSorts);
  underRangeSorts = uniq(underRangeSorts);
  nonNumericSorts = uniq(nonNumericSorts);

  return { participantSorts, overRangeSorts, underRangeSorts, nonNumericSorts };
};
export default transformExcelType1Ver2Sorts;
