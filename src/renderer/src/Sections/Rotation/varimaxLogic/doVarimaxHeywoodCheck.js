import evenRound from '../../../Utils/evenRound';

const doVarimaxHeywoodCheck = (
  matrix,
  respondentNames,
  needsVarimaxHeywoodAdjustment,
  adjValArray,
  adjValPqmArray,
  over1ParticipantsArray
) => {
  let originalMatrix = matrix.map((row, rowIndex) => {
    let tempArrayAdjVal = [];
    let tempArrayAdjValPQM = [];
    row.map((item, itemIndex) => {
      if (item > 1.0) {
        needsVarimaxHeywoodAdjustment = true;
        tempArrayAdjVal.push(0.99999);
        tempArrayAdjValPQM.push(evenRound(item - 1.0, 5));
        over1ParticipantsArray.push(respondentNames[itemIndex]);
      } else {
        tempArrayAdjVal.push(item);
        tempArrayAdjValPQM.push(item);
      }
      return null;
    });
    adjValArray.push(tempArrayAdjVal);
    adjValPqmArray.push(tempArrayAdjValPQM);
    return row;
  });

  const returnObject = {
    needsVarimaxHeywoodAdjustment,
    adjValArray,
    adjValPqmArray,
    originalMatrix,
    over1ParticipantsArray,
  };
  return returnObject;
};

export default doVarimaxHeywoodCheck;
