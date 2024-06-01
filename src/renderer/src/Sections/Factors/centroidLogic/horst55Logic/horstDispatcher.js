import horstMain from './horstMain';
import calcCumulativeVar from './calcCumulativeVar';
import formatScreePlotData from './formatScreePlotData';
import factorTableDataPrep from '../../FactorTable/factorTableDataPrep';
import factorTableEigenDataPrep from '../../FactorTableEigen/FactorTableEigenDataPrep';
import transposeMatrix from '../../../../Utils/transposeMatrix';
import calculateCommunalities from '../../../Rotation/varimaxLogic/2calculateCommunalities';
import doHeywoodCheck from './doHeywoodCheck';
import calcEigenValues from './calcEigenValues';
import i18n from 'i18next';
import cloneDeep from 'lodash/cloneDeep';
import projectHistoryState from '../../../GlobalState/projectHistoryState';
import factorState from '../../../GlobalState/factorState';
import correlationState from '../../../GlobalState/correlationState';
import coreState from '../../../GlobalState/coreState';

const horstDispatcher = (shouldUseHorstLimit) => {
  // STATE
  const respondentNames = coreState.getState().respondentNames;
  const dataArray = correlationState.getState().correlation5Calcs;
  const projectHistoryArray = projectHistoryState.getState().projectHistoryArray;
  let numCentroidFactors = factorState.getState().numCentroidFactors;

  // ************************************
  // CALC HORST MAIN --- [var names (mostly) follow Horst 5.5 for ease of porting]
  // ************************************
  const STPCRT = shouldUseHorstLimit;

  const numState = coreState.getState().numStatements;
  const NL = factorState.getState().horstIterations;
  const P = factorState.getState().horstThresholdLevel;

  const horstCalculations2 = horstMain(numCentroidFactors, STPCRT, dataArray, numState, NL, P);

  // DO NOT DELETE - Horst auto-extract resets the number of factors
  // so we need to set STATE with the new value
  numCentroidFactors = factorState.getState().numCentroidFactors;

  const horstCalculations = cloneDeep(horstCalculations2);

  const fMatrix = horstCalculations.fMatrix;
  const numQsorts = fMatrix[0].length;

  // ************************************
  // CALC COMMUNALITIES
  // ************************************
  const rotFacStateArray1 = cloneDeep(fMatrix);
  const rotFacStateArray = transposeMatrix(rotFacStateArray1);
  // in case autoflag of unrotated factor matrix in loadings table
  // expects display style matrix (factor cols), not factor rows
  const communalityArray = calculateCommunalities(rotFacStateArray);

  // ************************************
  // DO HEYWOOD CHECK
  // ************************************
  let hasHeywoodCase = false;
  doHeywoodCheck(communalityArray, respondentNames, hasHeywoodCase);

  // ************************************
  // CALC EIGENS
  // ************************************
  const explainVarandEigens = calcEigenValues(fMatrix, numQsorts);

  const cumulativeVar = calcCumulativeVar(explainVarandEigens[1]);
  const explainedVar = cloneDeep(explainVarandEigens[1]);
  const cumulativeVarWithText1 = cloneDeep(cumulativeVar);
  const eigenvalues = cloneDeep(explainVarandEigens[0]);
  const percentEigenVal = [[...explainedVar], [...cumulativeVarWithText1]];

  // ************************************
  // PREP SCREE PLOT
  // ************************************

  const formattedScreePlotData = formatScreePlotData(explainVarandEigens[0]);

  // ************************************
  // PREP FACTOR TABLE
  // ************************************
  // get data for factor table
  // getState - coreState, get Translations, do factor table data prep
  const participantTrans = i18n.t('Participant');
  const factorTrans = i18n.t('Factor');
  const nmTrans = i18n.t('Nm');
  const translationsText = { participantTrans, factorTrans, nmTrans };
  const factorTableData = factorTableDataPrep(
    numCentroidFactors,
    fMatrix,
    respondentNames,
    translationsText
  );

  factorState.gridColDefsFactorTable = factorTableData.gridColDefsFactorTable;
  factorState.gridRowDataFactorTable = factorTableData.gridRowDataFactorTable;
  factorState.unrotatedFactorMatrixOutput = factorTableData.unrotatedFactorArray;

  // ************************************
  // PREP EIGENS TABLE
  // ************************************
  // paint eigenvalues sub table and write results to state
  const eigenValuesTrans = i18n.t('Eigenvalues');
  const explainedVarianceTrans = i18n.t('Explained Variance');
  const cumuExplainedVarianceTrans = i18n.t('Cumulative Explained Variance');
  const factorTrans2 = i18n.t('Factor');
  const eigensTranslations = {
    eigenValuesTrans,
    explainedVarianceTrans,
    cumuExplainedVarianceTrans,
    factorTrans2,
  };
  const factorTableEigenData = factorTableEigenDataPrep(
    numCentroidFactors,
    [explainVarandEigens[0], ...percentEigenVal],
    eigensTranslations
  );
  factorState.didNotConverge = horstCalculations2.didNotConverge;
  factorState.gridColDefsFacTableEigen = factorTableEigenData.gridColDefsFacTableEigen;
  factorState.gridRowDataFacTableEigen = factorTableEigenData.gridRowDataFacTableEigen;

  // after eigen table data prep to prevent double labelling
  let eigenText = i18n.t('Eigenvalues');
  const eigenvaluesWithText = [eigenText, ...eigenvalues];

  // ************************************
  // PREP EXPLAINED VARIANCE TABLE
  // ************************************
  const explainedVarText = i18n.t('Explained Variance');
  const explainedVarWithText = [explainedVarText, ...explainedVar];

  const cumuVarText = i18n.t('Cumulative Explained Variance');
  const cumulativeVarWithText = [cumuVarText, ...cumulativeVarWithText1];

  // ************************************
  // UPDATE PROJECT LOG
  // ************************************
  const projectLogText2 = i18n.t('Horst Centroid Factors Extracted');
  const horstMessage = i18n.t('No convergence');
  const iterationsTrans = i18n.t('iterations');

  const showHorstMessage = factorState.getState().didNotConverge;
  const horstIterations = factorState.getState().horstIterations;

  let projectLogText1;
  if (showHorstMessage) {
    projectLogText1 = `${projectLogText2}: ${numCentroidFactors} -- ${horstMessage}: ${horstIterations} ${iterationsTrans}`;
  } else {
    projectLogText1 = `${projectLogText2}: ${numCentroidFactors}`;
  }

  const logMessageObj1 = {
    logMessage: projectLogText1,
    logType: 'horst',
  };

  const newProjectHistoryArray = [...projectHistoryArray, logMessageObj1];

  // ************************************
  // UPDATE STATE
  // ************************************
  factorState.setState({ numFacsForTableWidth: numCentroidFactors });
  factorState.setState({ factorMatrix: fMatrix }); // pulled for first display on loadings table
  factorState.setState({ eigenvalues: eigenvaluesWithText });
  factorState.setState({ explainedVariance: explainedVar });
  factorState.setState({ unrotatedFactorMatrix: fMatrix });
  factorState.setState({ eigensPercentExpVar: explainedVarWithText });
  factorState.setState({ cumulEigenPerVar: cumulativeVarWithText });
  factorState.setState({ screePlotData: formattedScreePlotData });
  factorState.setState({ isCentroidLoading: false });
  projectHistoryState.setState({ projectHistoryArray: newProjectHistoryArray });

  // to use with the undo function in Project History
  sessionStorage.setItem('facMatrixArc0', JSON.stringify(rotFacStateArray1));
};

export default horstDispatcher;
