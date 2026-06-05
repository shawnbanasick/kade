const filterStephenConsensusData = (data, limits) => {
  if (!data || data.length === 0) {
    console.log(
      '%cParameter Error%c in "filterStephenConsensusData"',
      'color: red; font-weight: bold',
      'color: black'
    );
    return [];
  }

  const converterObj = {
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

  const threshold = converterObj[limits];

  console.log(limits, 'highest Filtering with limits:', limits);

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

  console.log('Master List with Highest Levels:', masterList);

  console.log('Filtering with threshold:', threshold);
  return masterList.filter((item) => item.highestLevel >= threshold);
};

export default filterStephenConsensusData;
