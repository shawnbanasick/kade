const calcConsensusData = (cohensLevelsData = {}, consensusDisagreeArray = []) => {
  if (consensusDisagreeArray.length === 0) {
    return [];
  }

  // console.log('testing Consensus disagree array:', consensusDisagreeArray);
  console.log('Testing Cohen Levels Data:', cohensLevelsData.cohens100);

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
    // console.log(`Processing ${key} with consensus:`, levelData);
    const levelKey = key.replace('cohens', '');
    // console.log(`Level key: ${levelKey}`);
    levelData.consensus.forEach((statementNum) => {
      const statementIndex = statementNum - 1;
      prepFactorArray[statementIndex].consensusArray.push(+levelKey);
    });
  });

  //   console.log('testing prepFactorArray:', JSON.stringify(prepFactorArray, null, 2));
  return prepFactorArray;
};
export default calcConsensusData;
