import shiftRawSortsPositive from "../../logic/shiftRawSortsPositive";

function createMainDataObject(names, rawSorts) {
  // find min value of sort pattern
  const minValue = rawSorts[0].reduce((a, b) => Math.min(a, b));

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
