import map from 'lodash/map';
import store from "../../store";
import cloneDeep from "lodash/cloneDeep";
import evenRound from "../../Utils/evenRound";

import { getPqmethodCorrelation } from "../../S2-corr/corrLogic/getPqmethodCorrelation";

const pushFactorScoreCorrelationsToOutput = function(
  sheetNames,
  output,
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  let appendText1 = "Factor score correlations";

  sheetNamesXlsx.push(appendText1);

  let analysisOutput = store.getState("analysisOutput");
  let userSelectedFactors = store.getState("userSelectedFactors");
  let analysisOutput2 = cloneDeep(analysisOutput);
  let factorScoresCorrelationArray2 = [];
  let temp1,
    tempArray;

  let columns = [
    {
      wch: 7
    }
  ];
  for (let ss = 0, ssLen = userSelectedFactors.length; ss < ssLen; ss++) {
    columns.push({
      wch: 7
    });
  }
  colSizes.push(columns);

  // i loop through selected factors, j loop through sorts to get new array of z-scores
  // todo - added after other calculations, so now repeats with factor download sheets - dry out
  for (let i = 0; i < userSelectedFactors.length; i++) {
    // let temp2 = userSelectedFactors[i];
    tempArray = [];
    for (let j = 0; j < analysisOutput2[i].length; j++) {
      temp1 = analysisOutput2[i][j].zScore;
      tempArray.push(temp1);
    }
    factorScoresCorrelationArray2.push(tempArray);
  }

  // todo - converting to integer gives lots letiation with PQmethod - use evenRound?
  let factorScoresCorrelationArray = [];
  for (let q = 0; q < factorScoresCorrelationArray2.length; q++) {
    let temp11 = map(factorScoresCorrelationArray2[q], evenRoundFunc);
    factorScoresCorrelationArray.push(temp11);
  }

  function evenRoundFunc(n) {
    let temp1 = evenRound(n, 5);
    return temp1;
  }

  let pullX;
  let correlationTableArrayFragment = [];
  let correlationTableArray = [];
  for (let k = 0; k < factorScoresCorrelationArray.length; k++) {
    pullX = factorScoresCorrelationArray[k];
    correlationTableArrayFragment = factorScoresCorrelationsHelper(
      factorScoresCorrelationArray,
      pullX
    );
    correlationTableArray.push(correlationTableArrayFragment);
    correlationTableArrayFragment = [];
  }

  function factorScoresCorrelationsHelper(factorScoresCorrelationArray, pullX) {
    let correlationHolder,
      correlationHolder2;
    let correlationTableArrayFragment = [];

    factorScoresCorrelationArray.forEach(function(element) {
      correlationHolder2 = getPqmethodCorrelation(pullX, element);
      correlationHolder = evenRound(correlationHolder2[0], 4);
      correlationTableArrayFragment.push(correlationHolder);
    });
    return correlationTableArrayFragment;
  }

  // add factor names to first column
  for (let m = 0; m < correlationTableArray.length; m++) {
    let temp8 = userSelectedFactors[m];
    correlationTableArray[m].unshift(temp8);
  }

  let tempArray3 = [];
  tempArray3.push("");
  for (let p = 0; p < userSelectedFactors.length; p++) {
    let temp9 = userSelectedFactors[p];
    tempArray3.push(temp9);
  }
  correlationTableArray.unshift(tempArray3);

  store.setState({
    correlationTableArrayHolder: correlationTableArray
  });
  output.push(correlationTableArray);

  correlationTableArray.unshift(["", ""], [appendText1], ["", ""]);

  outputData.push(correlationTableArray);

  store.setState({
    factorCorrelationsTableData: correlationTableArray
  });

  return [
    sheetNames,
    output,
    analysisOutput,
    outputData,
    sheetNamesXlsx,
    colSizes
  ];
};

export default pushFactorScoreCorrelationsToOutput;
