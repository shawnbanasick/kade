import sortBy from 'lodash/sortBy';
import inputState from '../../../GlobalState/inputState';
import i18n from 'i18next';

export default function getRespondentSortsExcelT1(sortData, respondentNames, numStatements) {
  // let hasExcelT1Error = false;
  let outOfRangeError = false;
  let hasDuplicateStatementNumbers = false;
  let missingStatementNumbersError = false;

  const updateErrorMessage = inputState((state) => state.updateErrorMessage);

  // generate the original load value for statement number array
  const statementNumArray = [];
  for (let i = 0; i < numStatements; i += 1) {
    statementNumArray.push(i + 1);
  }
  const testValue = statementNumArray.join(',');
  const excelType1NonsymmetricArray = [];

  // transpose data
  // todo - check to see if util transposer will work for this
  const sortDataTransposed = sortData[0].map((col, i) => sortData.map((row) => row[i]));

  const data2 = [];
  const errorTestArray = [];
  try {
    for (let p = 0; p < sortDataTransposed.length; p += 1) {
      let sortedArray1;
      sortedArray1 = sortBy(sortDataTransposed[p], (obj) => obj.statementNum);
      errorTestArray.push(sortedArray1.length);
      data2.push(sortedArray1);
    }
  } catch (error) {
    console.log(error);
    console.log('At least one Q sort has a missing statement number');
    missingStatementNumbersError = true;
  }

  let temp2;
  let temp2a;
  const respondentDataSorts3 = [];
  for (let q = 0; q < data2.length; q += 1) {
    const temp11 = data2[q];
    const tempArray3 = [];
    const tempArray33 = [];
    for (let r = 0; r < temp11.length; r += 1) {
      temp2 = temp11[r].sortValue;
      temp2a = temp11[r].statementNum;

      // insert check here
      if (temp2a < 1 || temp2a > numStatements) {
        const message = `${i18n.t('Q sort with an out of range value')}: ${respondentNames[q]}`;
        updateErrorMessage(message);
        outOfRangeError = true;
      }

      tempArray3.push(temp2);
      tempArray33.push(temp2a);
    }
    respondentDataSorts3.push(tempArray3);

    // do error check for symmetry (no duplicate statement numbers)
    const respondentDataCheck = tempArray33.join(',');
    if (respondentDataCheck !== testValue) {
      excelType1NonsymmetricArray.push(respondentNames[q]);
      hasDuplicateStatementNumbers = true;

      const excelType1NonsymmetricArrayText = excelType1NonsymmetricArray.join(', ');
      const errorMessage = `${i18n.t(
        'Q sort with statement number problems'
      )}: ${excelType1NonsymmetricArrayText}`;

      updateErrorMessage(errorMessage);
    }

    // todo - check if this is needed?
    statementNumArray.push(tempArray33);
  }

  return [
    respondentDataSorts3,
    statementNumArray,
    outOfRangeError,
    hasDuplicateStatementNumbers,
    missingStatementNumbersError,
  ];
}
