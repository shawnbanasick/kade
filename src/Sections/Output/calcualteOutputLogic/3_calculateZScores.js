import evenRound from "../../../Utils/evenRound";
import state from "../../../store";

const calculateZScores = function(summedWeightedSorts) {
  // changing format from MD array to array of objects
  // add in statements
  const statements = state.getState("statements");
  const sigFactorNumbersArray = state.getState("sigFactorNumbersArray");
  // so that the diff 2 factors output is correct
  sigFactorNumbersArray.sort();
  const length = summedWeightedSorts.length;
  const zScoreArray = [];

  for (let i = 0; i < length; i++) {
    const zScoreTempObj = {};
    zScoreTempObj.factor = sigFactorNumbersArray[i];
    const tempArray1 = [];
    const zScoreTempArray = [];
    for (let j = 0; j < summedWeightedSorts[0][2].length; j++) {
      const tempObj = {};
      const zScore = evenRound(summedWeightedSorts[i][2][j], 3);

      tempObj.factor = sigFactorNumbersArray[i];
      tempObj.statement = j + 1;
      tempObj.sortStatement = statements[j];
      tempObj.zScore = zScore;

      zScoreTempArray.push(zScore);
      tempArray1.push(tempObj);
    }
    zScoreArray.push(tempArray1);
    zScoreTempObj[`FactorZscores${  sigFactorNumbersArray[i]}`] = zScoreTempArray;
  }
  return zScoreArray;
};

export default calculateZScores;
