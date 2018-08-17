import cloneDeep from "lodash/cloneDeep";
import store from "../../../../store";

const doD3ChartDataPrep = function(rotFacStateArray) {
  const abFactors = store.getState("abFactors");
  const rotationFactorA = Math.min(...abFactors);
  const rotationFactorB = Math.max(...abFactors);

  const step4 = store.getState("respondentNames");
  const fSigCriterionResults = store.getState("fSigCriterionResults");

  const chartData = cloneDeep(rotFacStateArray);

  // console.log('chartData for insert: ' + JSON.stringify(chartData));

  const dataValuesArray = [];
  const initialTwoFactorTableArray = [];
  let step1, step3, ilen, factorNameArrayFrag, respondent2, factor1c, factor2c;
  let tempObj;

  ilen = chartData.length;
  for (let i = 0; i < ilen; i++) {
    step1 = chartData[i];
    step3 = fSigCriterionResults[i];

    // CONVERT ARRAY TO OBJECT for D3js chart
    tempObj = {
      num: i + 1,
      respondent: step4[i],
      factor1: step1[rotationFactorA - 1],
      factor1Sig: step3[rotationFactorA - 1],
      factor2: step1[rotationFactorB - 1],
      factor2Sig: step3[rotationFactorB - 1]
    };
    dataValuesArray.push(tempObj);
  }

  factorNameArrayFrag = [];
  respondent2 = "";
  factor1c = `Factor ${  rotationFactorA}`;
  factor2c = `Factor ${  rotationFactorB}`;

  factorNameArrayFrag.push(respondent2, factor1c, factor2c);
  initialTwoFactorTableArray.unshift(factorNameArrayFrag);

  return dataValuesArray;
};

export default doD3ChartDataPrep;
