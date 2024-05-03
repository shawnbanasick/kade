import calcMultiplierArrayT2 from "../../Input/Excel/excelLogic/calcMultiplierArrayT2";
import isEqual from "lodash/isEqual";
import cloneDeep from "lodash/cloneDeep";

const checkForcedUnforcedSorts = (dataObject, multiplierArray) => {
  let mainDataObject = cloneDeep(dataObject);
  let unforcedParticipantNamesArray = [];
  let numUnforcedParts = 0;

  mainDataObject.forEach((item, index) => {
    // let respondentArray = [...mainDataObject[index].rawSort];

    let thisMultiplierArray2 = [...item.rawSort].sort((a, b) => a - b);

    // to deal with unforced Q sorts - triangle shape may vary
    let thisMultiplierArray = calcMultiplierArrayT2([...thisMultiplierArray2]);

    let unforcedTest = isEqual(multiplierArray, thisMultiplierArray);
    let nameString = item.name;
    if (!unforcedTest) {
      nameString = ` ${nameString}`;
      unforcedParticipantNamesArray.push(nameString);
      numUnforcedParts = numUnforcedParts + 1;
    }
  });
  return [unforcedParticipantNamesArray, numUnforcedParts];
};

export default checkForcedUnforcedSorts;
