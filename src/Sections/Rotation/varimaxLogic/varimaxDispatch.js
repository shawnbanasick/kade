import store from "../../store";
import cloneDeep from "lodash/cloneDeep";
import calcSumSquares from "./2calcSumSquares";
import doVarimaxRotations from "./2doVarimaxRotations";
import transposeMatrix from "../../Utils/transposeMatrix";
import calculateCommunalities from "./2calculateCommunalities";
import calcuateSigCriterionValues from "./2calculateSigCriterionValues";
import calcStandardizedFactorMatrix from "./2calcStandardizedFactorMatrix";
import loadingsTableDataPrep from "../../S5-loadings/LoadingsTable/loadingsTableDataPrep";

const varimaxDispatch = function() {
    // archive loadings for use with undo functionality
    // archiveFactorScoreStateMatrixAndDatatable();

    // retrieve and clone factor data
    let factorsForRotation = store.getState("factorMatrix");
    let numFactorsKeptForRot = store.getState("numFactorsKeptForRot");

    factorsForRotation.length = numFactorsKeptForRot;

    let projectHistoryArray = store.getState("projectHistoryArray");

    // do varimax prep work
    let sumSquares = calcSumSquares(factorsForRotation); // ok, same
    let standardizedFactorMatrix = calcStandardizedFactorMatrix(
        sumSquares,
        factorsForRotation
    ); // ok, same

    // calculate rotations
    let rotatedResults = doVarimaxRotations(standardizedFactorMatrix, sumSquares);

    let numFactors = store.getState("numFactorsKeptForRot");

    // transposedRotatedResults in Lipset is now each factor = row, 9 cols, 7 rows
    let transposedRotatedResults = transposeMatrix(rotatedResults);

    let transposedRotatedResults2 = cloneDeep(transposedRotatedResults);

    projectHistoryArray.push("Varimax rotation applied");

    // newRotatedResults in Lipset is now each factor as rows => 9 cols (participants), 7-8 rows
    let newRotatedResults = cloneDeep(rotatedResults);

    store.setState({
        factorMatrix: transposedRotatedResults2,
        projectHistoryArray: projectHistoryArray,
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
    archiveCounter = archiveCounter + 1;
    let archiveName = "facMatrixArc" + archiveCounter;
    store.setState({
        archiveCounter: archiveCounter
    });

    sessionStorage.setItem(
        archiveName,
        JSON.stringify(transposedRotatedResults2)
    );
};

export default varimaxDispatch;
