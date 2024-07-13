import evenRound from '../../../Utils/evenRound';
import loadingState from '../../GlobalState/loadingState';

const calculateFactorLoadingSignificanceLevel = function (totalStatements) {
  const userSelectedSigLevel = loadingState.getState().userSelectedSigLevel;

  // var totalStatements = QAV.getState("qavOriginalSortSize");
  const significanceLevel = evenRound(userSelectedSigLevel * (1 / Math.sqrt(totalStatements)), 5);
  return significanceLevel;
};

export default calculateFactorLoadingSignificanceLevel;

/*

99 = 2.575
98 = 2.33
95 = 1.96
90 = 1.645
85 = 1.44
80 = 1.28

*/
