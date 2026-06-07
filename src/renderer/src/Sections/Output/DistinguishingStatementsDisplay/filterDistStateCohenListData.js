const capitalizeFirstLetter = (string) => {
  if (!string) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const filterDistStateCohenListData = (data, cohenThreshold, userSelectedFactors, sortCohensBy) => {
  if (
    cohenThreshold === null ||
    cohenThreshold === undefined ||
    data === null ||
    data === undefined ||
    userSelectedFactors === null ||
    userSelectedFactors === undefined ||
    sortCohensBy === null ||
    sortCohensBy === undefined
  ) {
    console.log(
      '%cParameter Error%c in "filterDistStateCohenListData" - cohenThreshold, data, userSelectedFactors, or sortCohensBy is missing or undefined in filterDistStateCohenListData',
      'color: red; font-weight: bold',
      'color: black'
    );
    return data;
  }

  const returnArray = [];
  const masterDataArray = [];

  // get factor number from end of userselected factors and filter data by cohen threshold for each factor and push to masterDataArray
  const factorNumbers = userSelectedFactors.map((factor) => {
    const match = factor.match(/(\d+)$/);
    return match ? parseInt(match[1], 10) : null;
  });

  userSelectedFactors.forEach((factor, index) => {
    const filteredData = [...data].filter(
      (item) => item[`factor${index + 1}CohenLevel`] >= cohenThreshold
    );
    masterDataArray.push([...filteredData]);
  });

  userSelectedFactors.forEach((factor, index) => {
    const tempObj = {};
    tempObj.factor = factorNumbers[index];
    tempObj.factorNumber = index + 1;
    // sort cohen levels by factor and then in descending order and then by sort value in descending order
    if (sortCohensBy === 'cohenLevel') {
      tempObj.distStates = [...masterDataArray[index]].sort(
        (a, b) => b[`factor${index + 1}CohenLevel`] - a[`factor${index + 1}CohenLevel`]
      );
    } else if (sortCohensBy === 'sortValue') {
      tempObj.distStates = [...masterDataArray[index]].sort(
        (a, b) => b[`F${index + 1} Sort Value`] - a[`F${index + 1} Sort Value`]
      );
    } else if (sortCohensBy === 'statementNum') {
      tempObj.distStates = [...masterDataArray[index]].sort((a, b) => a.statement - b.statement);
    }
    returnArray.push(tempObj);
  });

  return returnArray;
};
export default filterDistStateCohenListData;
