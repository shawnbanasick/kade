import cloneDeep from "lodash/cloneDeep";
import state from "../../../store";
import evenRound from "../../../Utils/evenRound";

// todo - change function to accept factors as rows format and eliminate need to transpose factorMatrix
const calculateCommunalities = function(currentFactorData) {
  const calculateCommunalityArray = cloneDeep(currentFactorData);
  let temp, temp2, temp3, temp4, i, roundedValue, chartDataLength;
  const communalitiesArray = [];
  const fSigCriterion = [];

  function square(m) {
    return m * m;
  }

  // for each row (participant q-sort) in table format array
  calculateCommunalityArray.forEach(n => {
    // square all array values
    temp = n.map(square);

    // sum all array values
    temp2 = temp.reduce((a, b) => a + b);

    // do rounding and push to new array
    temp3 = evenRound(temp2, 5);
    communalitiesArray.push(temp3);

    // round squared array values calculated above
    temp4 = [];
    for (let k = 0, kLen = temp.length; k < kLen; k++) {
      roundedValue = evenRound(temp[k], 5);
      temp4.push(roundedValue);
    }
    fSigCriterion.push(temp4);
  });

  state.setState({
    fSigCriterion,
    rowH2: communalitiesArray
  });

  chartDataLength = calculateCommunalityArray.length;
  for (i = 0; i < chartDataLength; i++) {
    calculateCommunalityArray[i].push(communalitiesArray[i]);
  }
  return calculateCommunalityArray;
};

export default calculateCommunalities;

