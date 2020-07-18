import rotationState from "../../GlobalState/rotationState";
import factorState from "../../GlobalState/factorState";
import outputState from "../../GlobalState/outputState";
import projectHistoryState from "../../GlobalState/projectHistoryState";
import calculateCommunalities from "../varimaxLogic/2calculateCommunalities";
import calcuateSigCriterionValues from "../varimaxLogic/2calculateSigCriterionValues";
import loadingsTableDataPrep from "../../Loadings/LoadingsTable/loadingsTableDataPrep";
import i18n from "i18next";

const clone = require("rfdc")();

const doContinueAnalysis = () => {
  const transposedRotatedResults2 = clone(
    rotationState.tempVarHeyTransposedRotatedResults2
  );
  const projectHistoryArray = clone(
    rotationState.tempVarHeyProjectHistoryArray
  );
  const newRotatedResults = clone(rotationState.tempVarHeyNewRotatedResults);
  const numFactors = clone(rotationState.tempVarHeyNumFactors);

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
  outputState.sendDataToOutputButtonColor = "#d6dbe0";

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
};

export default doContinueAnalysis;
