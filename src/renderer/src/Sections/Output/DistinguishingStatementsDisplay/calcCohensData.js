const calcCohensData = (
  cohensLevelsData = {},
  consensusDisagreeArray = [],
  userSelectedFactors = []
) => {
  if (
    consensusDisagreeArray.length === 0 ||
    Object.keys(cohensLevelsData).length === 0 ||
    userSelectedFactors.length === 0
  ) {
    console.log(
      '%cParameter Error%c in "calcCohensData" - consensusDisagreeArray, cohensLevelsData, or userSelectedFactors is missing or empty in calcCohensData',
      'color: red; font-weight: bold',
      'color: black'
    );
    return [];
  }

  const numFactors = cohensLevelsData.cohens100.distinguishing.length;

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
        prepFactorArray[statementIndex][`factor${factorIndex + 1}CohenLevel`] =
          parseFloat(key.replace('cohens', '')) / 100;
      });
    });
  });

  return prepFactorArray;
};

export default calcCohensData;
