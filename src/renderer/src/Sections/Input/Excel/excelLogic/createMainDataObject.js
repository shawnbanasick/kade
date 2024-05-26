import shiftRawSortsPositive from '../../logic/shiftRawSortsPositive';
import flatten from 'lodash/flatten';
import cloneDeep from 'lodash/cloneDeep';

function createMainDataObject(names, rawSorts) {
  // find min value of sort pattern
  const minValueArray = cloneDeep(rawSorts);
  const minValueArray2 = flatten(minValueArray);
  const minValue = Math.min(...minValueArray2);

  // map values to object
  const mainDataObject = [];
  names.forEach((element, j) => {
    const tempObj = {};

    // shift all sort values to positive
    const posShiftSort = shiftRawSortsPositive(rawSorts[j], minValue);

    tempObj.name = names[j];
    tempObj.posShiftSort = posShiftSort;
    tempObj.rawSort = rawSorts[j];
    tempObj.displaySort = rawSorts[j].toString();
    mainDataObject.push(tempObj);
  });
  return mainDataObject;
}

export default createMainDataObject;
