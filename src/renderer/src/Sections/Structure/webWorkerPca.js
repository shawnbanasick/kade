import registerPromiseWorker from 'promise-worker/register';
import getSvd from '../Factors/PcaLogic/svd';
import calcCorrelation from './calcCorrelation';
import sortEigenValues from '../Factors/PcaLogic/sortEigenValues';
import calcEigenVectors from '../Factors/PcaLogic/calcEigenVectors';
import transposeMatrix from '../../Utils/transposeMatrix';
import inflectPrincipalComponents from '../Factors/PcaLogic/inflectPrincipalComponents';
import calcSumSquares from '../Rotation/varimaxLogic/2calcSumSquares';
import calcStandardizedFactorMatrix from '../Rotation/varimaxLogic/2calcStandardizedFactorMatrix';
import doVarimaxRotations from '../Rotation/varimaxLogic/2doVarimaxRotations';
import evenRound from '../../Utils/evenRound';
// import calculateCommunalities from '../Rotation/varimaxLogic/2calculateCommunalities';

registerPromiseWorker(function (array) {
  // array contents are stringified [X, numberofPrincipalComps]

  const array2 = JSON.parse(array);
  const X = array2[0];
  const numberofPrincipalComps = array2[1];
  let iterationArray = [2, 3, 4, 5, 6, 7, 8];
  const rotationResultsArray = [];
  const edgeArray = [];

  const m = X.length;
  const numberOfSorts = m;
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

  // transpose to unroatated principal components
  let unrotatedComponents = transposeMatrix(eigenVecs);

  // in case there are fewer than 8 participants
  iterationArray.length = numberofPrincipalComps - 1;

  // for loop for speed
  for (let i = 0; i < iterationArray.length; i++) {
    let tempUnrotatedComponents = [...unrotatedComponents];
    tempUnrotatedComponents.length = iterationArray[i];
    const sumSquares = calcSumSquares(tempUnrotatedComponents);
    const standardizedFactorMatrix = calcStandardizedFactorMatrix(
      sumSquares,
      tempUnrotatedComponents
    );
    const rotatedResults = doVarimaxRotations(standardizedFactorMatrix, sumSquares);
    const transposedRotatedResults = transposeMatrix(rotatedResults);
    rotationResultsArray.push(transposedRotatedResults);
  }

  // bring in the FUPC values
  rotationResultsArray.unshift([...unrotatedComponents[0]]);

  console.log('rotationResultsArray', JSON.stringify(rotationResultsArray[0], null, 2));
  console.log('rotationResultsArray', JSON.stringify(rotationResultsArray[1], null, 2));

  // create the edge source array
  for (let j = 0; j < rotationResultsArray.length - 1; j++) {
    let level1Array = rotationResultsArray[j];
    let level2Array = rotationResultsArray[j + 1];
    for (let k = 0; k < level1Array.length; k++) {
      let array1;
      if (j === 0) {
        array1 = level1Array;
      } else {
        array1 = level1Array[k];
      }
      for (let m = 0; m < level2Array.length; m++) {
        let correl = calcCorrelation(array1, level2Array[m]);
        let id = `${j + 1}/${k + 1}-${j + 2}/${m + 1}`;
        let source = `${j + 1}-${k + 1}`;
        let target = `${j + 2}-${m + 1}`;
        let label = evenRound(correl, 2);
        let tempArray = [id, source, target, label];
        edgeArray.push(tempArray);
      }
    }
  }

  return edgeArray;
});
