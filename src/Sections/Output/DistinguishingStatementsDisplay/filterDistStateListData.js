import calcState from '../../GlobalState/calcState';
import outputState from '../../GlobalState/outputState';
const clone = require('rfdc')()

const capitalizeFirstLetter = string => {
  if (!string) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const filterDistStateListData = (thresholdLevel, sortKey) => {
  const distStateListData = clone(calcState.distStateListData);
  const userSelectedFactors = clone(outputState.userSelectedFactors);
  for (let i = 0; i < distStateListData.length; i++) {
    const userSelectedFactor = capitalizeFirstLetter(userSelectedFactors[i]);
    distStateListData[i].userSelectedFactor = userSelectedFactor;
    distStateListData[i].distStates = distStateListData[i].distStates.filter(
      item => item.sigLevelRank >= thresholdLevel
    );
  }

  if (sortKey === "threshold") {
    for (let i = 0; i < distStateListData.length; i++) {
      distStateListData[i].distStates.sort((a, b) => {
        if (a.sigLevelRank === b.sigLevelRank) {
          return a.zScore - b.zScore;
        } else if (a.sigLevelRank > b.sigLevelRank) {
          return -1;
        } else if (a.sigLevelRank < b.sigLevelRank) {
          return 1;
        }
        return null;
      });
    }
  }

  if (sortKey === "qSortValue") {
    for (let i = 0; i < distStateListData.length; i++) {
      distStateListData[i].distStates.sort((a, b) => {
        if (a.sortValue === b.sortValue) {
          return a.sigLevelRank - b.sigLevelRank;
        } else if (a.sortValue > b.sortValue) {
          return 1;
        } else if (a.sortValue < b.sortValue) {
          return -1;
        }
        return null;
      });
    }
  }

  if (sortKey === "statementNum") {
    for (let i = 0; i < distStateListData.length; i++) {
      distStateListData[i].distStates.sort((a, b) => {
        if (a.statement === b.statement) {
          return a.sigLevelRank - b.sigLevelRank;
        } else if (a.statement > b.statement) {
          return 1;
        } else if (a.statement < b.statement) {
          return -1;
        }
        return null;
      });
    }
  }

  if (sortKey === "zScore") {
    for (let i = 0; i < distStateListData.length; i++) {
      distStateListData[i].distStates.sort((a, b) => {
        if (a.zScore === b.zScore) {
          return a.statement - b.statement;
        } else if (a.zScore > b.zScore) {
          return -1;
        } else if (a.zScore < b.zScore) {
          return 1;
        }
        return null;
      });
    }
  }

  return distStateListData;
};

export default filterDistStateListData;

// sigLevelRank
