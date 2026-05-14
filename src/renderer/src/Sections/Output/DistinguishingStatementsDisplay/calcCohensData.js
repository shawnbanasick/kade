const calcCohensData = (
  cohensLevelsData = {},
  consensusDisagreeArray = [],
  userSelectedFactors = []
) => {
  console.log('levelsData', JSON.stringify(cohensLevelsData));
  // console.log('consensusDisagreeArray', JSON.stringify(consensusDisagreeArray));
  // console.log('userSelectedFactors', JSON.stringify(userSelectedFactors));

  if (consensusDisagreeArray.length === 0) {
    return [];
  }

  const numFactors = cohensLevelsData.cohens100.distinguishing.length;
  console.log('numFactors', numFactors);

  const prepFactorArray = consensusDisagreeArray.map((item, index) => {
    const tempObj = {};
    for (let i = 2; i < numFactors + 2; i++) {
      tempObj[`F${i - 1} Sort Value`] = item[i];
    }
    for (let i = 2; i < numFactors + 2; i++) {
      tempObj[`factor${i - 1}CohenLevel`] = -1;
    }
    tempObj.statement = item[0];
    tempObj.sortStatement = item[1];
    return tempObj;
  });

  Object.keys(cohensLevelsData).forEach((key) => {
    const levelData = cohensLevelsData[key];
    levelData.distinguishing.forEach((factorDist, factorIndex) => {
      factorDist.forEach((statementNum) => {
        const statementIndex = statementNum - 1;
        prepFactorArray[statementIndex][`factor${factorIndex + 1}CohenLevel`] = parseInt(
          key.replace('cohens', ''),
          10
        );
      });
    });
  });

  console.log('prep', prepFactorArray);
  return prepFactorArray;
};

export default calcCohensData;
