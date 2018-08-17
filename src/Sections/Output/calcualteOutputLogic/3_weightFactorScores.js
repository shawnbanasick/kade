import evenRound from "../../Utils/evenRound";

const weightFactorScores = function(
    significantLoadingsArray,
    sigFactorNumbersArray,
    maxFactorValuesArray
) {
    // produces array with factor number, flagged respondent name, and 2 weight values
    let significantFactors = [];
    for (let j = 0, jLen = sigFactorNumbersArray.length; j < jLen; j++) {
        for (let k = 0; k < significantLoadingsArray.length; k++) {
            let temp1 = significantLoadingsArray[k][0];
            let temp2 = sigFactorNumbersArray[j];
            if (temp1 === temp2) {
                let divisor = maxFactorValuesArray[j];
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
