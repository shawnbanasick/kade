// strips everything but letters and numbers and "." "-"
const sanitizeSortValues = function(value) {
  return value.replace(/[^a-zA-Z0-9.-]/g, function() {
    return "";
  });
};

const grabSortsT3 = function(data, numStatements) {
  let respondentSorts = [];
  for (let k = 4; k < data.length; k++) {
    let tempArray1 = [];
    let isEmpty = data[k][1];
    if (isEmpty === "" || isEmpty === null || isEmpty === undefined) {
    } else {
      let temp2 = data[k][1].toString();

      let start = sanitizeSortValues(temp2);
      tempArray1.push(+start);
      let mLength = numStatements;
      for (let m = 2; m < mLength; m++) {
        let temp3 = data[k][m];
        tempArray1.push(+temp3);
      }
      let finish2 = data[k][mLength];
      let finish = sanitizeSortValues(finish2);
      tempArray1.push(+finish);
      respondentSorts.push(tempArray1);
    }
  }
  return respondentSorts;
};

export default grabSortsT3;
