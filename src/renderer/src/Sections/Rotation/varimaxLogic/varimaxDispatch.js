import calcSumSquares from './2calcSumSquares';
import doVarimaxRotations from './2doVarimaxRotations';
import transposeMatrix from '../../../Utils/transposeMatrix';
import calculateCommunalities from './2calculateCommunalities';
import calcuateSigCriterionValues from './2calculateSigCriterionValues';
import calcStandardizedFactorMatrix from './2calcStandardizedFactorMatrix';
import loadingsTableDataPrep from '../../Loadings/LoadingsTable/loadingsTableDataPrep';
import doVarimaxHeywoodCheck from './doVarimaxHeywoodCheck';
import i18n from 'i18next';
import loadingState from '../../GlobalState/loadingState';
import rotationState from '../../GlobalState/rotationState';
import factorState from '../../GlobalState/factorState';
import projectHistoryState from '../../GlobalState/projectHistoryState';
import outputState from '../../GlobalState/outputState';
import coreState from '../../GlobalState/coreState';
import cloneDeep from 'lodash/cloneDeep';

const varimaxDispatch = function () {
  // archive loadings for use with undo functionality
  // archiveFactorScoreStateMatrixAndDatatable();

  // getState - retrieve and clone factor data
  const factorsForRotation = factorState.getState().factorMatrix;
  const numFactorsKeptForRot = rotationState.getState().numFactorsKeptForRot;

  factorsForRotation.length = numFactorsKeptForRot;

  const projectHistoryArray = projectHistoryState.getState().projectHistoryArray;

  // do varimax prep work
  const sumSquares = calcSumSquares(factorsForRotation); // ok, same
  const standardizedFactorMatrix = calcStandardizedFactorMatrix(sumSquares, factorsForRotation); // ok, same

  // calculate rotations
  const rotatedResults = doVarimaxRotations(standardizedFactorMatrix, sumSquares);

  const numFactors = rotationState.getState().numFactorsKeptForRot;

  // transposedRotatedResults in Lipset is now each factor = row, 9 cols, 7 rows
  const transposedRotatedResults = transposeMatrix(rotatedResults);
  const transposedRotatedResults2 = cloneDeep(transposedRotatedResults);

  // newRotatedResults in Lipset is now each factor as rows => 9 cols (participants), 7-8 rows

  const newRotatedResults = cloneDeep(rotatedResults);

  // Varimax Heywood Adjustments (when factor loading > 1.0 after varimax rot)
  const respondentNames = coreState.getState().respondentNames;
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

  rotationState.setState({ adjValArray: varimaxHeywoodCheck.adjValArray });
  rotationState.setState({ adjValPqmArray: varimaxHeywoodCheck.adjValPqmArray });

  // branch on varimax heywood check
  if (varimaxHeywoodCheck.needsVarimaxHeywoodAdjustment) {
    rotationState.setState({
      varimaxHeywoodWarningParticipants: varimaxHeywoodCheck.over1ParticipantsArray.join(', '),
    });
    // display dialogue
    rotationState.setState({ showVarimaxHeywoodWarning: true });
    // save temp vars
    rotationState.setState({ tempVarHeyTransposedRotatedResults2: transposedRotatedResults2 });
    rotationState.setState({ tempVarHeyProjectHistoryArray: projectHistoryArray });
    rotationState.setState({ tempVarHeyNewRotatedResults: newRotatedResults });
    rotationState.setState({ tempVarHeyNumFactors: numFactors });
  } else {
    const logMessageObj = {
      logMessage: i18n.t('Varimax rotation applied'),
      logType: 'Varimax',
    };

    projectHistoryArray.push(logMessageObj);

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
  }
};

export default varimaxDispatch;
