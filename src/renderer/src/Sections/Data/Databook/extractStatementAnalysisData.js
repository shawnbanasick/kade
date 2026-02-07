/**
 * Extracts r20 values from an array of objects and converts to array of arrays
 * Each inner array contains values at the same position across all objects
 * @param {Array} data - Array of objects containing r20 key
 * @param {Object} options - Configuration options
 * @returns {Array} Array of arrays with values organized by position
 */
const extractStatementAnalysisData = (data, options = {}) => {
  console.log(data, 'data');

  const { defaultValue = 0 } = options; // Added default value of 0
  // filterInvalid = false,

  // Validate input
  if (!Array.isArray(data) || data.length === 0) {
    console.warn('Invalid or empty data array');
    return [];
  }

  // Extract and parse r20 values from all objects
  const allValues = [];
  let maxLength = 0;

  data.forEach((array, index) => {
    //

    // Track maximum length
    maxLength = Math.max(maxLength, array.length);
    allValues.push([...array]);
  });

  // If no valid data found
  if (maxLength === 0) {
    console.warn('No valid r20 data found');
    return [];
  }

  // Transpose: convert rows to columns
  const result = [];

  for (let position = 0; position < maxLength; position++) {
    const column = [];

    allValues.forEach((values) => {
      const value = position < values.length ? values[position] : defaultValue;
      column.push(value);
    });

    // Filter out columns with all null values if requested
    // if (filterInvalid && column.every((v) => v === null)) {
    //   return;
    // }

    result.push(column);
  }
  return result;
};

export { extractStatementAnalysisData };
