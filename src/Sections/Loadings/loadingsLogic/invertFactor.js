import state from "../../../store";

const invertFactor = () => {
  const factorToInvert = state.getState("factorToInvert");

  // only if a factor is selected
  if (factorToInvert !== undefined) {
    // flip the sign for the current table (includes user checked checkboxes)
    const factorToInvertText = `factor${factorToInvert}`;
    const currentLoadingsTable = state.getState("currentLoadingsTable");
    for (let i = 0; i < currentLoadingsTable.length; i += 1) {
      currentLoadingsTable[i][factorToInvertText] = -currentLoadingsTable[i][
        factorToInvertText
      ];
    }

    // pull project history and number facs from state
    const projectHistoryArray = state.getState("projectHistoryArray");

    // get data
    const currentLoadings = state.getState("factorMatrix");

    // archive current data for undo function in loadings table
    let archiveCounter = state.getState("archiveCounter");
    archiveCounter += 1;
    const archiveName = `facMatrixArc${archiveCounter}`;

    // send archive to local storage to use with the undo function in Project History
    sessionStorage.setItem(archiveName, JSON.stringify([...currentLoadings]));

    // isolate the factor to invert
    const invertArray = currentLoadings[factorToInvert - 1];

    // do factor inversion
    for (let i = 0; i < invertArray.length; i += 1) {
      invertArray[i] = -invertArray[i];
    }

    // update project history
    const projectHistoryArrayText = `Factor ${factorToInvert} was inverted`;
    projectHistoryArray.push(projectHistoryArrayText);

    state.setState({
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
      sendDataToOutputButtonColor: "orange",
      gridRowDataLoadingsTable: currentLoadingsTable
    });
  }
};

export default invertFactor;
