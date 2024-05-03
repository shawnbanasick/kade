import checkIfDistinguishingOrConsensus from "./3_checkIfDistinguishingOrConsensus";
const clone = require("rfdc")();

const getCribSheetsLowestStatements = (
  j,
  maxCounts,
  factorInformation,
  statementNumTrans,
  statementTrans,
  sortValuesTrans
) => {
  let array3a = [];
  let transferArray = [];

  for (let p = 0; p < maxCounts; p++) {
    // tempObj2 = {};
    const lowestRankStatements = factorInformation.pop();
    const stateNum3 = lowestRankStatements[statementNumTrans];
    const statement3 = lowestRankStatements[statementTrans];
    const checkIfDisOrCon3 = checkIfDistinguishingOrConsensus(stateNum3, j);
    const compositeSortValue3 = lowestRankStatements[sortValuesTrans];
    const otherValues3 = clone(lowestRankStatements.rankArray);
    otherValues3.splice(j, 1);
    const array3 = [
      stateNum3,
      statement3,
      compositeSortValue3,
      checkIfDisOrCon3
    ];
    array3a = array3.concat(otherValues3);
    transferArray.unshift(array3a);
  }
  return transferArray;
};

export default getCribSheetsLowestStatements;
