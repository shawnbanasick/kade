import cloneDeep from "lodash/cloneDeep";
import checkUniqueName from "../ErrorChecking/checkUniqueParticipantName";

const createParticipantNameArray = array => {
  let tempArray = [];
  let result = cloneDeep(array);
  result.forEach(element => {
    let tempVar = element[0];
    tempArray.push(tempVar);
  });
  let participantNames = checkUniqueName(tempArray);
  return participantNames;
};

export default createParticipantNameArray;
