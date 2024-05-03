export default function parseArrayPQM(element, numSortStatements) {
  let startPoint = 0;
  let endPoint = 2;
  const tempArray = [];
  const loopLen = numSortStatements;
  let i;
  let numberFragment;
  let convertedNumber;

  // parse array
  // var tempArray = parseArrayPQM(element);
  for (i = 0; i < loopLen; i += 1) {
    numberFragment = element.slice(startPoint, endPoint);
    convertedNumber = +numberFragment;
    tempArray.push(convertedNumber);
    startPoint += 2;
    endPoint += 2;
  }

  return tempArray;
}
