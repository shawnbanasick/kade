import zip from 'lodash/zip';
import map from 'lodash/map';
import store from "../../store";
import average from "../../Utils/average";
import evenRound from "../../Utils/evenRound";
import standardDeviation from "../../Utils/standardDeviation";

function weightRawSorts(significantFactors) {
    // produces MD array with factor number, flagged respondent, weighted values for each statement (for each flagged respondent)
    let respondentNames = store.getState("respondentNames");
    let mainDataObject = store.getState("mainDataObject");
    // pos shifted
    let rawSorts = [];
    for (let k = 0, kLen = mainDataObject.length; k < kLen; k++) {
        rawSorts.push(mainDataObject[k].posShiftSort);
    }

    let weightedSorts = [];
    // normalize weights by sort
    let normalizedSorts = [];
    for (let s = 0, sLen = rawSorts.length; s < sLen; s++) {
        let tempArray2a = [];
        let sortAverage = average(rawSorts[s]);
        let sortStandardDeviation = standardDeviation(rawSorts[s]);
        for (let r = 0, rLen = rawSorts[s].length; r < rLen; r++) {
            let zScore = evenRound(
                (rawSorts[s][r] - sortAverage) / sortStandardDeviation,
                3
            );
            tempArray2a.push(zScore);
        }
        normalizedSorts.push(tempArray2a);
    }
    let rawSortsPrep = zip(respondentNames, normalizedSorts);

    // multiply normaized sorts by weighting value
    let temp4;
    for (let i = 0, iLen = significantFactors.length; i < iLen; i++) {
        for (let j = 0, jLen = rawSortsPrep.length; j < jLen; j++) {
            let temp1 = significantFactors[i][1];
            let temp2 = rawSortsPrep[j][0];
            let temp3 = rawSortsPrep[j][1];
            temp4 = significantFactors[i][3];
            let tempArray = [];
            if (temp1 === temp2) {
                let newWeightedSort = map(temp3, roundNumbers);
                // push factor number
                tempArray.push(significantFactors[i][0]);
                // push respondent name
                tempArray.push(temp1);
                tempArray.push(newWeightedSort);
                weightedSorts.push(tempArray);
            }
        }
    }
    return weightedSorts;

    function roundNumbers(n) {
        let temp5 = evenRound(n * temp4, 5);
        return temp5;
    }
}

export default weightRawSorts;
