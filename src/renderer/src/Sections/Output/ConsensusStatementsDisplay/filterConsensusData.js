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

  consensusData.sort((a, b) => b['F1 Sort Value'] - a['F1 Sort Value']);

  return consensusData;
};
export default filterConsensusData;
