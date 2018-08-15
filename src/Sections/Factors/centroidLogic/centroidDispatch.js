import store from "../../store";
import cloneDeep from "lodash/cloneDeep";
import calcEigenValues from "./calcEigenValues";
import transposeMatrix from "../../Utils/transposeMatrix";
import calculateFactorLoadings from "./calculateFactorLoadings";
import calcScreePlotData from "../centroidLogic/calcScreePlotData";
import factorTableDataPrep from "../FactorTable/factorTableDataPrep";
import factorTableEigenDataPrep from "../FactorTableEigen/FactorTableEigenDataPrep";
import calcEigenCumulPercentArray from "../PcaLogic/calcEigenCumulPercentArray";
import calculateCommunalities from "../../S4-rotation/varimaxLogic/2calculateCommunalities";

// todo - make the centroid dropdown list dynamic in case only few sorts - not
// enough for all 7 factors

const centroidDispatch = numFactors => {
    let dataArray = store.getState("correlation5Calcs");
    let projectHistoryArray = store.getState("projectHistoryArray");
    let numCentroidFactors = store.getState("numCentroidFactors");
    let factorMatrix = [];

    for (var i = 0; i < numFactors; i++) {
        let tempArray = calculateFactorLoadings(dataArray);
        factorMatrix.push(tempArray[0]);
        dataArray = tempArray[1];
    }

    const numQsorts = store.getState("numQsorts");

    let factorMatrix1 = cloneDeep(factorMatrix);
    let explainVarandEigens = calcEigenValues(factorMatrix1, numQsorts);

    factorTableDataPrep(numFactors, factorMatrix1);

    let percentEigenVal = calcEigenCumulPercentArray(
        explainVarandEigens[0],
        numQsorts
    );
    // draw eigenvalues sub table
    factorTableEigenDataPrep(numFactors, [
        explainVarandEigens[0],
        ...percentEigenVal
    ]);

    // set data for scree chart
    let screePlotData = calcScreePlotData(explainVarandEigens[0]);

    // display style matrix
    let rotFacStateArray1 = cloneDeep(factorMatrix);

    // calc style matrix
    let rotFacStateArray = transposeMatrix(rotFacStateArray1);

    // in case autoflag of unrotated factor matrix in loadings table
    // expects display style matrix (factor cols), not factor rows
    calculateCommunalities(rotFacStateArray);

    projectHistoryArray.push(
        "Extracted " + numCentroidFactors + " Centroid Factors"
    );

    store.setState({
        factorMatrix: rotFacStateArray1, // pulled for first display on loadings table
        eigenvalues: explainVarandEigens[0],
        explainedVariance: explainVarandEigens[1],
        unrotatedFactorMatrix: factorMatrix,
        eigensPercentExpVar: percentEigenVal[0],
        cumulEigenPerVar: percentEigenVal[1],
        projectHistoryArray: projectHistoryArray,
        screePlotData: screePlotData,
        isCentroidLoading: false
    });

    // to use with the undo function in Project History
    sessionStorage.setItem("facMatrixArc0", JSON.stringify(rotFacStateArray1));
};

export default centroidDispatch;
