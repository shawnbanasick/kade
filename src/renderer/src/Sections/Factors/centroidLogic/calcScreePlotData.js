const getEigenValues = (eigenData) => {
  // to remove label "eigenvalues"
  eigenData.shift();
  const data = [];
  eigenData.forEach((element, index) => {
    const tempArray = [];
    tempArray.push(index + 1, eigenData[index]);
    data.push(tempArray);
  }, this);
  return data;
};

export default getEigenValues;
