const filterConsensusData = (
  consensusData = [],
  cohensThreshold = 0.8,
  sortCohensBy = 'cohenLevel'
) => {
  if (consensusData.length === 0) {
    return [];
  }

  consensusData.forEach((item) => {
    if (item.consensusArray.length > 0) {
      const minValue = Math.min(...item.consensusArray);
      item.cutoffLevel = +minValue / 100;
    } else {
      item.cutoffLevel = 0;
    }
  });

  consensusData = consensusData.filter(
    (item) => +item.cutoffLevel > 0 && +item.cutoffLevel <= +cohensThreshold
  );

  if (sortCohensBy === 'cohenLevel') {
    consensusData.sort((a, b) => a.cutoffLevel - b.cutoffLevel);
  } else if (sortCohensBy === 'sortValue') {
    consensusData.sort((a, b) => b['F1 Sort Value'] - a['F1 Sort Value']);
  } else if (sortCohensBy === 'statementNum') {
    consensusData.sort((a, b) => a.statement - b.statement);
  }

  return consensusData;
};
export default filterConsensusData;
