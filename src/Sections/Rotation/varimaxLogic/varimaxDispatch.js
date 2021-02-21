import calcSumSquares from "./2calcSumSquares";
import doVarimaxRotations from "./2doVarimaxRotations";
import transposeMatrix from "../../../Utils/transposeMatrix";
import calculateCommunalities from "./2calculateCommunalities";
import calcuateSigCriterionValues from "./2calculateSigCriterionValues";
import calcStandardizedFactorMatrix from "./2calcStandardizedFactorMatrix";
import loadingsTableDataPrep from "../../Loadings/LoadingsTable/loadingsTableDataPrep";
import loadingState from "../../GlobalState/loadingState";
import rotationState from "../../GlobalState/rotationState";
import factorState from "../../GlobalState/factorState";
import projectHistoryState from "../../GlobalState/projectHistoryState";
import coreState from "../../GlobalState/coreState";
import outputState from "../../GlobalState/outputState";
import doVarimaxHeywoodCheck from "./doVarimaxHeywoodCheck";
import i18n from "i18next";
const clone = require("rfdc")();

const varimaxDispatch = function() {
  // archive loadings for use with undo functionality
  // archiveFactorScoreStateMatrixAndDatatable();

  // getState - retrieve and clone factor data
  const factorsForRotation = clone(factorState.factorMatrix);
  const numFactorsKeptForRot = rotationState.numFactorsKeptForRot;

  factorsForRotation.length = numFactorsKeptForRot;

  const projectHistoryArray = clone(projectHistoryState.projectHistoryArray);

  // do varimax prep work
  const sumSquares = calcSumSquares(factorsForRotation); // ok, same
  const standardizedFactorMatrix = calcStandardizedFactorMatrix(
    sumSquares,
    factorsForRotation
  ); // ok, same

  // calculate rotations
  const rotatedResults = doVarimaxRotations(
    standardizedFactorMatrix,
    sumSquares
  );

  const numFactors = rotationState.numFactorsKeptForRot;

  // transposedRotatedResults in Lipset is now each factor = row, 9 cols, 7 rows
  const transposedRotatedResults = transposeMatrix(rotatedResults);
  const transposedRotatedResults2 = clone(transposedRotatedResults);

  // newRotatedResults in Lipset is now each factor as rows => 9 cols (participants), 7-8 rows

  const newRotatedResults = clone(rotatedResults);

  // Varimax Heywood Adjustments (when factor loading > 1.0 after varimax rot)
  const respondentNames = clone(coreState.respondentNames);
  const needsVarimaxHeywoodAdjustment = false;
  const adjValArray = [];
  const adjValPqmArray = [];
  const over1ParticipantsArray = [];
  const varimaxHeywoodCheck = doVarimaxHeywoodCheck(
    transposedRotatedResults2,
    respondentNames,
    needsVarimaxHeywoodAdjustment,
    adjValArray,
    adjValPqmArray,
    over1ParticipantsArray
  );

  rotationState.adjValArray = varimaxHeywoodCheck.adjValArray;
  rotationState.adjValPqmArray = varimaxHeywoodCheck.adjValPqmArray;

  // branch on varimax heywood check
  if (varimaxHeywoodCheck.needsVarimaxHeywoodAdjustment) {
    rotationState.varimaxHeywoodWarningParticipants = varimaxHeywoodCheck.over1ParticipantsArray.join(
      ", "
    );
    // display dialogue
    rotationState.showVarimaxHeywoodWarning = true;
    // save temp vars
    rotationState.tempVarHeyTransposedRotatedResults2 = transposedRotatedResults2;
    rotationState.tempVarHeyProjectHistoryArray = projectHistoryArray;
    rotationState.tempVarHeyNewRotatedResults = newRotatedResults;
    rotationState.tempVarHeyNumFactors = numFactors;
  } else {
    const logMessageObj = {
      logMessage: i18n.t("Varimax rotation applied"),
      logType: "Varimax"
    };

    projectHistoryArray.push(logMessageObj);

    factorState.factorMatrix = transposedRotatedResults2;
    projectHistoryState.projectHistoryArray = projectHistoryArray;
    rotationState.isCalculatingVarimax = false;
    rotationState.varimaxButtonDisabled = true;
    rotationState.varimaxButtonText = i18n.t("Varimax Applied");
    // hide section 6
    outputState.showOutputFactorSelection = false;
    outputState.shouldDisplayFactorVizOptions = false;
    outputState.userSelectedFactors = [];
    outputState.showFactorCorrelationsTable = false;
    outputState.showStandardErrorsDifferences = false;
    outputState.showFactorCharacteristicsTable = false;
    outputState.showDownloadOutputButtons = false;
    outputState.displayFactorVisualizations = false;
    loadingState.sendDataToOutputButtonColor = "#d6dbe0";

    // remember - calc commun must be a matrix in table format
    calculateCommunalities(newRotatedResults);

    // get new signficance values
    calcuateSigCriterionValues("noFlag");

    // re-draw table
    loadingsTableDataPrep(numFactors);

    // archive values for undo function (ProjectHistory component)
    let archiveCounter = rotationState.archiveCounter;
    archiveCounter += 1;
    const archiveName = `facMatrixArc${archiveCounter}`;
    rotationState.archiveCounter = archiveCounter;

    sessionStorage.setItem(
      archiveName,
      JSON.stringify(transposedRotatedResults2)
    );
  }
};

export default varimaxDispatch;
