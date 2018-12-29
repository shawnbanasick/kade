import map from "lodash/map";
import cloneDeep from "lodash/cloneDeep";
import store from "../../../store";
import evenRound from "../../../Utils/evenRound";
import getPqmethodCorrelation from "../../Correlations/correlationsLogic/getPqmethodCorrelation";

const pushFactorScoreCorrelationsToOutput = function(
  sheetNames,
  output,
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  const appendText1 = "Factor score correlations";

  sheetNamesXlsx.push(appendText1);

  const analysisOutput = store.getState("analysisOutput");
  const userSelectedFactors = store.getState("userSelectedFactors");
  const analysisOutput2 = cloneDeep(analysisOutput);
  const factorScoresCorrelationArray2 = [];
  let temp1, tempArray;

  const columns = [
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

  function evenRoundFunc(n) {
    const temp1a = evenRound(n, 5);
    return temp1a;
  }

  // todo - converting to integer gives lots letiation with PQmethod - use evenRound?
  const factorScoresCorrelationArray = [];
  for (let q = 0; q < factorScoresCorrelationArray2.length; q++) {
    const temp11 = map(factorScoresCorrelationArray2[q], evenRoundFunc);
    factorScoresCorrelationArray.push(temp11);
  }

  function factorScoresCorrelationsHelper(factorScoresCorrelationArray, pullX) {
    let correlationHolder;
    let correlationHolder2;
    const correlationTableArrayFragment = [];

    factorScoresCorrelationArray.forEach(element => {
      correlationHolder2 = getPqmethodCorrelation(pullX, element);
      correlationHolder = evenRound(correlationHolder2[0], 4);
      correlationTableArrayFragment.push(correlationHolder);
    });
    return correlationTableArrayFragment;
  }

  let pullX;
  let correlationTableArrayFragment = [];
  const correlationTableArray = [];
  for (let k = 0; k < factorScoresCorrelationArray.length; k++) {
    pullX = factorScoresCorrelationArray[k];
    correlationTableArrayFragment = factorScoresCorrelationsHelper(
      factorScoresCorrelationArray,
      pullX
    );
    correlationTableArray.push(correlationTableArrayFragment);
    correlationTableArrayFragment = [];
  }

  // add factor names to first column
  for (let m = 0; m < correlationTableArray.length; m++) {
    const temp8 = userSelectedFactors[m];
    correlationTableArray[m].unshift(temp8);
  }

  const tempArray3 = [];
  tempArray3.push("");
  for (let p = 0; p < userSelectedFactors.length; p++) {
    const temp9 = userSelectedFactors[p];
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
