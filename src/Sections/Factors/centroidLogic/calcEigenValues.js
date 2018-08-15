import squareValuesToNewArray from "../../Utils/squareValuesToNewArray";
import sumArrayValues from "../../Utils/sumArrayValues";
import evenRound from "../../Utils/evenRound";

const calcEigenValues = (factorMatrix, numberSorts) => {
    let explainedVariance = [];
    let eigenvalues = [];

    factorMatrix.forEach(function(element, jIndex) {
        let array = factorMatrix[jIndex];
        let eigenPrep = squareValuesToNewArray(array);
        let eigen = evenRound(sumArrayValues(eigenPrep), 4);
        eigenvalues.push(eigen);
        let totalVariancePrep = 100 * (eigen / numberSorts);
        let totalVariance = evenRound(totalVariancePrep, 0);
        explainedVariance.push(totalVariance);
    }, this);
    return [eigenvalues, explainedVariance];
};

export default calcEigenValues;
