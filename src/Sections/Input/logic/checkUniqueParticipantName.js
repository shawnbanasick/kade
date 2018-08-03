import cloneDeep from "lodash/cloneDeep";
import uniq from "lodash/uniq";

const checkUniqueName = function(namesFromExistingData) {
  var namesUniqueArrayTest2 = cloneDeep(namesFromExistingData);
  var namesUniqueArrayTest = uniq(namesUniqueArrayTest2);

  if (namesFromExistingData.length !== namesUniqueArrayTest.length) {
    for (var i = 0; i < namesFromExistingData.length; i++) {
      // stripping out "." because of display error in datatables
      var ii = i + 1;
      var currentName = namesFromExistingData[i];
      var currentName2 = currentName.replace(/\./g, "");
      namesFromExistingData[i] = ii + "_" + currentName2;
    }
  } else {
    for (var j = 0; j < namesFromExistingData.length; j++) {
      // stripping out "." because of display error in datatables
      namesFromExistingData[j] = namesFromExistingData[j].replace(/\./g, " ");
    }
  }
  return namesFromExistingData;
};

export default checkUniqueName;
