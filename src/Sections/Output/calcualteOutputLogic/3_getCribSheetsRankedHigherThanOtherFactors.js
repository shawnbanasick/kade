import checkIfDistinguishingOrConsensus from "./3_checkIfDistinguishingOrConsensus";
const clone = require("rfdc")();

const getCribSheetsRankedHigherThanOtherFactors = (
  j,
  factorInformation,
  sortValuesTrans,
  statementTrans,
  statementNumTrans
) => {
  let transferArray = [];
  // look for higher than other factors relative statements and push to cribArray
  for (let r = 0, rLen = factorInformation.length; r < rLen; r++) {
    const compositeSortValue = factorInformation[r][sortValuesTrans];
    if (compositeSortValue > -1) {
      const maxRankValue = Math.max(...factorInformation[r].rankArray);
      if (compositeSortValue === maxRankValue) {
        const otherValues2 = clone(factorInformation[r].rankArray);
        otherValues2.splice(j, 1);
        const stateNum = factorInformation[r][statementNumTrans];
        const checkIfDisOrCon = checkIfDistinguishingOrConsensus(stateNum, j);
        const tempArray22 = [
          stateNum,
          factorInformation[r][statementTrans],
          compositeSortValue,
          checkIfDisOrCon
        ];
        const combinedArray1 = tempArray22.concat(otherValues2);
        transferArray.push(combinedArray1);
      }
    }
  }
  return transferArray;
};

export default getCribSheetsRankedHigherThanOtherFactors;
