import evenRound from '../../../Utils/evenRound';

const calcEigenVectors = (numberOfSorts, numberofPrincipalComps, eigenValuesSorted, svd) => {
  const inflectionArray = [];
  let temp1;
  let critInflectionValue;
  let temp3;
  let temp4;
  // setup empty array
  const eigenVecs = [];
  for (let p = 0; p < numberOfSorts; p += 1) {
    eigenVecs.push([]);
  }
  // loop through each component
  for (let i = 0, iLen = numberofPrincipalComps; i < iLen; i += 1) {
    temp1 = Math.sqrt(eigenValuesSorted[i]);
    critInflectionValue = 0;

    // loop through each QSort to get loading and also calc CRIT
    for (let j = 0, jLen = svd.length; j < jLen; j += 1) {
      temp3 = evenRound(svd[j][i] * temp1, 8);
      eigenVecs[j][i] = temp3;
      // set up data for influection test
      temp4 = evenRound(temp3 * Math.abs(temp3), 8);
      critInflectionValue += temp4;
    }
    inflectionArray.push(evenRound(critInflectionValue, 8));
  }
  return [eigenVecs, inflectionArray];
};

export default calcEigenVectors;
