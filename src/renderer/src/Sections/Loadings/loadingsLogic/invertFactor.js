import i18n from 'i18next';
import loadingState from '../../GlobalState/loadingState';
import outputState from '../../GlobalState/outputState';
import factorState from '../../GlobalState/factorState';
import projectHistoryState from '../../GlobalState/projectHistoryState';
import rotationState from '../../GlobalState/rotationState';

const invertFactor = () => {
  const factorToInvert = loadingState.getState().factorToInvert;

  // only if a factor is selected
  if (factorToInvert !== undefined) {
    // flip the sign for the current table (includes user checked checkboxes)
    const factorToInvertText = `factor${factorToInvert}`;
    const currentLoadingsTable = loadingState.getState().currentLoadingsTable;
    for (let i = 0; i < currentLoadingsTable.length; i += 1) {
      currentLoadingsTable[i][factorToInvertText] = -currentLoadingsTable[i][factorToInvertText];
    }

    // pull project history and number facs from state
    const projectHistoryArray = projectHistoryState.getState().projectHistoryArray;

    // get data
    const currentLoadings = factorState.getState().factorMatrix;

    // getState - archive current data for undo function in loadings table
    let archiveCounter = rotationState.getState().archiveCounter;
    archiveCounter += 1;
    const archiveName = `facMatrixArc${archiveCounter}`;
    rotationState.setState({ archiveCounter: archiveCounter });

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
      'Factor'
    )} ${factorToInvert} ${i18n.t('was inverted')}`;

    const logMessageObj = {
      logMessage: projectHistoryArrayText,
      logType: 'invertFactor',
    };

    projectHistoryArray.push(logMessageObj);

    factorState.setState({ factorMatrix: currentLoadings });

    // update loadings table
    loadingState.setState({ factorToInvert: undefined }); // reset for modal
    loadingState.setState({ sendDataToOutputButtonColor: 'orange' });
    loadingState.setState({ gridRowDataLoadingsTable: currentLoadingsTable });

    rotationState.setState({ archiveCounter: archiveCounter });

    // update project log state
    projectHistoryState.setState({ projectHistoryArray: projectHistoryArray });

    // hide section 6
    outputState.setState({ showOutputFactorSelection: false });
    outputState.setState({ userSelectedFactors: [] });
    outputState.setState({ shouldDisplayFactorVizOptions: false });
    outputState.setState({ showFactorCorrelationsTable: false });
    outputState.setState({ showStandardErrorsDifferences: false });
    outputState.setState({ showFactorCharacteristicsTable: false });
    outputState.setState({ showDownloadOutputButtons: false });
    outputState.setState({ displayFactorVisualizations: false });
    outputState.setState({ showDocxOptions: false });
  }
};

export default invertFactor;
