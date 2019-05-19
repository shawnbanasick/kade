import state from '../../../store';

const filterDistStateListData = (thresholdLevel, sortKey) => {
    const distStateListData = state.getState("distStateListData");
    for (let i = 0; i< distStateListData.length; i++) {
        distStateListData[i]["distStates"] = distStateListData[i]["distStates"].filter(item => item.sigLevelRank >= thresholdLevel);
    }
    
    if (sortKey === "threshold") {
        for (let i=0; i<distStateListData.length; i++) {
            distStateListData[i]["distStates"].sort((a, b) => {
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

    return distStateListData;


}

export default filterDistStateListData;

// sigLevelRank