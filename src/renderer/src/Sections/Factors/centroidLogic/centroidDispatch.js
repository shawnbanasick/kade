import calcEigenValues from './calcEigenValues';
import transposeMatrix from '../../../Utils/transposeMatrix';
import calculateFactorLoadings from './calculateFactorLoadings';
import calcScreePlotData from '../centroidLogic/calcScreePlotData';
import factorTableDataPrep from '../FactorTable/factorTableDataPrep';
import calcEigenCumulPercentArray from '../PcaLogic/calcEigenCumulPercentArray';
import factorTableEigenDataPrep from '../FactorTableEigen/FactorTableEigenDataPrep';
import calculateCommunalities from '../../Rotation/varimaxLogic/2calculateCommunalities';
import doHeywoodCheck from '../centroidLogic/horst55Logic/doHeywoodCheck';
import i18n from 'i18next';
import cloneDeep from 'lodash/cloneDeep';
import projectHistoryState from '../../GlobalState/projectHistoryState';
import correlationState from '../../GlobalState/correlationState';
import factorState from '../../GlobalState/factorState';
import coreState from '../../GlobalState/coreState';

// todo - make the centroid dropdown list dynamic in case only few sorts - not
// enough for all 7 factors

const centroidDispatch = (numFactors) => {
  // ************************************
  // GET STATE
  // ************************************
  let dataArray = cloneDeep(correlationState.getState().correlation5Calcs);
  let projectHistoryArray = cloneDeep(projectHistoryState.getState().projectHistoryArray);
  let numCentroidFactors = cloneDeep(factorState.getState().numCentroidFactors);
  const numQsorts = cloneDeep(coreState.getState().numQsorts);
  const respondentNames = cloneDeep(coreState.getState().respondentNames);

  // ************************************
  // CALC LOADINGS
  // ************************************
  let factorMatrix = [];
  for (var i = 0; i < numFactors; i++) {
    let tempArray = calculateFactorLoadings(dataArray);
    factorMatrix.push(tempArray[0]);
    dataArray = tempArray[1];
  }
  let factorMatrix1 = cloneDeep(factorMatrix);

  // ************************************
  // CALC COMMUNALITIES
  // ************************************

  // display style matrix
  let rotFacStateArray1 = cloneDeep(factorMatrix);

  // calc style matrix
  let rotFacStateArray = transposeMatrix(rotFacStateArray1);

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
  let explainVarandEigens = calcEigenValues(factorMatrix1, numQsorts);

  // ************************************
  // FACTOR TABLE DATA PREP
  // ************************************
  const participantTrans = i18n.t('Participant');
  const factorTrans = i18n.t('Factor');
  const nmTrans = i18n.t('Nm');
  const translationsText = { participantTrans, factorTrans, nmTrans };
  const factorTableData = factorTableDataPrep(
    numFactors,
    factorMatrix1,
    respondentNames,
    translationsText
  );
  factorState.setState({ gridColDefsFactorTable: factorTableData.gridColDefsFactorTable });
  factorState.setState({ gridRowDataFactorTable: factorTableData.gridRowDataFactorTable });
  factorState.setState({ unrotatedFactorMatrixOutput: factorTableData.unrotatedFactorArray });

  // ************************************
  // EIGEN TABLE DATA PREP
  // ************************************
  let percentEigenVal = calcEigenCumulPercentArray(explainVarandEigens[0], numQsorts);

  // draw eigenvalues sub table
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
    numFactors,
    [explainVarandEigens[0], ...percentEigenVal],
    eigensTranslations
  );

  factorState.setState({ gridColDefsFacTableEigen: factorTableEigenData.gridColDefsFacTableEigen });
  factorState.setState({ gridRowDataFacTableEigen: factorTableEigenData.gridRowDataFacTableEigen });

  // ************************************
  // SCREE PLOT DATA PREP
  // ************************************

  // set data for scree chart
  let screePlotData = calcScreePlotData(explainVarandEigens[0]);

  // ************************************
  // DO PROJECT LOG UPDATE
  // ************************************
  const logMessageObj = {
    logMessage: `${i18n.t('Brown Centroid Factors Extracted')}: ${numCentroidFactors}`,
    logType: 'centroid',
  };

  projectHistoryArray.push(logMessageObj);

  const eigenvaluesArray = explainVarandEigens[0];
  eigenvaluesArray.unshift(i18n.t('Eigenvalues'));

  // ************************************
  // UPDATE STATE
  // ************************************
  factorState.setState({ factorMatrix: rotFacStateArray1 }); // pulled for first display on loadings table
  factorState.setState({ eigenvalues: eigenvaluesArray });
  factorState.setState({ explainedVariance: explainVarandEigens[1] });
  factorState.setState({ unrotatedFactorMatrix: factorMatrix });
  factorState.setState({ eigensPercentExpVar: percentEigenVal[0] });
  factorState.setState({ cumulEigenPerVar: percentEigenVal[1] });
  factorState.setState({ screePlotData: screePlotData });
  factorState.setState({ isCentroidLoading: false });
  projectHistoryState.setState({ projectHistoryArray: projectHistoryArray });

  // to use with the undo function in Project History
  sessionStorage.setItem('facMatrixArc0', JSON.stringify(rotFacStateArray1));
};

export default centroidDispatch;
