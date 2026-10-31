import shiftRawSortsPositive from '../logic/shiftRawSortsPositive';

const createMainDataObjectArray = (lines2, isForced = true, inputMinValue = 0) => {
  // let minValue;
  // let qSortPatternArray;
  const mainDataObject = [];
  const respondentNames = [];

  let minValue;
  if (isForced) {
    // grab min value to use with shift positive
    const firstRow = lines2[0];
    const asNumbers = firstRow.map(Number);
    minValue = Math.min(...asNumbers);
  } else {
    minValue = inputMinValue;
  }

  for (let j = 0; j < lines2.length; j += 1) {
    const tempObj = {};
    const name = lines2[j].shift();
    // end loop if no data
    if (!name) {
      break;
    }
    // set property name
    tempObj.name = name;
    // add to names array
    respondentNames.push(name);
    // convert to numbers format
    const asNumbers = lines2[j].map(Number);
    // grab min value to use with shift positive

    let arrayShiftedPositive;
    // const minValue = Math.min(...asNumbers);

    // todo - do unforced check here to see if need pattern input min instead of first row
    // grab last for for copy to qSortPattern
    // qSortPatternArray = asNumbers.slice();

    if (minValue < 1) {
      arrayShiftedPositive = shiftRawSortsPositive(asNumbers, minValue);
    } else {
      arrayShiftedPositive = [...asNumbers];
    }

    tempObj.posShiftSort = arrayShiftedPositive;
    tempObj.rawSort = asNumbers;
    tempObj.displaySort = lines2[j].toString();
    mainDataObject.push(tempObj);
  }
  return [mainDataObject, respondentNames];
};

export default createMainDataObjectArray;
