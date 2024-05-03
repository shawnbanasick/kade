import loadingState from "../../GlobalState/loadingState";
import outputState from "../../GlobalState/outputState";
import factorState from "../../GlobalState/factorState";
import projectHistoryState from "../../GlobalState/projectHistoryState";
import rotationState from "../../GlobalState/rotationState";
import i18n from "i18next";
import getLoadingState from "../../GlobalState/getLoadingState";
import getFactorState from "../../GlobalState/getFactorState";
import getProjectHistoryState from "../../GlobalState/getProjectHistoryState";
import getRotationState from "../../GlobalState/getRotationState";

const invertFactor = () => {
  const factorToInvert = getLoadingState("factorToInvert");

  // only if a factor is selected
  if (factorToInvert !== undefined) {
    // flip the sign for the current table (includes user checked checkboxes)
    const factorToInvertText = `factor${factorToInvert}`;
    const currentLoadingsTable = getLoadingState("currentLoadingsTable");
    for (let i = 0; i < currentLoadingsTable.length; i += 1) {
      currentLoadingsTable[i][factorToInvertText] = -currentLoadingsTable[i][
        factorToInvertText
      ];
    }

    // pull project history and number facs from state
    const projectHistoryArray = getProjectHistoryState("projectHistoryArray");

    // get data
    const currentLoadings = getFactorState("factorMatrix");

    // getState - archive current data for undo function in loadings table
    let archiveCounter = getRotationState("archiveCounter");
    archiveCounter += 1;
    const archiveName = `facMatrixArc${archiveCounter}`;
    rotationState.archiveCounter = archiveCounter;

    // send archive to local storage to use with the undo function in Project History
    sessionStorage.setItem(archiveName, JSON.stringify([...currentLoadings]));

    // isolate the factor to invert
    const invertArray = currentLoadings[factorToInvert - 1];

    // do factor inversion
    for (let i = 0; i < invertArray.length; i += 1) {
      invertArray[i] = -invertArray[i];
    }

    // update project history
    const projectHistoryArrayText = `${i18n.t(
      "Factor"
    )} ${factorToInvert} ${i18n.t("was inverted")}`;

    const logMessageObj = {
      logMessage: projectHistoryArrayText,
      logType: "invertFactor"
    };

    projectHistoryArray.push(logMessageObj);

    factorState.factorMatrix = currentLoadings;

    // update loadings table
    loadingState.factorToInvert = undefined; // reset for modal
    rotationState.archiveCounter = archiveCounter;
    loadingState.sendDataToOutputButtonColor = "orange";
    loadingState.gridRowDataLoadingsTable = currentLoadingsTable;

    // update project log state
    projectHistoryState.projectHistoryArray = projectHistoryArray;

    // hide section 6
    outputState.showOutputFactorSelection = false;
    outputState.userSelectedFactors = [];
    outputState.shouldDisplayFactorVizOptions = false;
    outputState.showFactorCorrelationsTable = false;
    outputState.showStandardErrorsDifferences = false;
    outputState.showFactorCharacteristicsTable = false;
    outputState.showDownloadOutputButtons = false;
    outputState.displayFactorVisualizations = false;
    outputState.showDocxOptions = false;
  }
};

export default invertFactor;
