import loadingState from '../../GlobalState/loadingState';
import outputState from '../../GlobalState/outputState';

const generateOutputFromLoadingTable = (currentLoadingsTable) => {
  // getState - initialize output select buttons highlighting to false
  const btnId = outputState.getState().outputButtonsArray;
  for (let i = 0; i < btnId.length; i += 1) {
    outputState[`highlightfactor${btnId[i]}`] = false;
  }
  loadingState.setState({ currentLoadingsTable: currentLoadingsTable });
  loadingState.setState({ notifyDataSentToOutputSuccess: true });
  outputState.setState({ userSelectedFactors: [] });
  outputState.setState({ showOutputFactorSelection: true });
  outputState.setState({ showStandardErrorsDifferences: false });
  outputState.setState({ showFactorCharacteristicsTable: false });
  outputState.setState({ showDownloadOutputButtons: false });
  outputState.setState({ showFactorCorrelationsTable: false });
  outputState.setState({ displayFactorVisualizations: false });
  outputState.setState({ shouldDisplayFactorVizOptions: false });
  outputState.setState({ outputFactorSelectButtonsDisabled: false });
  outputState.setState({ showDocxOptions: false });
  // remove warning for no data in output section
  outputState.setState({ showTableDataNotSentWarning: false });
  // reset cache of factor viz data
  outputState.setState({ outputForDataViz2: [] });
  loadingState.setState({
    sendDataToOutputButtonColor: getComputedStyle(document.documentElement).getPropertyValue(
      '--main-theme-color'
    ),
  });
  loadingState.setState({ gridRowDataLoadingsTable: currentLoadingsTable });

  return;
};

export default generateOutputFromLoadingTable;
