/**
 * Calculates comprehensive statistics for a single array of numbers
 * @param {Array} array - Array of numbers to analyze
 * @param {number} index - Index of the array in the parent collection
 * @param {number} maxValue - Maximum value to count occurrences
 * @param {number} minValue - Minimum value to count occurrences
 * @returns {Object|null} Statistics object with all calculated metrics
 */
const calculateArrayStatistics = (array, index, maxValue, minValue) => {
  // Validate input
  if (!Array.isArray(array) || array.length === 0) {
    console.warn('Invalid or empty array');
    return null;
  }

  // Filter out non-numeric values
  const validNumbers = array.filter(
    (value) => typeof value === 'number' && isFinite(value) && !isNaN(value)
  );

  if (validNumbers.length === 0 || validNumbers.length !== array.length) {
    console.warn('Invalid numbers in array');
    return null;
  }

  const count = validNumbers.length;

  // Calculate sum and average
  const sum = validNumbers.reduce((acc, val) => acc + val, 0);
  const average = sum / count;

  // Calculate standard deviation
  const squaredDifferences = validNumbers.map((val) => Math.pow(val - average, 2));
  const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / count;
  const standardDeviation = Math.sqrt(variance);

  // Count positive, negative, and zero values
  let positiveCount = 0;
  let negativeCount = 0;
  let zeroCount = 0;
  let maxCount = 0;
  let minCount = 0;

  validNumbers.forEach((value) => {
    if (value > 0) {
      positiveCount++;
    } else if (value < 0) {
      negativeCount++;
    } else {
      zeroCount++;
    }
    if (value === maxValue) {
      maxCount++;
    }
    if (value === minValue) {
      minCount++;
    }
  });

  // Boolean checks
  const allPositive = validNumbers.every((val) => val > 0);
  const allNegative = validNumbers.every((val) => val < 0);
  const allWithinOne = validNumbers.every((val) => val > -1 && val < 1);

  const order = index + 1;

  return {
    order,
    average,
    standardDeviation,
    positiveCount,
    negativeCount,
    zeroCount,
    allPositive,
    allNegative,
    allWithinOne,
    minCount,
    maxCount,
    sum,
    count,
  };
};

/**
 * Calculates statistics for each array in a 2D array
 * @param {Array} arrays - 2D array of numbers
 * @param {number} maxValue - Maximum value across all arrays
 * @param {number} minValue - Minimum value across all arrays
 * @returns {Array} Array of statistics objects, one per inner array
 */
const calcStatementAnalysisStats = (arrays, maxValue, minValue) => {
  console.log(arrays, 'arrays');
  console.log(maxValue, 'maxValue');
  console.log(minValue, 'minValue');

  // Validate input
  if (!Array.isArray(arrays) || arrays.length === 0) {
    console.warn('Invalid or empty 2D array');
    return [];
  }

  const results = [];

  arrays.forEach((array, index) => {
    const stats = calculateArrayStatistics(array, index, maxValue, minValue);

    if (stats === null) {
      console.warn(`Failed to calculate statistics for array at index ${index}`);
    } else {
      results.push(stats);
    }
  });

  return results;
};

export { calcStatementAnalysisStats };
