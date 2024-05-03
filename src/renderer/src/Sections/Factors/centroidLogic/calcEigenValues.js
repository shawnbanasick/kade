import evenRound from "../.././../Utils/evenRound";
import sumArrayValues from "../../../Utils/sumArrayValues";
import squareValuesToNewArray from "../../../Utils/squareValuesToNewArray";

const calcEigenValues = (factorMatrix, numberSorts) => {
  const explainedVariance = [];
  const eigenvalues = [];

  factorMatrix.forEach((element, jIndex) => {
    const array = factorMatrix[jIndex];
    const eigenPrep = squareValuesToNewArray(array);
    const eigen = evenRound(sumArrayValues(eigenPrep), 4);
    eigenvalues.push(eigen);
    const totalVariancePrep = 100 * (eigen / numberSorts);
    const totalVariance = evenRound(totalVariancePrep, 0);
    explainedVariance.push(totalVariance);
  }, this);
  return [eigenvalues, explainedVariance];
};

export default calcEigenValues;
