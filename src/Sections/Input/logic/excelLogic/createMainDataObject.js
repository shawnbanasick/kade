import shiftRawSortsPositive from "../uploadLogic/shiftRawSortsPositive";

const createMainDataObject = function(names, rawSorts) {
  // find min value of sort pattern
  let minValue = rawSorts[0].reduce(function(a, b) {
    return Math.min(a, b);
  });

  // map values to object
  let mainDataObject = [];
  names.forEach(function(element, j) {
    let tempObj = {};

    // shift all sort values to positive
    let posShiftSort = shiftRawSortsPositive(rawSorts[j], minValue);

    tempObj.name = names[j];
    tempObj.posShiftSort = posShiftSort;
    tempObj.rawSort = rawSorts[j];
    tempObj.displaySort = rawSorts[j].toString();
    mainDataObject.push(tempObj);
  });
  return mainDataObject;
}

export default createMainDataObject;