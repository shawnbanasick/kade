import evenRound from '../../../Utils/evenRound';

const weightFactorScores = (
  significantLoadingsArray,
  sigFactorNumbersArray,
  maxFactorValuesArray
) => {
  // produces array with factor number, flagged respondent name, and 2 weight values
  const significantFactors = [];
  for (let j = 0, jLen = sigFactorNumbersArray.length; j < jLen; j += 1) {
    for (let k = 0; k < significantLoadingsArray.length; k += 1) {
      const temp1 = significantLoadingsArray[k][0];
      const temp2 = sigFactorNumbersArray[j];
      if (temp1 === temp2) {
        const divisor = maxFactorValuesArray[j];
        significantLoadingsArray[k][3] = evenRound(
          significantLoadingsArray[k][3] * divisor * 10,
          5
        );
        significantFactors.push(significantLoadingsArray[k]);
      }
    }
  }
  return significantFactors;
};

export default weightFactorScores;
