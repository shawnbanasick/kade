import store from "../../../store";
import loadingsTableDataPrep from "../LoadingsTable/loadingsTableDataPrep";

const invertFactor = () => {
  const factorToInvert = store.getState("factorToInvert");

  // only if a factor is selected
  if (factorToInvert !== undefined) {
    // pull project history and number facs from state
    const projectHistoryArray = store.getState("projectHistoryArray");
    const numFactorsKeptForRot = store.getState("numFactorsKeptForRot");

    // get data
    const currentLoadings = store.getState("factorMatrix");

    // archive current data for undo function in loadings table
    let archiveCounter = store.getState("archiveCounter");
    archiveCounter += 1;
    const archiveName = `facMatrixArc${archiveCounter}`;

    // send archive to local storage to use with the undo function in Project History
    sessionStorage.setItem(archiveName, JSON.stringify([...currentLoadings]));

    // isolate the factor to invert
    const invertArray = currentLoadings[factorToInvert - 1];

    // do factor inversion
    for (let i = 0; i < invertArray.length; i++) {
      invertArray[i] = -invertArray[i];
    }

    // update project history
    const projectHistoryArrayText = `Factor ${factorToInvert} was inverted`;
    projectHistoryArray.push(projectHistoryArrayText);

    store.setState({
      factorMatrix: currentLoadings,
      factorToInvert: undefined, // reset for modal
      archiveCounter,
      projectHistoryArray,
      // hide section 6
      showOutputFactorSelection: false,
      userSelectedFactors: [],
      shouldDisplayFactorVizOptions: false,
      showFactorCorrelationsTable: false,
      showStandardErrorsDifferences: false,
      showFactorCharacteristicsTable: false,
      showDownloadOutputButtons: false,
      displayFactorVisualizations: false,
      sendDataToOutputButtonColor: "orange"
    });

    // call table update with new inverted factor
    loadingsTableDataPrep(numFactorsKeptForRot);
  }
};

export default invertFactor;
