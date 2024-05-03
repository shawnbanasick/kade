import isNumber from "lodash/isNumber";
import cloneDeep from "lodash/cloneDeep";

const checkForOutOfRangeValues = (
  mainDataObject,
  min,
  max,
  numberStatements
) => {
  let nonNumericArray = [];
  let outsideRangeArray = [];
  let overUnderCountArray = [];
  let checkArray = cloneDeep(mainDataObject);
  checkArray.forEach((item, index) => {
    let testItem = item.rawSort;
    // over under test
    if (testItem.length !== numberStatements) {
      overUnderCountArray.push([mainDataObject[index].name, index + 1]);
    }
    testItem.forEach(entry => {
      let isNumeric = isNumber(entry);
      if (!isNumeric) {
        nonNumericArray.push([mainDataObject[index].name, index + 1]);
      } else {
        if (entry > max || entry < min) {
          outsideRangeArray.push([mainDataObject[index].name, index + 1]);
        }
      }
    });
  });
  return [nonNumericArray, outsideRangeArray, overUnderCountArray];
};

export default checkForOutOfRangeValues;
