import React from 'react';
import styled from 'styled-components';
import GeneralButton from '../../../Utils/GeneralButton';
import rotationState from '../../GlobalState/rotationState';
import loadingState from '../../GlobalState/loadingState';
import appState from '../../GlobalState/appState';
import outputState from '../../GlobalState/outputState';
import factorState from '../../GlobalState/factorState';
import coreState from '../../GlobalState/coreState';

//todo - convert to functional component

const clearAllButtons = () => {
  rotationState.setState({ factor1Active: false });
  rotationState.setState({ factor2Active: false });
  rotationState.setState({ factor3Active: false });
  rotationState.setState({ factor4Active: false });
  rotationState.setState({ factor5Active: false });
  rotationState.setState({ factor6Active: false });
  rotationState.setState({ factor7Active: false });
  rotationState.setState({ factor8Active: false });
};

class FactorSelectionForOutputButtons extends React.Component {
  componentWillUnmount() {
    // getState
    const isFacSelectDisabled = rotationState.getState().isFacSelectDisabled;
    if (!isFacSelectDisabled) {
      clearAllButtons();
    }
  }

  handleOnclick(event) {
    const value = event.target.value;
    const factor = event.target.id;
    clearAllButtons();
    rotationState.setState({ [`${factor}Active`]: true });

    const userSelectedRotFactors = [];
    const abFactors = [];

    rotationState.setState({ numFactorsKeptForRot: value });
    rotationState.setState({ shouldDisplayFacKept: false });
    // hide section 5
    loadingState.setState({ showLoadingsTable: false });
    // hide section 6
    outputState.setState({ showOutputFactorSelection: false });
    outputState.setState({ shouldDisplayFactorVizOptions: false });
    outputState.setState({ showFactorCorrelationsTable: false });
    outputState.setState({ showStandardErrorsDifferences: false });
    outputState.setState({ showFactorCharacteristicsTable: false });
    outputState.setState({ showDownloadOutputButtons: false });
    outputState.setState({ displayFactorVisualizations: false });
    outputState.setState({ showDocxOptions: false });
    outputState.setState({ userSelectedFactors: [] });
    // reset bipolar
    loadingState.setState({ bipolarDisabled: false });
    loadingState.setState({ bipolarSplitCount: 0 });
    // reset manual rotation
    rotationState.setState({ shouldShowJudgeRotDiv: false });
    rotationState.setState({ judgeButtonActive: false });
    rotationState.setState({ showScatterPlotTableDiv: false });
    rotationState.setState({ abFactors: abFactors });
    rotationState.setState({ highlightRotfactor1: false });
    rotationState.setState({ highlightRotfactor2: false });
    rotationState.setState({ highlightRotfactor3: false });
    rotationState.setState({ highlightRotfactor4: false });
    rotationState.setState({ highlightRotfactor5: false });
    rotationState.setState({ highlightRotfactor6: false });
    rotationState.setState({ highlightRotfactor7: false });
    rotationState.setState({ highlightRotfactor8: false });
    rotationState.setState({ userSelectedRotFactors: userSelectedRotFactors });
    // reset varimax
    rotationState.setState({ varimaxButtonDisabled: false });
    rotationState.setState({ varimaxButtonText: 'Varimax Rotation' });
    rotationState.setState({ varimaxButtonActive: false });
    appState.setState({ isRotationButtonGreen: true });
  }

  render() {
    const minNumFactors = coreState.getState().numQsorts;
    const btnId = [1, 2, 3, 4, 5, 6, 7, 8];
    if (minNumFactors < btnId.length) {
      btnId.length = minNumFactors;
    }

    // getState
    const isCentroid = factorState.getState().activeCentroidRevealButton;
    const isFacSelectDisabled = rotationState.getState().isFacSelectDisabled;

    if (isCentroid) {
      const numCentroidFactors = factorState.getState().numCentroidFactors;
      btnId.length = +numCentroidFactors;
    }

    const showKeepFacForRotButton = rotationState.getState().showKeepFacForRotButton;
    if (showKeepFacForRotButton) {
      return (
        <React.Fragment>
          {btnId.map((item) => (
            <GeneralFacNumButton
              as={GeneralButton}
              key={`f${item}`}
              value={item}
              $isActive={rotationState.getState()[`factor${item}Active`]}
              disabled={isFacSelectDisabled}
              onClick={this.handleOnclick.bind(this)}
              id={`factor${item}`}
            >
              {item}
            </GeneralFacNumButton>
          ))}
        </React.Fragment>
      );
    }
    return null;
  }
}
export default FactorSelectionForOutputButtons;

const GeneralFacNumButton = styled.div`
  height: 40px;
  width: 50px;
`;
