import calcState from '../../GlobalState/calcState';
import coreState from '../../GlobalState/coreState';
import cloneDeep from 'lodash/cloneDeep';

function assignFactorScores(zScoreArray) {
  // getState
  const qavSortTriangleShape = cloneDeep(coreState.getState().qSortPattern);

  const sortedZScoreArray = [];
  for (let i = 0; i < zScoreArray.length; i++) {
    const factorNumbers = zScoreArray[i];

    const temp1 = cloneDeep(factorNumbers);

    temp1.sort((a, b) => {
      if (a.zScore === b.zScore) {
        return b.statement - a.statement;
      }
      return a.zScore - b.zScore;
    });

    for (let j = 0; j < qavSortTriangleShape.length; j++) {
      temp1[j].sortValue = qavSortTriangleShape[j];
      temp1[j].sigVisualization = '';
      temp1[j].sigVisualizationUni = '';
      temp1[j].directionSymbol = '';
      temp1[j].directionSymbolUni = '';
    }
    temp1.sort((a, b) => a.statement - b.statement);
    sortedZScoreArray.push(temp1);
  }
  calcState.setState({ analysisOutput: sortedZScoreArray });
  return sortedZScoreArray;
}

export default assignFactorScores;
