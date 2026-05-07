import rotationState from '../../../GlobalState/rotationState';
import coreState from '../../../GlobalState/coreState';
import cloneDeep from 'lodash/cloneDeep';

const doD3ChartDataPrep = (rotFacStateArray) => {
  console.log('doD3ChartDataPrep - rotFacStateArray:', JSON.stringify(rotFacStateArray));

  // getState
  const abFactors = cloneDeep(rotationState.getState().abFactors);
  const step4 = cloneDeep(coreState.getState().respondentNames);
  const fSigCriterionResults = cloneDeep(rotationState.getState().fSigCriterionResults);

  console.log('doD3ChartDataPrep - fSigCriterionResults:', JSON.stringify(fSigCriterionResults));

  const rotationFactorA = Math.min(...abFactors);
  const rotationFactorB = Math.max(...abFactors);
  const chartData = cloneDeep(rotFacStateArray);

  const dataValuesArray = [];
  const initialTwoFactorTableArray = [];
  let step1;
  let step3;
  let tempObj;

  const ilen = chartData.length;
  for (let i = 0; i < ilen; i += 1) {
    step1 = chartData[i];
    step3 = fSigCriterionResults[i];

    // console.log('doD3ChartDataPrep - step1:', JSON.stringify(step1));
    // console.log('doD3ChartDataPrep - step3:', JSON.stringify(step3));

    // CONVERT ARRAY TO OBJECT for D3js chart
    tempObj = {
      num: i + 1,
      respondent: step4[i],
      factor1: step1[rotationFactorA - 1],
      factor1Sig: step3[rotationFactorA - 1],
      factor2: step1[rotationFactorB - 1],
      factor2Sig: step3[rotationFactorB - 1],
    };
    dataValuesArray.push(tempObj);
  }

  const factorNameArrayFrag = [];
  const respondent2 = '';
  const factor1c = `Factor ${rotationFactorA}`;
  const factor2c = `Factor ${rotationFactorB}`;

  factorNameArrayFrag.push(respondent2, factor1c, factor2c);
  initialTwoFactorTableArray.unshift(factorNameArrayFrag);

  // console.log('dataValuesArray in doD3ChartDataPrep:', JSON.stringify(dataValuesArray));

  return dataValuesArray;
};

export default doD3ChartDataPrep;
