import outputState from '../Sections/GlobalState/outputState';
import appState from '../Sections/GlobalState/appState';
import loadingState from '../Sections/GlobalState/loadingState';

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
    displayOutputTabContent: false,
  });

  appState.setState({
    isLoadingsButtonGreen: false,
    isRotationButtonGreen: false,
    isFactorsButtonGreen: false,
    isOutputButtonGreen: false,
  });

  loadingState.setState({
    autoflagButtonColor: 'bg-grey-button',
    autoFlagHistory: [],
    bipolarDisabled: false,
    bipolarIndexArray: [],
    bipolarSplitCount: 0,
  });

  return;
};

export default resetAnalysis;
