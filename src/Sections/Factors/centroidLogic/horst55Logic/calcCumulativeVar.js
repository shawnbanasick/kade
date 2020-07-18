const calcCumulativeVar = data => {  
  let accumulator = 0;
  const cumulative = data.map((item, index) => {
    accumulator += item;
    return accumulator;
  });
  return cumulative;
};

export default calcCumulativeVar;
