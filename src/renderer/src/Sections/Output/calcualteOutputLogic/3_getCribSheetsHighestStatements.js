import checkIfDistinguishingOrConsensus from "./3_checkIfDistinguishingOrConsensus";
const clone = require("rfdc")();

// todo - convert to functional

const getCribSheetsHighestStatements = (
  j,
  minCounts,
  factorInformation,
  statementNumTrans,
  statementTrans,
  sortValuesTrans
) => {
  let array0a;
  let transferArray = [];

  for (let m = 0; m < minCounts; m++) {
    // get highest remaining statement
    let highestRankStatements = factorInformation.shift();
    // get info
    const stateNum0 = highestRankStatements[statementNumTrans];
    const statement0 = highestRankStatements[statementTrans];
    const checkIfDisOrCon0 = checkIfDistinguishingOrConsensus(stateNum0, j);
    const compositeSortValue0 = highestRankStatements[sortValuesTrans];
    const otherValues = clone(highestRankStatements.rankArray);

    otherValues.splice(j, 1);
    const array0 = [
      stateNum0,
      statement0,
      compositeSortValue0,
      checkIfDisOrCon0
    ];
    array0a = array0.concat(otherValues);
    transferArray.push(array0a);
  }

  return transferArray;
};

export default getCribSheetsHighestStatements;
