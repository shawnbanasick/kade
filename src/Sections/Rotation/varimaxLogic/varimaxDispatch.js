import cloneDeep from "lodash/cloneDeep";
import store from "../../../store";
import calcSumSquares from "./2calcSumSquares";
import doVarimaxRotations from "./2doVarimaxRotations";
import transposeMatrix from "../../../Utils/transposeMatrix";
import calculateCommunalities from "./2calculateCommunalities";
import calcuateSigCriterionValues from "./2calculateSigCriterionValues";
import calcStandardizedFactorMatrix from "./2calcStandardizedFactorMatrix";
import loadingsTableDataPrep from "../../Loadings/LoadingsTable/loadingsTableDataPrep";

const varimaxDispatch = function() {
  // archive loadings for use with undo functionality
  // archiveFactorScoreStateMatrixAndDatatable();

  // retrieve and clone factor data
  const factorsForRotation = store.getState("factorMatrix");
  const numFactorsKeptForRot = store.getState("numFactorsKeptForRot");

  factorsForRotation.length = numFactorsKeptForRot;

  const projectHistoryArray = store.getState("projectHistoryArray");

  // do varimax prep work
  const sumSquares = calcSumSquares(factorsForRotation); // ok, same
  const standardizedFactorMatrix = calcStandardizedFactorMatrix(
    sumSquares,
    factorsForRotation
  ); // ok, same

  // calculate rotations
  const rotatedResults = doVarimaxRotations(standardizedFactorMatrix, sumSquares);

  const numFactors = store.getState("numFactorsKeptForRot");

  // transposedRotatedResults in Lipset is now each factor = row, 9 cols, 7 rows
  const transposedRotatedResults = transposeMatrix(rotatedResults);

  const transposedRotatedResults2 = cloneDeep(transposedRotatedResults);

  projectHistoryArray.push("Varimax rotation applied");

  // newRotatedResults in Lipset is now each factor as rows => 9 cols (participants), 7-8 rows
  const newRotatedResults = cloneDeep(rotatedResults);

  store.setState({
    factorMatrix: transposedRotatedResults2,
    projectHistoryArray,
    isCalculatingVarimax: false,
    varimaxButtonDisabled: true,
    varimaxButtonText: "Varimax Applied",
    // hide section 6
    showOutputFactorSelection: false,
    shouldDisplayFactorVizOptions: false,
    userSelectedFactors: [],
    showFactorCorrelationsTable: false,
    showStandardErrorsDifferences: false,
    showFactorCharacteristicsTable: false,
    showDownloadOutputButtons: false,
    displayFactorVisualizations: false
  });

  // remember - calc commun must be a matrix in table format
  calculateCommunalities(newRotatedResults);

  // get new signficance values
  calcuateSigCriterionValues("noFlag");

  // re-draw table
  loadingsTableDataPrep(numFactors);

  // archive values for undo function (ProjectHistory component)
  let archiveCounter = store.getState("archiveCounter");
  archiveCounter += 1;
  const archiveName = `facMatrixArc${  archiveCounter}`;
  store.setState({
    archiveCounter
  });

  sessionStorage.setItem(
    archiveName,
    JSON.stringify(transposedRotatedResults2)
  );
};

export default varimaxDispatch;
