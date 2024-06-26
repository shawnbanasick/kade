import getRotationState from "../../../GlobalState/getRotationState";
import getCoreState from "../../../GlobalState/getCoreState";
const clone = require("rfdc")();

const doD3ChartDataPrep = rotFacStateArray => {
  // getState
  const abFactors = getRotationState("abFactors");
  const rotationFactorA = Math.min(...abFactors);
  const rotationFactorB = Math.max(...abFactors);

  const step4 = getCoreState("respondentNames");
  const fSigCriterionResults = getRotationState("fSigCriterionResults");

  const chartData = clone(rotFacStateArray);

  const dataValuesArray = [];
  const initialTwoFactorTableArray = [];
  let step1;
  let step3;
  let tempObj;

  const ilen = chartData.length;
  for (let i = 0; i < ilen; i += 1) {
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

  const factorNameArrayFrag = [];
  const respondent2 = "";
  const factor1c = `Factor ${rotationFactorA}`;
  const factor2c = `Factor ${rotationFactorB}`;

  factorNameArrayFrag.push(respondent2, factor1c, factor2c);
  initialTwoFactorTableArray.unshift(factorNameArrayFrag);

  return dataValuesArray;
};

export default doD3ChartDataPrep;
