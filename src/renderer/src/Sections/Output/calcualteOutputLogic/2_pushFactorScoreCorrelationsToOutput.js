import map from "lodash/map";
import evenRound from "../../../Utils/evenRound";
import getPqmethodCorrelation from "../../Correlations/correlationsLogic/getPqmethodCorrelation";
import i18n from "i18next";

import calcState from "../../GlobalState/calcState";
import getCalcState from "../../GlobalState/getCalcState";
import getOutputState from "../../GlobalState/getOutputState";
const clone = require("rfdc")();

const pushFactorScoreCorrelationsToOutput = function(
  outputData,
  sheetNamesXlsx,
  colSizes
) {
  let appendText1 = i18n.t("Factor score correlations");
  // MS Excel tabs have max 30 characters, so shorten if long
  if (appendText1.length > 30) {
    appendText1 = i18n.t("Factor score correlations short");
  }

  sheetNamesXlsx.push(appendText1);

  const analysisOutput = getCalcState("analysisOutput");
  const userSelectedFactors = getOutputState("userSelectedFactors");
  const analysisOutput2 = clone(analysisOutput);
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

  // todo - converting to integer gives lots of variation with PQmethod - use evenRound?
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
    const factorName = `${i18n.t("Factor")} ${temp8.slice(7)}`;
    correlationTableArray[m].unshift(factorName);
  }

  const tempArray3 = [];
  tempArray3.push("");
  for (let p = 0; p < userSelectedFactors.length; p++) {
    const temp9 = userSelectedFactors[p];
    const factorName = `${i18n.t("Factor")} ${temp9.slice(7)}`;
    tempArray3.push(factorName);
  }
  correlationTableArray.unshift(tempArray3);

  calcState.correlationTableArrayHolder = correlationTableArray;

  correlationTableArray.unshift(
    ["scoreCorr", ""],
    ["", ""],
    [appendText1],
    ["", ""]
  );

  outputData.push(correlationTableArray);

  calcState.factorCorrelationsTableData = correlationTableArray;

  console.log("dispatch - 11 - pushFactorScoreCorrelations complete");
  return [analysisOutput, outputData, sheetNamesXlsx, colSizes];
};

export default pushFactorScoreCorrelationsToOutput;
