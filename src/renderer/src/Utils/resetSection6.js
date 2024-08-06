import outputState from '../Sections/GlobalState/outputState';
import FactorSelectButtonModal from '../Sections/Rotation/FactorKeepSelection/FactorSelectButtonModal';

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

    outputState.setState({
      highlightFactor1: false,
      highlightFactor2: false,
      highlightFactor3: false,
      highlightFactor4: false,
      highlightFactor5: false,
      highlightFactor6: false,
      highlightFactor7: false,
      highlightFactor8: false,
      FactorSelectButtonsDisabled: false,
    });

    return;
  }
};

export default resetSection6;
