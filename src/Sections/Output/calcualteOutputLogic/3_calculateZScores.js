import evenRound from "../../Utils/evenRound";
import store from "../../store";

const calculateZScores = function(summedWeightedSorts) {
    // changing format from MD array to array of objects
    // add in statements
    let statements = store.getState("statements");
    let sigFactorNumbersArray = store.getState("sigFactorNumbersArray");
    // so that the diff 2 factors output is correct
    sigFactorNumbersArray.sort();
    let length = summedWeightedSorts.length;
    let zScoreArray = [];

    for (let i = 0; i < length; i++) {
        let zScoreTempObj = {};
        zScoreTempObj.factor = sigFactorNumbersArray[i];
        let tempArray1 = [];
        let zScoreTempArray = [];
        for (let j = 0; j < summedWeightedSorts[0][2].length; j++) {
            let tempObj = {};
            let zScore = evenRound(summedWeightedSorts[i][2][j], 3);

            tempObj.factor = sigFactorNumbersArray[i];
            tempObj.statement = j + 1;
            tempObj.sortStatement = statements[j];
            tempObj.zScore = zScore;

            zScoreTempArray.push(zScore);
            tempArray1.push(tempObj);
        }
        zScoreArray.push(tempArray1);
        zScoreTempObj["FactorZscores" + sigFactorNumbersArray[i]] = zScoreTempArray;
    }
    return zScoreArray;
};

export default calculateZScores;
