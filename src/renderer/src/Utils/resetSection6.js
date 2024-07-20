import outputState from '../Sections/GlobalState/outputState';

const resetSection6 = (section) => {
  if (section === 'output') {
    outputState.setState({ showFactorCorrelationsTable: false });
    outputState.setState({ showStandardErrorsDifferences: false });
    outputState.setState({ showFactorCharacteristicsTable: false });
    outputState.setState({ showDownloadOutputButtons: false });
    outputState.setState({ displayFactorVisualizations: false });
    outputState.setState({ shouldDisplayFactorVizOptions: false });

    outputState.setState({ showDocxOptions: false });
    outputState.setState({ userSelectedFactors: [] });
    return;
  } else {
    // hide section 6
    outputState.setState({ showOutputFactorSelection: false });
    outputState.setState({ showFactorCorrelationsTable: false });
    outputState.setState({ showStandardErrorsDifferences: false });
    outputState.setState({ showFactorCharacteristicsTable: false });
    outputState.setState({ showDownloadOutputButtons: false });
    outputState.setState({ displayFactorVisualizations: false });
    outputState.setState({ shouldDisplayFactorVizOptions: false });

    outputState.setState({ showDocxOptions: false });
    outputState.setState({ userSelectedFactors: [] });
    return;
  }
};

export default resetSection6;
