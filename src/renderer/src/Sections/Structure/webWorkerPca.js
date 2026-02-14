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

  console.log('rotationResultsArray', JSON.stringify(rotationResultsArray));
  // console.log('rotationResultsArray', JSON.stringify(rotationResultsArray[1], null, 2));

  const findHighestLoadingPcaFactorIndex = (dataSet) => {
    return dataSet.map((group) => {
      // If it's a flat array, there's only one array, so all indices are 1
      if (!Array.isArray(group[0])) {
        return new Array(group.length).fill(1);
      }

      const rowCount = group.length;
      const colCount = group[0].length;

      const winningIndices = new Array(colCount).fill(1); // Default to the first array (Index 1)
      const maxAbsValues = new Array(colCount).fill(-Infinity);

      for (let col = 0; col < colCount; col++) {
        for (let row = 0; row < rowCount; row++) {
          const currentAbsValue = Math.abs(group[row][col]);

          if (currentAbsValue > maxAbsValues[col]) {
            maxAbsValues[col] = currentAbsValue;
            // Store row index + 1 to convert from 0-indexed to 1-indexed
            winningIndices[col] = row + 1;
          }
        }
      }

      return winningIndices;
    });
  };

  const factorIndices = findHighestLoadingPcaFactorIndex(rotationResultsArray);
  // console.log('winningIndices', winningIndices);

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

  // console.log('edgeArray', JSON.stringify(edgeArray, null, 2));
  // console.log('factorIndices', JSON.stringify(factorIndices, null, 2));

  return [edgeArray, factorIndices];
});
