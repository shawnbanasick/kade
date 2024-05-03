import checkIfDistinguishingOrConsensus from "./3_checkIfDistinguishingOrConsensus";
const clone = require("rfdc")();

const getCribSheetsRankedLowerThanOtherFactors = (
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

    // look for lower than other factors relative statements and push to cribArray
    if (compositeSortValue < 1) {
      const minRankValue = Math.min(...factorInformation[r].rankArray);
      if (compositeSortValue === minRankValue) {
        const otherValuesLower = clone(factorInformation[r].rankArray);
        otherValuesLower.splice(j, 1);
        const stateNum2 = factorInformation[r][statementNumTrans];
        const checkIfDisOrCon2 = checkIfDistinguishingOrConsensus(stateNum2, j);
        const tempArray33 = [
          stateNum2,
          factorInformation[r][statementTrans],
          compositeSortValue,
          checkIfDisOrCon2
        ];
        const combinedArray2 = tempArray33.concat(otherValuesLower);
        transferArray.push(combinedArray2);
      }
    }
  }
  return transferArray;
};

export default getCribSheetsRankedLowerThanOtherFactors;
