import cloneDeep from "lodash/cloneDeep";
import state from "../../../store";
import average from "../../../Utils/average";
import evenRound from "../../../Utils/evenRound";
import standardDeviation from "../../../Utils/standardDeviation";

const pushSortsToOutputArray = function(
  sheetNames,
  output,
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  sheetNamesXlsx.push("Q-sorts");

  const mainDataObject = state.getState("mainDataObject");
  const respondentNames = state.getState("respondentNames");
  const dataArray = [];

  // pull sorts from mainDataObject
  const sortsAsNumbers = [];
  const posShiftSort = [];
  for (let r = 0, rLen = mainDataObject.length; r < rLen; r++) {
    const temp1 = mainDataObject[r].rawSort;
    const temp2 = mainDataObject[r].posShiftSort;
    sortsAsNumbers.push(temp1);
    posShiftSort.push(temp2);
  }

  const sortsAsNumbers1 = cloneDeep(sortsAsNumbers);
  state.setState({
    posShiftSortArray: posShiftSort,
    sortsAsNumbers: sortsAsNumbers1
  });

  // set up column widths
  const columns = [
    {
      wch: 15
    }
  ];
  for (let ii = 0, iiLen = sortsAsNumbers[0].length + 2; ii < iiLen; ii++) {
    columns.push({
      wch: 5
    });
  }
  colSizes.push(columns);

  let stddev, statementSort;
  // create sheet header
  const headerArray = ["Participant"];
  for (let jj = 0, jjLen = sortsAsNumbers[0].length; jj < jjLen; jj++) {
    statementSort = `S${  jj + 1}`;
    headerArray.push(statementSort);
  }
  headerArray.push("Mean", "Standard Deviation");
  dataArray.push(["", ""], ["Q-sorts", ""], ["", ""], headerArray);

  const freeDistributionArray = [["", "Q-sort", "Mean", "St.Dev."]];
  // push in sorts, means, and standard devs
  for (let kk = 0, kkLen = sortsAsNumbers.length; kk < kkLen; kk++) {
    const tempArray1 = [];
    const resNum = kk + 1;
    const average3 = evenRound(average(sortsAsNumbers[kk]), 3);
    stddev = evenRound(standardDeviation(sortsAsNumbers[kk]), 3);
    sortsAsNumbers[kk].unshift(respondentNames[kk]);
    sortsAsNumbers[kk].push(average3, stddev);
    tempArray1.push(resNum, respondentNames[kk], average3, stddev);
    dataArray.push(sortsAsNumbers[kk]);
    freeDistributionArray.push(tempArray1);
  }
  outputData.push(dataArray);

  state.setState({
    freeDistributionArray
  });

  return [sheetNames, output, outputData, sheetNamesXlsx, colSizes];
};

export default pushSortsToOutputArray;
