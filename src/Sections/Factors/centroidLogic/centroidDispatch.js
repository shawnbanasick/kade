import cloneDeep from "lodash/cloneDeep";
import state from "../../../store";
import calcEigenValues from "./calcEigenValues";
import transposeMatrix from "../../../Utils/transposeMatrix";
import calculateFactorLoadings from "./calculateFactorLoadings";
import calcScreePlotData from "../centroidLogic/calcScreePlotData";
import factorTableDataPrep from "../FactorTable/factorTableDataPrep";
import calcEigenCumulPercentArray from "../PcaLogic/calcEigenCumulPercentArray";
import factorTableEigenDataPrep from "../FactorTableEigen/FactorTableEigenDataPrep";
import calculateCommunalities from "../../Rotation/varimaxLogic/2calculateCommunalities";

// todo - make the centroid dropdown list dynamic in case only few sorts - not
// enough for all 7 factors

const centroidDispatch = numFactors => {
  let dataArray = state.getState("correlation5Calcs");
  const projectHistoryArray = state.getState("projectHistoryArray");
  const numCentroidFactors = state.getState("numCentroidFactors");
  const factorMatrix = [];

  for (let i = 0; i < numFactors; i += 1) {
    const tempArray = calculateFactorLoadings(dataArray);
    factorMatrix.push(tempArray[0]);
    dataArray = tempArray[1];
  }

  const numQsorts = state.getState("numQsorts");

  const factorMatrix1 = cloneDeep(factorMatrix);
  const explainVarandEigens = calcEigenValues(factorMatrix1, numQsorts);

  factorTableDataPrep(numFactors, factorMatrix1);

  const percentEigenVal = calcEigenCumulPercentArray(
    explainVarandEigens[0],
    numQsorts
  );
  // draw eigenvalues sub table
  factorTableEigenDataPrep(numFactors, [
    explainVarandEigens[0],
    ...percentEigenVal
  ]);

  // set data for scree chart
  const screePlotData = calcScreePlotData(explainVarandEigens[0]);

  // display style matrix
  const rotFacStateArray1 = cloneDeep(factorMatrix);

  // calc style matrix
  const rotFacStateArray = transposeMatrix(rotFacStateArray1);

  // in case autoflag of unrotated factor matrix in loadings table
  // expects display style matrix (factor cols), not factor rows
  calculateCommunalities(rotFacStateArray);

  projectHistoryArray.push(`Extracted ${numCentroidFactors} Centroid Factors`);

  state.setState({
    factorMatrix: rotFacStateArray1, // pulled for first display on loadings table
    eigenvalues: explainVarandEigens[0],
    explainedVariance: explainVarandEigens[1],
    unrotatedFactorMatrix: factorMatrix,
    eigensPercentExpVar: percentEigenVal[0],
    cumulEigenPerVar: percentEigenVal[1],
    projectHistoryArray,
    screePlotData,
    isCentroidLoading: false
  });

  // to use with the undo function in Project History
  sessionStorage.setItem("facMatrixArc0", JSON.stringify(rotFacStateArray1));
};

export default centroidDispatch;
