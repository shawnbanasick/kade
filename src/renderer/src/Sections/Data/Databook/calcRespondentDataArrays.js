const calcRespondentDataArrays = (mainDataObject) => {
  let respondentArray = [];

  if (mainDataObject !== undefined) {
    for (let m = 0; m < mainDataObject.length; m++) {
      respondentArray.push([...mainDataObject[m].rawSort]);
    }
  }
  return respondentArray;
};

export default calcRespondentDataArrays;
