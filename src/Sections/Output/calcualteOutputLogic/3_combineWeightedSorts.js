import store from "../../store";
import evenRound from "../../Utils/evenRound";
import average from "../../Utils/average";
import standardDeviation from "../../Utils/standardDeviation";

const combineWeightedSorts = function(weightedSorts) {
    // returns ["factor 1", "factor 2", etc... ]
    let sigFactorNumbersArray1 = store.getState("sigFactorNumbersArray");
    let sigFactorNumbersArray = sigFactorNumbersArray1.sort();
    let tempArray2,
        summedWeightedSorts;

    summedWeightedSorts = [];
    let sigSortsArray = [];

    // looping through all selected factor names in sig factor array
    for (let i = 0, iLen = sigFactorNumbersArray.length; i < iLen; i++) {
        let tempArray4 = [];
        let tempArray1 = [];
        let factor = sigFactorNumbersArray[i];
        tempArray2 = [];
        let tempObj2 = {};

        // loop through all data for all factors and pull data for only for selected factors
        for (let j = 0, jLen = weightedSorts.length; j < jLen; j++) {
            let temp2 = weightedSorts[j][0]; // gives number 1 or 2 or 3 etc...
            if (temp2 === factor) {
                tempArray1.push(weightedSorts[j][2]); // pushes weight for each statement
                tempArray2.push(weightedSorts[j][1]); // pushes flagged sort respondent name
            }
        }

        // pushes factor numbers and representative sorts into array
        tempArray4.push(factor); // array of names of user selected factors
        tempArray4.push(tempArray2); // array of flagged respondent names

        // converts array of factor numbers and rep sorts to object
        tempObj2["Factor Number"] = factor;
        tempObj2.SigSorts = tempArray2;
        sigSortsArray.push(tempObj2);

        // summing weights for statements across flagged sorts for each factor
        let tempArray3 = [];
        for (let k = 0, kLen = tempArray1[0].length; k < kLen; k++) {
            let temp3 = 0;
            for (let m = 0, mLen = tempArray1.length; m < mLen; m++) {
                temp3 = evenRound(temp3 + tempArray1[m][k], 3);
            }
            tempArray3.push(temp3);
        }

        // re-normalize factor loadings after summing across statements
        let tempArray3a = [];
        let sortAverage = average(tempArray3);
        let sortStandardDeviation = standardDeviation(tempArray3);
        for (let r = 0, rLen = tempArray3.length; r < rLen; r++) {
            let zScore = evenRound(
                (tempArray3[r] - sortAverage) / sortStandardDeviation,
                3
            );
            tempArray3a.push(zScore);
        }
        tempArray4.push(tempArray3a);
        summedWeightedSorts.push(tempArray4);
    }
    store.setState({
        sigSortsArray: sigSortsArray
    });
    return summedWeightedSorts;
};

export default combineWeightedSorts;
