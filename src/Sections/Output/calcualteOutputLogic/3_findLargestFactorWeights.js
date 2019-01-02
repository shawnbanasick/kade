import uniq from "lodash/uniq";
import cloneDeep from "lodash/cloneDeep";
import state from "../../../store";
import evenRound from "../../../Utils/evenRound";

const findLargestFactorWeights = function(significantLoadingsArray) {
  // remove unique sorts (value 99) from array
  const factorSelect = significantLoadingsArray.filter((n) => n[0] !== 99);

  // pull out just factor number and W value to array
  const factorNumbersArray2 = [];
  const factorNumbersArray = [];
  factorSelect.forEach((n) => {
    const factorNumber = n[0]; // i.e. factor1
    factorNumbersArray2.push(factorNumber);
    const factorWeightW = n[3];
    const tempArray = [factorNumber, factorWeightW];
    factorNumbersArray.push(tempArray);
  });

  const sigArray = cloneDeep(factorNumbersArray2);

  // get unique array of significant factors labels
  const sigFactorNumbersArray = uniq(sigArray);

  const maxFactorValuesArray = [];
  let factorValue = 0;
  sigFactorNumbersArray.forEach(() => {
    const temp = factorNumbersArray.filter((j) => j[0] === sigArray[factorValue]);

    const tempArray2 = [];
    temp.forEach((q) => {
      const tempVar3 = evenRound(Math.abs(1 / q[1]), 8);
      tempArray2.push(tempVar3);
    });

    // numbers inverted, so using min rather max somewhere else
    const maxFactorValue = Math.min(...tempArray2);

    maxFactorValuesArray.push(maxFactorValue);

    factorValue += 1;
  });

  // array
  state.setState({
    sigFactorNumbersArray
  });

  return [
    significantLoadingsArray,
    sigFactorNumbersArray,
    maxFactorValuesArray
  ];
};

export default findLargestFactorWeights;
