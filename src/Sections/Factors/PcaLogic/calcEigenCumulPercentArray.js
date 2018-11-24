import evenRound from "../../../Utils/evenRound";

const calcEigenCumulPercentArray = function(eigenValuesSorted, numberOfSorts) {
  const percentNumber = 100 / numberOfSorts;
  const eigenValuesAsPercents = [];
  let eigenValuesPercent;
  const eigenValuesCumulPercentArray = [];
  let eigenValueCumulPercentAccum = 0;

  for (let k = 0, kLen = eigenValuesSorted.length; k < kLen; k++) {
    eigenValuesSorted[k] = evenRound(eigenValuesSorted[k], 8);
    eigenValuesPercent = evenRound(eigenValuesSorted[k] * percentNumber, 0);
    eigenValuesAsPercents.push(eigenValuesPercent);
    eigenValueCumulPercentAccum += eigenValuesPercent;
    eigenValuesCumulPercentArray.push(eigenValueCumulPercentAccum);
  }
  return [eigenValuesAsPercents, eigenValuesCumulPercentArray];
};

export default calcEigenCumulPercentArray;
