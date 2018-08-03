function removeTrailingCommaFromText(string) {
    var lastChar = string.slice(-1);
    if (lastChar === ',') {
        string = string.slice(0, -1);
    }
    return string;
}

const grabRespondentNamesAndSorts = function(sortsDataT2) {
    let symmetryCheckArray = [];
    let respondentNames = [];
    let sortsForDisplay = [];
    let respondentSortsArray = [];
    for (let m = 6; m < sortsDataT2.length; m++) {
        let temp1 = sortsDataT2[m].toString().replace(/,,/g, '');
        // to prevent from reading empty cells as data
        if (temp1.length < 5) {
            break;
        }

        // convert from array of strings to array of numbers
        temp1 = removeTrailingCommaFromText(temp1);
        let temp6 = temp1.split(',');
        let temp4 = temp6.shift();
        // best way to convert strings to numbers array
        // can do in one line -> .split(',').map(Number).filter(Boolean)
        // remember - filters out non-numeric
        let temp3 = temp6.map(Number);
        let temp5 = temp3.toString();
        let temp7 = temp4 + ',' + temp5;

        sortsForDisplay.push(temp7);
        respondentNames.push(temp4);
        respondentSortsArray.push(temp5);
        symmetryCheckArray.push(temp3);
    }

    return [respondentNames, sortsForDisplay, symmetryCheckArray];
};

export default grabRespondentNamesAndSorts;