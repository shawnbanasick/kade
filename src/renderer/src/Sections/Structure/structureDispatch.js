import getSvd from '../Factors/PcaLogic/svd';
import sortEigenValues from '../Factors/PcaLogic/sortEigenValues';
import calcEigenVectors from '../Factors/PcaLogic/calcEigenVectors';
import determineNumberPCs from '../Factors/PcaLogic/determineNumberPCs';
import transposeMatrix from '../../Utils/transposeMatrix';
import inflectPrincipalComponents from '../Factors/PcaLogic/inflectPrincipalComponents';
import calculateCommunalities from '../Rotation/varimaxLogic/2calculateCommunalities';
import correlationState from '../GlobalState/correlationState';
import cloneDeep from 'lodash/cloneDeep';
import PromiseWorker from 'promise-worker';
// import factorTableDataPrep from '../FactorTable/factorTableDataPrep';
// import calcEigenCumulPercentArray from './calcEigenCumulPercentArray';
// import factorTableEigenDataPrep from '../FactorTableEigen/FactorTableEigenDataPrep';
// import factorState from '../../GlobalState/factorState';
// import coreState from '../../GlobalState/coreState';

const structureDispatch = () => {
  const X = cloneDeep(correlationState.getState().correlation5Calcs);
  //   console.log(JSON.stringify(X, null, 2));
  //   const numQsorts = coreState.getState().numQsorts;
  const numberofPrincipalComps = determineNumberPCs();

  /*
  const m = X.length;
  const numberOfSorts = m;

  // calcualte svd from correlations
  const svdResults = getSvd(X);
  const eigens = svdResults.S;
  const svd = svdResults.U;
  const eigenValuesSorted = sortEigenValues(eigens);

  //   const getEigenCumulPercentArray = calcEigenCumulPercentArray(eigenValuesSorted, m);

  //   const eigenValuesAsPercents = getEigenCumulPercentArray[0];
  //   const eigenValuesCumulPercentArray = getEigenCumulPercentArray[1];

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
  console.log('eigenVecsTransposed', JSON.stringify(eigenVecsTransposed, null, 2));

  */

  const worker = new Worker(new URL('./webWorkerPca.js', import.meta.url), { type: 'module' });
  const promiseWorker = new PromiseWorker(worker);

  promiseWorker
    .postMessage(JSON.stringify([X, numberofPrincipalComps]))
    .then(function (response) {
      console.log('response', JSON.stringify(response, null, 2));
      // handle response
    })
    .catch(function (error) {
      console.error(error);
      // handle error
    });
};

export default structureDispatch;
