const convertArrayToABS = array => {
  const absArray = array.map((item, index) => {
    return Math.abs(item);
  });
  return absArray;
};

export default convertArrayToABS;
