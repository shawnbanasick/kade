const calculateStephConsensusData = (data, consensusDisagreeArray) => {
  if (!data || data.length === 0) {
    console.log(
      '%cParameter Error%c in "calculateStephConsensusData" - data is missing or empty in calculateStephConsensusData',
      'color: red; font-weight: bold',
      'color: black'
    );
    return [];
  }

  if (!consensusDisagreeArray || consensusDisagreeArray.length === 0) {
    console.log(
      '%cParameter Error%c in "calculateStephConsensusData" - consensusDisagreeArray is missing or empty in calculateStephConsensusData',
      'color: red; font-weight: bold',
      'color: black'
    );
    return [];
  }

  const limits = [0.0001, 0.0005, 0.001, 0.005, 0.01, 0.05, 0.1, 0.15, 0.2];

  const prepFactorArray = data.map((item, index) => {
    return item.map((value, i) => {
      const tempObj = {};
      tempObj.stateNo = consensusDisagreeArray[+value - 1][0];
      tempObj.statement = consensusDisagreeArray[+value - 1][1];
      tempObj.level = limits[index];
      tempObj.qValues = consensusDisagreeArray[+value - 1].slice(2, -1).join(', ');
      //   tempObj.sortStatement = item[1];
      return tempObj;
    });
  });
  console.log('prepFactorArray', prepFactorArray);
  return prepFactorArray;
};
export default calculateStephConsensusData;
