import loadingState from "../../GlobalState/loadingState";
import outputState from "../../GlobalState/outputState";

const clone = require("rfdc")();

const generateOutputFromLoadingTable = currentLoadingsTable => {
  // getState - initialize output select buttons highlighting to false
  const btnId = clone(outputState.outputButtonsArray);
  for (let i = 0; i < btnId.length; i += 1) {
    outputState[`highlightfactor${btnId[i]}`] = false;
  }
  loadingState.currentLoadingsTable = currentLoadingsTable;
  loadingState.notifyDataSentToOutputSuccess = true;
  outputState.userSelectedFactors = [];
  outputState.showOutputFactorSelection = true;
  outputState.showStandardErrorsDifferences = false;
  outputState.showFactorCharacteristicsTable = false;
  outputState.showDownloadOutputButtons = false;
  outputState.showFactorCorrelationsTable = false;
  outputState.displayFactorVisualizations = false;
  outputState.shouldDisplayFactorVizOptions = false;
  outputState.outputFactorSelectButtonsDisabled = false;
  // remove warning for no data in output section
  outputState.showTableDataNotSentWarning = false;
  // reset cache of factor viz data
  outputState.outputForDataViz2 = [];
  loadingState.sendDataToOutputButtonColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--main-theme-color");
  loadingState.gridRowDataLoadingsTable = currentLoadingsTable;

  return;
};

export default generateOutputFromLoadingTable;
