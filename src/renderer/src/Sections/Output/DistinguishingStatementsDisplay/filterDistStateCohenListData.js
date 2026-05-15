const filterDistStateCohenListData = (data, cohenThreshold, userSelectedFactors, sortCohensBy) => {
  if (cohenThreshold === null) return data;

  const returnArray = [];
  const masterDataArray = [];

  userSelectedFactors.forEach((factor, index) => {
    const filteredData = [...data].filter(
      (item) => item[`factor${index + 1}CohenLevel`] >= cohenThreshold
    );
    masterDataArray.push([...filteredData]);
  });

  userSelectedFactors.forEach((factor, index) => {
    const tempObj = {};
    tempObj.factor = `Factor ${index + 1}`;
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
