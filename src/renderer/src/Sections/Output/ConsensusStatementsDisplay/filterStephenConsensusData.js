const filterStephenConsensusData = (data, limits, sortBy) => {
  if (!data || data.length === 0) {
    console.log(
      '%cParameter Error%c in "filterStephenConsensusData"',
      'color: red; font-weight: bold',
      'color: black'
    );
    return [];
  }

  const converterObject = {
    8: 0.0001,
    7: 0.0005,
    6: 0.001,
    5: 0.005,
    4: 0.01,
    3: 0.05,
    2: 0.1,
    1: 0.15,
    0: 0.2,
  };

  const threshold = converterObject[limits];

  const highestLevelMap = {};
  data.forEach((subarray) => {
    subarray.forEach(({ stateNo, level }) => {
      highestLevelMap[stateNo] = level; // always overwrite = last seen = highest
    });
  });

  // Then add the lowestLevel property to each object
  const result = data.map((subarray) =>
    subarray.map((obj) => ({
      ...obj,
      highestLevel: highestLevelMap[obj.stateNo],
    }))
  );

  const masterList = Object.values(
    result
      .flatMap((subarray) => subarray)
      .reduce((acc, obj) => {
        if (!acc[obj.stateNo]) acc[obj.stateNo] = obj;
        return acc;
      }, {})
  );

  const returnList = masterList.filter((item) => item.highestLevel >= threshold);

  if (sortBy === 'threshold') {
    return returnList.sort((a, b) => b.highestLevel - a.highestLevel);
  }

  if (sortBy === 'statementNum') {
    return returnList.sort((a, b) => {
      if (a.stateNo === b.stateNo) {
        return a.highestLevel - b.highestLevel;
      } else if (a.stateNo > b.stateNo) {
        return 1;
      } else if (a.stateNo < b.stateNo) {
        return -1;
      }
      return null;
    });
  }

  return returnList;
};

export default filterStephenConsensusData;
