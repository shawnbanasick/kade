const getEigenValues = eigenData => {
  // to remove label "eigenvalues"
  eigenData.shift();
  let data = [];
  eigenData.forEach(function(element, index) {
    let tempArray = [];
    tempArray.push(index + 1, eigenData[index]);
    data.push(tempArray);
  }, this);
  return data;
};

export default getEigenValues;
