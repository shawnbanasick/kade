const formatScreePlotData = eigens => {
  const screePlotData = eigens.map((item, index) => {
    return [index + 1, item];
  });
  return screePlotData;
};

export default formatScreePlotData;
