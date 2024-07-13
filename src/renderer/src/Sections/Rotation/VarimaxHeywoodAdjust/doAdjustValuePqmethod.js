import calculateCommunalities from '../varimaxLogic/2calculateCommunalities';
import calcuateSigCriterionValues from '../varimaxLogic/2calculateSigCriterionValues';
import loadingsTableDataPrep from '../../Loadings/LoadingsTable/loadingsTableDataPrep';
import i18n from 'i18next';
import rotationState from '../../GlobalState/rotationState';
import factorState from '../../GlobalState/factorState';
import outputState from '../../GlobalState/outputState';
import loadingState from '../../GlobalState/loadingState';
import projectHistoryState from '../../GlobalState/projectHistoryState';

const doAdjustValue = () => {
  const transposedRotatedResults2 = rotationState.getState().adjValPqmArray;
  const projectHistoryArray = rotationState.getState().tempVarHeyProjectHistoryArray;

  const varimaxApplied = i18n.t('Varimax Applied');
  const valueOver1AdjustedToPQM = i18n.t(
    'factor loading greater than 1 adjusted to PQMethod value'
  );

  const varimaxLogMessage = `${varimaxApplied} - ${valueOver1AdjustedToPQM}`;

  const logMessageObj = {
    logMessage: varimaxLogMessage,
    logType: 'Varimax',
  };

  projectHistoryArray.push(logMessageObj);

  // use original newRotatedResults like PQMethod
  const newRotatedResults = rotationState.getState().tempVarHeyNewRotatedResults;
  const numFactors = rotationState.getState().tempVarHeyNumFactors;

  factorState.setState({ factorMatrix: transposedRotatedResults2 });
  projectHistoryState.setState({ projectHistoryArray: projectHistoryArray });
  rotationState.setState({ isCalculatingVarimax: false });
  rotationState.setState({ varimaxButtonDisabled: true });
  rotationState.setState({ varimaxButtonText: i18n.t('Varimax Applied') });
  // hide section 6
  outputState.setState({ showOutputFactorSelection: false });
  outputState.setState({ shouldDisplayFactorVizOptions: false });
  outputState.setState({ userSelectedFactors: [] });
  outputState.setState({ showFactorCorrelationsTable: false });
  outputState.setState({ showStandardErrorsDifferences: false });
  outputState.setState({ showFactorCharacteristicsTable: false });
  outputState.setState({ showDownloadOutputButtons: false });
  outputState.setState({ showDocxOptions: false });
  outputState.setState({ displayFactorVisualizations: false });
  loadingState.setState({ sendDataToOutputButtonColor: '#d6dbe0' });

  // remember - calc commun must be a matrix in table format
  calculateCommunalities(newRotatedResults);

  // get new signficance values
  calcuateSigCriterionValues('noFlag');

  // re-draw table
  loadingsTableDataPrep(numFactors);

  // archive values for undo function (ProjectHistory component)
  let archiveCounter = rotationState.getState().archiveCounter;
  archiveCounter += 1;
  const archiveName = `facMatrixArc${archiveCounter}`;

  rotationState.setState({ archiveCounter: archiveCounter });

  sessionStorage.setItem(archiveName, JSON.stringify(transposedRotatedResults2));
};

export default doAdjustValue;
