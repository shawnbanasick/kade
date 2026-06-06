const calcConsensusData = (cohensLevelsData = {}, consensusDisagreeArray = []) => {
  if (consensusDisagreeArray.length === 0 || Object.keys(cohensLevelsData).length === 0) {
    console.log(
      '%cParameter Error%c in "calcConsensusData" - consensusDisagreeArray or cohensLevelsData is missing or empty in calcConsensusData',
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
    tempObj.consensusArray = [];
    tempObj.qValues = item.slice(2, 2 + numFactors).join(', ');
    return tempObj;
  });

  Object.keys(cohensLevelsData).forEach((key) => {
    const levelData = cohensLevelsData[key];
    const levelKey = key.replace('cohens', '');
    levelData.consensus.forEach((statementNum) => {
      const statementIndex = statementNum - 1;
      prepFactorArray[statementIndex].consensusArray.push(+levelKey);
    });
  });
  return prepFactorArray;
};
export default calcConsensusData;
