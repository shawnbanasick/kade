import getSvd from './svd';
import sortEigenValues from './sortEigenValues';
import calcEigenVectors from './calcEigenVectors';
import determineNumberPCs from './determineNumberPCs';
import transposeMatrix from '../../../Utils/transposeMatrix';
import factorTableDataPrep from '../FactorTable/factorTableDataPrep';
import calcEigenCumulPercentArray from './calcEigenCumulPercentArray';
import inflectPrincipalComponents from './inflectPrincipalComponents';
import factorTableEigenDataPrep from '../FactorTableEigen/FactorTableEigenDataPrep';
import calculateCommunalities from '../../Rotation/varimaxLogic/2calculateCommunalities';
import i18n from 'i18next';
import factorState from '../../GlobalState/factorState';
import projectHistoryState from '../../GlobalState/projectHistoryState';
import coreState from '../../GlobalState/coreState';
import cloneDeep from 'lodash/cloneDeep';
import correlationState from '../../GlobalState/correlationState';

const pcaDispatch = () => {
  // getState
  const projectHistoryArray = projectHistoryState.getState().projectHistoryArray;
  const X = correlationState.getState().correlation5Calcs;

  const m = X.length;
  const numberOfSorts = m;
  const numberofPrincipalComps = determineNumberPCs();

  // calcualte svd from correlations
  const svdResults = getSvd(X);
  const eigens = svdResults.S;
  const svd = svdResults.U;
  const eigenValuesSorted = sortEigenValues(eigens);

  const getEigenCumulPercentArray = calcEigenCumulPercentArray(eigenValuesSorted, m);

  const eigenValuesAsPercents = getEigenCumulPercentArray[0];
  const eigenValuesCumulPercentArray = getEigenCumulPercentArray[1];

  const doEigenVecsCalcs = calcEigenVectors(
    numberOfSorts,
    numberofPrincipalComps,
    eigenValuesSorted,
    svd
  );

  let eigenVecs = doEigenVecsCalcs[0];
  const inflectionArray = doEigenVecsCalcs[1];
  eigenVecs = inflectPrincipalComponents(eigenVecs, inflectionArray);

  calculateCommunalities([...eigenVecs]);

  // transpose
  const eigenVecsTransposed = transposeMatrix(eigenVecs);

  // truncate arrays
  let limit = 8;
  const numQsorts = coreState.getState().numQsorts;
  if (numQsorts < limit) {
    limit = numQsorts;
  }
  eigenValuesSorted.length = limit;
  eigenValuesAsPercents.length = limit;
  eigenValuesCumulPercentArray.length = limit;

  // formatted for output file
  const formattedEigenCum = cloneDeep(eigenValuesCumulPercentArray);
  formattedEigenCum.unshift(i18n.t('Cumulative Explained Variance'));
  const formattedEigenPer = cloneDeep(eigenValuesAsPercents);
  formattedEigenPer.unshift(i18n.t('percent explained variance'));

  // create data for scree plot
  const eigenData = cloneDeep(eigenValuesSorted);

  const screeData = [];
  eigenData.forEach((element, index) => {
    const tempArray = [];
    tempArray.push(index + 1, eigenData[index]);
    screeData.push(tempArray);
  }, this);

  const logMessageObj = {
    logMessage: i18n.t('Extracted 8 Principal Components'),
    logType: 'pca',
  };

  projectHistoryArray.push(logMessageObj);

  factorState.setState({ factorMatrix: eigenVecsTransposed });
  factorState.setState({ unrotatedFactorMatrix: eigenVecsTransposed });
  factorState.setState({ eigenvalues: eigenValuesSorted });
  factorState.setState({ screePlotData: screeData });
  factorState.setState({ eigensPercentExpVar: formattedEigenPer });
  factorState.setState({ cumulEigenPerVar: formattedEigenCum });
  factorState.numFacsForTableWidth = 8;
  // do not delete - so that the scree plot data circles have the correct number
  factorState.setState({ numCentroidFactors: 8 });
  projectHistoryState.setState({ projectHistoryArray: projectHistoryArray });

  const eigenvaluesArray = [eigenValuesSorted, eigenValuesAsPercents, eigenValuesCumulPercentArray];
  // draw extracted factors table
  const respondentNames = coreState.getState().respondentNames;
  const participantTrans = i18n.t('Participant');
  const factorTrans = i18n.t('Factor');
  const nmTrans = i18n.t('Nm');
  const translationsText = { participantTrans, factorTrans, nmTrans };
  const factorTableData = factorTableDataPrep(
    numberofPrincipalComps,
    eigenVecsTransposed,
    respondentNames,
    translationsText
  );
  factorState.setState({ gridColDefsFactorTable: factorTableData.gridColDefsFactorTable });
  factorState.setState({ gridRowDataFactorTable: factorTableData.gridRowDataFactorTable });
  factorState.setState({ unrotatedFactorMatrixOutput: factorTableData.unrotatedFactorArray });

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
    numberofPrincipalComps,
    eigenvaluesArray,
    eigensTranslations
  );

  factorState.setState({ gridColDefsFacTableEigen: factorTableEigenData.gridColDefsFacTableEigen });
  factorState.setState({ gridRowDataFacTableEigen: factorTableEigenData.gridRowDataFacTableEigen });

  factorState.setState({ showUnrotatedFactorTable: true });
  factorState.setState({ showEigenvaluesTable: true });
  factorState.setState({ showScreePlot: true });
  factorState.setState({ pcaButtonText: i18n.t('Principal Components') });
  factorState.setState({ calculatingPca: false });

  // to use with the undo function in Project History
  sessionStorage.setItem('facMatrixArc0', JSON.stringify(eigenVecsTransposed));
};

export default pcaDispatch;
