import store from "../../store";
// import addDistinguishingSymbolsToData from "./addDistinguishingSymbolsToData";

const data = function() {
    // if first time -> get data from output function
    let outputForDataViz = store.getState("outputForDataViz2");
    let numbersHaveBeenAppended = store.getState("numbersHaveBeenAppended");

    if (outputForDataViz === undefined) {
        outputForDataViz = store.getState("outputForDataViz");
    }

    // append statement numbers
    let options = store.getState("factorVizOptions");
    let shouldAppend = options.willPrependStateNums;
    if (shouldAppend === true && numbersHaveBeenAppended === false) {
        for (let j = 0; j < outputForDataViz.length; j++) {
            for (let k = 0; k < outputForDataViz[j].length; k++) {
                let stateNum = outputForDataViz[j][k].statement;
                let statement = outputForDataViz[j][k].sortStatement;
                outputForDataViz[j][k].sortStatement = stateNum + ". " + statement;
            }
        }
        store.setState({
            numbersHaveBeenAppended: true
        });
    }
    if (shouldAppend === false && numbersHaveBeenAppended === true) {
        outputForDataViz = store.getState("outputForDataViz");
        store.setState({
            numbersHaveBeenAppended: false
        });
    }

    // sort by sort values, then by Z-scores
    for (let i = 0; i < outputForDataViz.length; i++) {
        outputForDataViz[i].sort(function(a, b) {
            if (a.sortValue > b.sortValue) {
                return 1;
            }
            if (a.sortValue < b.sortValue) {
                return -1;
            }
            // secondary sorting to make it easier to check results - high zscore to low
            if (a.zScore < b.zScore) {
                return 1;
            }
            if (a.zScore > b.zScore) {
                return -1;
            }
            return 0;
        });
    }
    store.setState({
        outputForDataViz2: outputForDataViz
    });

    return outputForDataViz;
};

export default data;
