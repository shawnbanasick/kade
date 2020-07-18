import evenRound from "../../../../Utils/evenRound";

const checkForHeywoodCommunalities = (communalityArray, respondentNames) => {
  const adjustedParticipantsIndex = [];
  const heywoodParticipantsArray = [];
  const heywoodParticipantsCommunalityArray = [];
  const heywoodParticipantsTextArray = [];

  const results = communalityArray.map((row, rowIndex) => {
    let tempObj = {};
    const communality = row.pop();
    let newRow;
    if (communality > 1) {
      let tempText = "";
      let name = respondentNames[rowIndex];
      name = name.replace(/ /g, "");
      heywoodParticipantsArray.push(respondentNames[rowIndex]);
      tempObj.participantName = name;
      tempObj.communality = communality;
      heywoodParticipantsCommunalityArray.push(tempObj);
      tempText = `(${name}: ${communality})`;
      heywoodParticipantsTextArray.push(tempText);
      const reduceValue = evenRound(1 / Math.sqrt(communality), 7);
      newRow = row.map(item => {
        let reduction = item * reduceValue;
        return evenRound(reduction, 7);
      });
      adjustedParticipantsIndex.push(rowIndex);
      return newRow;
    } else {
      return row;
    }
  });

  const resultsObject = {
    adjustedParticipantsIndex,
    communalityArray: results,
    heywoodParticipantsArray,
    heywoodParticipantsCommunalityArray,
    heywoodParticipantsTextArray
  };
  return resultsObject;
};

export default checkForHeywoodCommunalities;
