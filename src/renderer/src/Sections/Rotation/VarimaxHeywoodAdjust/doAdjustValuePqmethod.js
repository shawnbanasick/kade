import rotationState from "../../GlobalState/rotationState";
import factorState from "../../GlobalState/factorState";
import outputState from "../../GlobalState/outputState";
import loadingState from "../../GlobalState/loadingState";
import projectHistoryState from "../../GlobalState/projectHistoryState";
import calculateCommunalities from "../varimaxLogic/2calculateCommunalities";
import calcuateSigCriterionValues from "../varimaxLogic/2calculateSigCriterionValues";
import loadingsTableDataPrep from "../../Loadings/LoadingsTable/loadingsTableDataPrep";
import i18n from "i18next";
import getRotationState from "../../GlobalState/getRotationState";

const doAdjustValue = () => {
  const transposedRotatedResults2 = getRotationState("adjValPqmArray");
  const projectHistoryArray = getRotationState("tempVarHeyProjectHistoryArray");

  const varimaxApplied = i18n.t("Varimax Applied");
  const valueOver1AdjustedToPQM = i18n.t(
    "factor loading greater than 1 adjusted to PQMethod value"
  );

  const varimaxLogMessage = `${varimaxApplied} - ${valueOver1AdjustedToPQM}`;

  const logMessageObj = {
    logMessage: varimaxLogMessage,
    logType: "Varimax"
  };

  projectHistoryArray.push(logMessageObj);

  // use original newRotatedResults like PQMethod
  const newRotatedResults = getRotationState("tempVarHeyNewRotatedResults");

  const numFactors = getRotationState("tempVarHeyNumFactors");

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
  outputState.showDocxOptions = false;
  outputState.displayFactorVisualizations = false;
  loadingState.sendDataToOutputButtonColor = "#d6dbe0";

  // remember - calc commun must be a matrix in table format
  calculateCommunalities(newRotatedResults);

  // get new signficance values
  calcuateSigCriterionValues("noFlag");

  // re-draw table
  loadingsTableDataPrep(numFactors);

  // archive values for undo function (ProjectHistory component)
  let archiveCounter = getRotationState("archiveCounter");
  archiveCounter += 1;
  const archiveName = `facMatrixArc${archiveCounter}`;
  rotationState.archiveCounter = archiveCounter;

  sessionStorage.setItem(
    archiveName,
    JSON.stringify(transposedRotatedResults2)
  );
};

export default doAdjustValue;
