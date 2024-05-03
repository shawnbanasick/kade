// strips everything but letters and numbers and "." "-"
function sanitizeSortValues(value) {
  return value.replace(/[^a-zA-Z0-9.-]/g, () => "");
}

function grabSortsT3(data, numStatements) {
  const respondentSorts = [];
  for (let k = 5; k < data.length; k += 1) {
    const tempArray1 = [];
    const isEmpty = data[k][1];
    // had to seperate out the undefined check otherwise would not work
    if (typeof isEmpty !== "undefined") {
      if (isEmpty !== "" || isEmpty !== null) {
        const temp2 = data[k][1].toString();

        const start = sanitizeSortValues(temp2);
        tempArray1.push(+start);
        const mLength = numStatements;
        for (let m = 2; m < mLength; m += 1) {
          const temp3 = data[k][m];
          tempArray1.push(+temp3);
        }
        const finish2 = data[k][mLength];
        const finish = sanitizeSortValues(finish2);
        tempArray1.push(+finish);
        respondentSorts.push(tempArray1);
      }
    }
  }
  return respondentSorts;
}

export default grabSortsT3;
