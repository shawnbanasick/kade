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

  const excelExport = JSON.parse(JSON.stringify(masterList));
  const returnList = masterList.filter((item) => item.highestLevel >= threshold);

  returnList.sort((a, b) => b.highestLevel - a.highestLevel);

  return { returnList, excelExport };
};

export default filterStephenConsensusData;
