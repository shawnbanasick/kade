import calcState from "../../GlobalState/calcState";
import getCoreState from "../../GlobalState/getCoreState";
const clone = require("rfdc")();

function assignFactorScores(zScoreArray) {
  // getState
  const qavSortTriangleShape = getCoreState("qSortPattern");

  const sortedZScoreArray = [];
  for (let i = 0; i < zScoreArray.length; i++) {
    const factorNumbers = zScoreArray[i];

    const temp1 = clone(factorNumbers);

    temp1.sort((a, b) => {
      if (a.zScore === b.zScore) {
        return b.statement - a.statement;
      }
      return a.zScore - b.zScore;
    });

    for (let j = 0; j < qavSortTriangleShape.length; j++) {
      temp1[j].sortValue = qavSortTriangleShape[j];
      temp1[j].sigVisualization = "";
      temp1[j].sigVisualizationUni = "";
      temp1[j].directionSymbol = "";
      temp1[j].directionSymbolUni = "";
    }
    temp1.sort((a, b) => a.statement - b.statement);
    sortedZScoreArray.push(temp1);
  }
  calcState.analysisOutput = sortedZScoreArray;
  return sortedZScoreArray;
}

export default assignFactorScores;
