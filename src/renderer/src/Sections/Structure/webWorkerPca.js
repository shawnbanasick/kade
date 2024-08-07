import registerPromiseWorker from 'promise-worker/register';
// import determineNumberPCs from '../Factors/PcaLogic/determineNumberPCs';
import getSvd from '../Factors/PcaLogic/svd';

import sortEigenValues from '../Factors/PcaLogic/sortEigenValues';
import calcEigenVectors from '../Factors/PcaLogic/calcEigenVectors';
import transposeMatrix from '../../Utils/transposeMatrix';
import inflectPrincipalComponents from '../Factors/PcaLogic/inflectPrincipalComponents';
// import calculateCommunalities from '../Rotation/varimaxLogic/2calculateCommunalities';

registerPromiseWorker(function (array) {
  // [X, numberofPrincipalComps]
  //   console.log('message', message);
  //   return 'pong';

  const array2 = JSON.parse(array);

  const X = array2[0];
  const numberofPrincipalComps = array2[1];

  const m = X.length;

  const numberOfSorts = m;
  //   console.log('X', X);
  const svdResults = getSvd(X);

  // calcualte svd from correlations
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

  //   calculateCommunalities([...eigenVecs]);

  // transpose
  const eigenVecsTransposed = transposeMatrix(eigenVecs);

  return eigenVecsTransposed;
});
