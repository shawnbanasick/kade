import state from "../../../store";

const capitalizeFirstLetter = string => {
  if (!string) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const filterDistStateListData = (thresholdLevel, sortKey) => {
  const distStateListData = state.getState("distStateListData");
  const userSelectedFactors = state.getState("userSelectedFactors");
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
          return a.factorNum - b.factorNum;
        } else if (a.sigLevelRank > b.sigLevelRank) {
          return -1;
        } else if (a.sigLevelRank < b.sigLevelRank) {
          return 1;
        }
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
      });
    }
  }

  return distStateListData;
};

export default filterDistStateListData;

// sigLevelRank
