import store from "../../store";
import loadingsTableDataPrep from "../LoadingsTable/loadingsTableDataPrep";

const invertFactor = () => {
    let factorToInvert = store.getState("factorToInvert");

    // only if a factor is selected
    if (factorToInvert !== undefined) {
        let projectHistoryArray = store.getState("projectHistoryArray");
        let numFactorsKeptForRot = store.getState("numFactorsKeptForRot");

        // get data
        let currentLoadings = store.getState("factorMatrix");

        // archive current data for undo function in loadings table
        let archiveCounter = store.getState("archiveCounter");
        archiveCounter = archiveCounter + 1;
        let archiveName = "facMatrixArc" + archiveCounter;

        // send archive to local storage to use with the undo function in Project History
        sessionStorage.setItem(archiveName, JSON.stringify([...currentLoadings]));

        // isolate the factor to invert
        let invertArray = currentLoadings[factorToInvert - 1];

        // do factor inversion
        for (let i = 0; i < invertArray.length; i++) {
            invertArray[i] = -invertArray[i];
        }

        // update project history
        let projectHistoryArrayText = "Factor " + factorToInvert + " was inverted";
        projectHistoryArray.push(projectHistoryArrayText);

        store.setState({
            factorMatrix: currentLoadings,
            factorToInvert: undefined, // reset for modal
            archiveCounter: archiveCounter,
            projectHistoryArray: projectHistoryArray,
            // hide section 6
            showOutputFactorSelection: false,
            userSelectedFactors: [],            
            shouldDisplayFactorVizOptions: false,
            showFactorCorrelationsTable: false,
            showStandardErrorsDifferences: false,
            showFactorCharacteristicsTable: false,
            showDownloadOutputButtons: false,
            displayFactorVisualizations: false
        });

        // call table update with new inverted factor
        loadingsTableDataPrep(numFactorsKeptForRot);
    }
};

export default invertFactor;
