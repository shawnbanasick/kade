import cloneDeep from "lodash/cloneDeep";
import uniq from "lodash/uniq";

const checkUniqueName = namesFromExistingData => {
  const namesUniqueArrayTest2 = cloneDeep(namesFromExistingData);
  const namesUniqueArrayTest = uniq(namesUniqueArrayTest2);

  if (namesFromExistingData.length !== namesUniqueArrayTest.length) {
    return true;
  } else {
    return false;
  }
};

export default checkUniqueName;

/*
const checkUniqueName = namesFromExistingData => {
  const namesUniqueArrayTest2 = cloneDeep(namesFromExistingData);
  const namesUniqueArrayTest = uniq(namesUniqueArrayTest2);

  if (namesFromExistingData.length !== namesUniqueArrayTest.length) {
    for (let i = 0; i < namesFromExistingData.length; i += 1) {
      // stripping out "." because of display error in datatables
      const ii = i + 1;
      const currentName = namesFromExistingData[i];
      const currentName2 = currentName.replace(/\./g, "\\.");
      namesFromExistingData[i] = `${ii}_${currentName2}`;
    }
  } else {
    for (let j = 0; j < namesFromExistingData.length; j += 1) {
      // stripping out "." because of display error in datatables
      namesFromExistingData[j] = namesFromExistingData[j].replace(/\./g, " ");
    }
  }
  console.log(namesFromExistingData);
  return namesFromExistingData;
};
*/
