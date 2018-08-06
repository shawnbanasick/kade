function removeTrailingCommaFromText(string) {
  const lastChar = string.slice(-1);
  if (lastChar === ",") {
    const string2 = string.slice(0, -1);
    return string2;
  }
  return string;
}

function grabRespondentNamesAndSorts(sortsDataT2) {
  const symmetryCheckArray = [];
  const respondentNames = [];
  const sortsForDisplay = [];
  const respondentSortsArray = [];
  for (let m = 6; m < sortsDataT2.length; m += 1) {
    let temp1 = sortsDataT2[m].toString().replace(/,,/g, "");
    // to prevent from reading empty cells as data
    if (temp1.length < 5) {
      break;
    }

    // convert from array of strings to array of numbers
    temp1 = removeTrailingCommaFromText(temp1);
    const temp6 = temp1.split(",");
    const temp4 = temp6.shift();
    // best way to convert strings to numbers array
    // can do in one line -> .split(',').map(Number).filter(Boolean)
    // remember - filters out non-numeric
    const temp3 = temp6.map(Number);
    const temp5 = temp3.toString();
    const temp7 = `${temp4} , ${temp5}`;

    sortsForDisplay.push(temp7);
    respondentNames.push(temp4);
    respondentSortsArray.push(temp5);
    symmetryCheckArray.push(temp3);
  }

  return [respondentNames, sortsForDisplay, symmetryCheckArray];
}

export default grabRespondentNamesAndSorts;
