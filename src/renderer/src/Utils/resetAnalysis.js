import outputState from '../Sections/GlobalState/outputState';
import appState from '../Sections/GlobalState/appState';

const resetAnalysis = () => {
  outputState.setState({
    showOutputFactorSelection: false,
    showTableDataNotSentWarning: true,
    downloadDocxButtonActive: false,
    thresholdButtonActive: false,
    qSortValueButtonActive: false,
    statementNumButtonActive: true,
    zScoreButtonActive: false,
    distStateListSortKey: 'statementNum',
  });

  appState.setState({
    isLoadingsButtonGreen: false,
    isRotationButtonGreen: false,
    isFactorsButtonGreen: false,
    isOutputButtonGreen: false,
  });

  return;
};

export default resetAnalysis;
