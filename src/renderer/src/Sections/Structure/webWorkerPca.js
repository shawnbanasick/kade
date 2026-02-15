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
import calcCommunalities from '../Correlations/ForceDirectedGraph/calcCommunalities';
import forceCalcSigCriterionValues from '../Correlations/ForceDirectedGraph/forceCalcSigCriteriaValues';

registerPromiseWorker(function (array) {
  // array contents are stringified [X, numberofPrincipalComps]

  const array2 = JSON.parse(array);
  const X = array2[0];
  const numberofPrincipalComps = array2[1];
  const totalStatements = array2[2];

  const forcedAll = array2[3];
  const forcedPos = array2[4];
  const forcedNeg = array2[5];

  let iterationArray = [2, 3, 4, 5, 6, 7, 8];
  const rotationResultsArray = [];
  const autoflagDataArray = [];
  const edgeArray = [];

  const m = X.length;
  const numberOfSorts = m;
  const svdResults = getSvd(X);

  // calcualte svd from correlations
  const eigens = svdResults.S;
  const svd = svdResults.U;
  const eigenValuesSorted = sortEigenValues(eigens);

  const doEigenVecsCalcs = calcEigenVectors(
    numberOfSorts,
    numberofPrincipalComps,
    eigenValuesSorted,
    svd
  );

  let eigenVecs = doEigenVecsCalcs[0];
  const inflectionArray = doEigenVecsCalcs[1];
  eigenVecs = inflectPrincipalComponents(eigenVecs, inflectionArray);

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
    autoflagDataArray.push([...rotatedResults]);
    const transposedRotatedResults = transposeMatrix(rotatedResults);
    rotationResultsArray.push([...transposedRotatedResults]);
  }

  // bring in the FUPC values
  rotationResultsArray.unshift([...unrotatedComponents[0]]);

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

  // BEGIN AUTOFLAG
  const significanceLevel = evenRound(1.96 * (1 / Math.sqrt(totalStatements)), 5);
  const autoflagResultsArray = [];

  // returns true/false 2D arrays of flagging
  autoflagDataArray.forEach((array) => {
    const communalityResults = calcCommunalities(array);
    const fSigCriterionResults = forceCalcSigCriterionValues(
      'flag',
      communalityResults[2],
      significanceLevel
    );
    autoflagResultsArray.push(fSigCriterionResults);
  });
  // END AUTOFLAG

  const forcedPosResultsArray = [[], [], [], [], [], [], []];
  autoflagResultsArray.forEach((array, index) => {
    array.forEach((item, i) => {
      if (item.includes(true)) {
        forcedPosResultsArray[index].push(true);
      } else {
        forcedPosResultsArray[index].push(false);
      }
    });
  });

  const transposedForcedPosResultsArray = transposeMatrix(forcedPosResultsArray);

  const forcedNegResultsArray = [[], [], [], [], [], [], []];
  autoflagResultsArray.forEach((array, index) => {
    array.forEach((item, i) => {
      if (item.includes(true)) {
        forcedNegResultsArray[index].push(true);
      } else {
        forcedNegResultsArray[index].push(false);
      }
    });
  });

  const transposedForcedNegResultsArray = transposeMatrix(forcedNegResultsArray);

  const forcedAllResultsArray = [[], [], [], [], [], [], []];
  autoflagResultsArray.forEach((array, index) => {
    array.forEach((item, i) => {
      if (item.includes(true)) {
        forcedAllResultsArray[index].push(true);
      } else {
        forcedAllResultsArray[index].push(false);
      }
    });
  });

  const transposedForcedAllResultsArray = transposeMatrix(forcedAllResultsArray);

  const autoflaggedForcedPosResultsArray = transposedForcedPosResultsArray.map((array) => {
    let newArray = [...array];
    newArray.unshift(false);
    return newArray;
  });

  const autoflaggedForcedNegResultsArray = transposedForcedNegResultsArray.map((array) => {
    let newArray = [...array];
    newArray.unshift(false);
    return newArray;
  });

  const autoflaggedForcedAllResultsArray = transposedForcedAllResultsArray.map((array) => {
    let newArray = [...array];
    newArray.unshift(false);
    return newArray;
  });

  const factorIndicator = transposeMatrix([...factorIndices]);

  forcedNeg.forEach((item, index) => {
    item['pc'] = factorIndicator[index];
    item['flag'] = autoflaggedForcedNegResultsArray[index];
  });

  forcedAll.forEach((item, index) => {
    item['pc'] = factorIndicator[index];
    item['flag'] = autoflaggedForcedAllResultsArray[index];
  });

  forcedPos.forEach((item, index) => {
    item['pc'] = factorIndicator[index];
    item['flag'] = autoflaggedForcedPosResultsArray[index];
  });

  return [edgeArray, factorIndices, forcedPos, forcedNeg, forcedAll];
});
