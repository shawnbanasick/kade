export function parseArrayPQM(element, numSortStatements) {
    let startPoint = 0;
    let endPoint = 2;
    let tempArray = [];
    const loopLen = numSortStatements;
    let i,
        numberFragment,
        convertedNumber;

    // parse array
    // var tempArray = parseArrayPQM(element);
    for (i = 0; i < loopLen; i++) {
        numberFragment = element.slice(startPoint, endPoint);
        convertedNumber = +numberFragment;
        tempArray.push(convertedNumber);
        startPoint = startPoint + 2;
        endPoint = endPoint + 2;
    }

    return tempArray;
}
