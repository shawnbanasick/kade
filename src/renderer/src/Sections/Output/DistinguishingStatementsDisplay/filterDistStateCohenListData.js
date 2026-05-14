const filterDistStateCohenListData = (data, cohenThreshold, userSelectedFactors) => {
  console.log('filterDistStateCohenListData input data', JSON.stringify(data, null, 2));
  if (cohenThreshold === null) return data;
  console.log('filterDistStateCohenListData cohenThreshold', cohenThreshold);

  const returnArray = [];
  const filteredData = [...data].filter((item) => item.factor1CohenLevel >= cohenThreshold);

  userSelectedFactors.forEach((factor, index) => {
    const tempObj = {};
    tempObj.factor = `Factor ${index + 1}`;
    tempObj.factorNumber = index + 1;
    // sort cohen levels by factor and then in descending order and then by sort value in descending order
    tempObj.distStates = [...filteredData].sort(
      (a, b) => b[`factor${index + 1}CohenLevel`] - a[`factor${index + 1}CohenLevel`]
    );
    returnArray.push(tempObj);
  });

  // const sortedData = [...filteredData].sort((a, b) => b.factor1CohenLevel - a.factor1CohenLevel);

  // const returnObject = {
  //   factor: 'Factor 1',
  //   distStates: sortedData,
  // };

  return returnArray;
};
export default filterDistStateCohenListData;
