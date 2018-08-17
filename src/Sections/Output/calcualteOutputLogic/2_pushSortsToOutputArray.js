import store from "../../store";
import cloneDeep from "lodash/cloneDeep";
import average from "../../Utils/average";
import evenRound from "../../Utils/evenRound";
import standardDeviation from "../../Utils/standardDeviation";

const pushSortsToOutputArray = function(
    sheetNames,
    output,
    outputData,
    sheetNamesXlsx,
    colSizes
) {
    sheetNamesXlsx.push("Q-sorts");

    let mainDataObject = store.getState("mainDataObject");
    let respondentNames = store.getState("respondentNames");
    let dataArray = [];

    // pull sorts from mainDataObject
    let sortsAsNumbers = [];
    let posShiftSort = [];
    for (let r = 0, rLen = mainDataObject.length; r < rLen; r++) {
        let temp1 = mainDataObject[r].rawSort;
        let temp2 = mainDataObject[r].posShiftSort;
        sortsAsNumbers.push(temp1);
        posShiftSort.push(temp2);
    }

    let sortsAsNumbers1 = cloneDeep(sortsAsNumbers);
    store.setState({
        posShiftSortArray: posShiftSort,
        sortsAsNumbers: sortsAsNumbers1
    });

    // set up column widths
    var columns = [
        {
            wch: 15
        }
    ];
    for (var ii = 0, iiLen = sortsAsNumbers[0].length + 2; ii < iiLen; ii++) {
        columns.push({
            wch: 5
        });
    }
    colSizes.push(columns);

    var stddev,
        statementSort;
    // create sheet header
    var headerArray = ["Participant"];
    for (var jj = 0, jjLen = sortsAsNumbers[0].length; jj < jjLen; jj++) {
        statementSort = "S" + (jj + 1);
        headerArray.push(statementSort);
    }
    headerArray.push("Mean", "Standard Deviation");
    dataArray.push(["", ""], ["Q-sorts", ""], ["", ""], headerArray);

    let freeDistributionArray = [["", "Q-sort", "Mean", "St.Dev."]];
    // push in sorts, means, and standard devs
    for (var kk = 0, kkLen = sortsAsNumbers.length; kk < kkLen; kk++) {
        let tempArray1 = [];
        let resNum = kk + 1;
        var average3 = evenRound(average(sortsAsNumbers[kk]), 3);
        stddev = evenRound(standardDeviation(sortsAsNumbers[kk]), 3);
        sortsAsNumbers[kk].unshift(respondentNames[kk]);
        sortsAsNumbers[kk].push(average3, stddev);
        tempArray1.push(resNum, respondentNames[kk], average3, stddev);
        dataArray.push(sortsAsNumbers[kk]);
        freeDistributionArray.push(tempArray1);
    }
    outputData.push(dataArray);

    store.setState({
        freeDistributionArray: freeDistributionArray
    });

    return [sheetNames, output, outputData, sheetNamesXlsx, colSizes];
};

export default pushSortsToOutputArray;
