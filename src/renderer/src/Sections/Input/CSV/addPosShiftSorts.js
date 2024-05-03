import shiftRawSortsPositive from "../logic/shiftRawSortsPositive";

const addPosShiftSorts = (mainDataObject, minValue) => {
  mainDataObject.forEach(item => {
    let tempArray = [...item.rawSort];
    let shiftedArray = shiftRawSortsPositive(tempArray, minValue);
    item.posShiftSort = [...shiftedArray];
  });
  return mainDataObject;
};

export default addPosShiftSorts;
