const filterStephenConsensusData = (data, limits) => {
  if (!data || data.length === 0) {
    console.log(
      '%cParameter Error%c in "filterStephenConsensusData"',
      'color: red; font-weight: bold',
      'color: black'
    );
    return [];
  }

  const threshold = limits;

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
  return masterList.filter((item) => item.highestLevel >= threshold);
};

export default filterStephenConsensusData;
