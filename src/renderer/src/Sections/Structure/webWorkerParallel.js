import registerPromiseWorker from 'promise-worker/register';
import getSvd from '../Factors/PcaLogic/svd';
import getPqmethodCorrelation from '../Correlations/correlationsLogic/getPqmethodCorrelation';
import shuffle from 'lodash/shuffle';
import unzip from 'lodash/unzip';

/**
 * Calculates Parallel Analysis for PCA using Pearson Correlation Matrices.
 * @param {Array<Array<number>>} data - The original 2D dataset (rows x cols).
 * @param {number} iterations - Number of random datasets to generate.
 */
registerPromiseWorker(function (stringData, iterations = 1000) {
  const data = JSON.parse(stringData);
  // console.log(JSON.stringify(data));

  function toRMatrix(matrix) {
    const flat = matrix.map((row) => row.join(',')).join(',\n  ');
    const nrow = matrix.length;

    return `data <- matrix(c(\n  ${flat}\n), nrow = ${nrow}, byrow = TRUE)\n\nq_matrix <- t(data)`;
  }
  console.log(toRMatrix([...data]));

  // Mean for each column position
  function meanByColumn(matrix) {
    const cols = matrix[0].length;
    return Array.from({ length: cols }, (_, j) => {
      const vals = matrix.map((row) => row[j]);
      return vals.reduce((a, b) => a + b, 0) / vals.length;
    });
  }

  // get 95th percentile
  function percentileByColumn(matrix) {
    const transposedMatrix = unzip(matrix);

    return transposedMatrix.map((col) => {
      const sorted = [...col].sort((a, b) => a - b);

      // Interpolated 95th percentile (matches R's quantile())
      const pos = (sorted.length - 1) * 0.95;
      const lower = Math.floor(pos);
      const upper = Math.ceil(pos);
      const fraction = pos - lower;
      return sorted[lower] + fraction * (sorted[upper] - sorted[lower]);
    });
  }

  function generateRandomMatrix(data) {
    const newArray = data.map((innerArray) => shuffle(innerArray));
    return newArray;
  }

  const correlationsMasterArray = [];
  const currentMatrix = [...data];

  const workingArray = Array.from({ length: currentMatrix.length }, () =>
    new Array(currentMatrix.length).fill([])
  );

  // 1. Calculate Correlation Matrix and Eigenvalues for original data
  for (let i = 0; i < currentMatrix.length; i++) {
    const pullX = currentMatrix[i];
    for (let k = i; k < currentMatrix.length; k++) {
      // console.log('pullX', JSON.stringify(currentMatrix[k]));
      const correlationValue = getPqmethodCorrelation(pullX, currentMatrix[k])[0];
      workingArray[i][k] = correlationValue;
      if (k !== i) {
        workingArray[k][i] = correlationValue;
      }
      correlationsMasterArray.push(workingArray);
    } // end of k loop
  } //  end of i loop

  // get Eigens
  const svdResults = getSvd([...workingArray]);
  const originalEigenvalues = svdResults.S;

  const originalEigenvaluesResult = [...originalEigenvalues]
    .slice(0, 8)
    .map((x) => Number(x.toFixed(3)));

  console.log('Original Eigenvalues', JSON.stringify(originalEigenvaluesResult));

  const iterationEigenvalues = [];

  // 1000 loop get values from shuffled arrays
  for (let i = 0; i < iterations; i++) {
    const currentMatrix = generateRandomMatrix([...data]);
    const newWorkingArray = Array.from({ length: currentMatrix.length }, () =>
      new Array(currentMatrix.length).fill([])
    );

    // Convert random array to its correlation Matrix
    for (let i = 0; i < currentMatrix.length; i++) {
      const pullX = currentMatrix[i];
      for (let k = i; k < currentMatrix.length; k++) {
        const correlationValue = getPqmethodCorrelation(pullX, currentMatrix[k])[0];
        newWorkingArray[i][k] = correlationValue;
        if (k !== i) {
          newWorkingArray[k][i] = correlationValue;
        }
        correlationsMasterArray.push(newWorkingArray);
      } // end of k loop
    } //  end of i loop

    // Extract eigenvalues from the random correlation matrix
    const randomEigs = getSvd(newWorkingArray);
    iterationEigenvalues.push(randomEigs.S);
  }

  const mean = meanByColumn([...iterationEigenvalues]);
  const p95 = percentileByColumn([...iterationEigenvalues]);
  const meanResult = [...mean].slice(0, 8).map((x) => Number(x.toFixed(3)));
  const p95Result = [...p95].slice(0, 8).map((x) => Number(x.toFixed(3)));

  console.log('Mean', JSON.stringify(meanResult));
  console.log('P95', JSON.stringify(p95Result));
  console.log('parallel analysis processing completed successfully');

  return [originalEigenvaluesResult, meanResult, p95Result];
});
