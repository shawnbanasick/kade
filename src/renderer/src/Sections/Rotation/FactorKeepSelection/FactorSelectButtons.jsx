import React from 'react';
import styled from 'styled-components';
import { view } from '@risingstack/react-easy-state';
import rotationState from '../../GlobalState/rotationState';
import getRotationState from '../../GlobalState/getRotationState';
import loadingState from '../../GlobalState/loadingState';
import appState from '../../GlobalState/appState';
import getFactorState from '../../GlobalState/getFactorState';
import outputState from '../../GlobalState/outputState';
import getCoreState from '../../GlobalState/getCoreState';
import GeneralButton from '../../../Utils/GeneralButton';

const clearAllButtons = () => {
  rotationState.factor1Active = false;
  rotationState.factor2Active = false;
  rotationState.factor3Active = false;
  rotationState.factor4Active = false;
  rotationState.factor5Active = false;
  rotationState.factor6Active = false;
  rotationState.factor7Active = false;
  rotationState.factor8Active = false;
};

class FactorSelectionForOutputButtons extends React.Component {
  componentWillUnmount() {
    // getState
    const isFacSelectDisabled = getRotationState('isFacSelectDisabled');
    if (!isFacSelectDisabled) {
      clearAllButtons();
    }
  }

  handleOnclick(event) {
    const value = event.target.value;
    const factor = event.target.id;
    clearAllButtons();
    rotationState[`${factor}Active`] = true;

    const userSelectedRotFactors = [];
    const abFactors = [];

    rotationState.numFactorsKeptForRot = value;
    rotationState.shouldDisplayFacKept = false;
    // hide section 5
    loadingState.showLoadingsTable = false;
    // hide section 6
    outputState.showOutputFactorSelection = false;
    outputState.shouldDisplayFactorVizOptions = false;
    outputState.showFactorCorrelationsTable = false;
    outputState.showStandardErrorsDifferences = false;
    outputState.showFactorCharacteristicsTable = false;
    outputState.showDownloadOutputButtons = false;
    outputState.displayFactorVisualizations = false;
    outputState.showDocxOptions = false;
    outputState.userSelectedFactors = [];
    // reset bipolar
    loadingState.bipolarDisabled = false;
    loadingState.bipolarSplitCount = 0;
    // reset manual rotation
    rotationState.shouldShowJudgeRotDiv = false;
    rotationState.judgeButtonActive = false;
    rotationState.showScatterPlotTableDiv = false;
    rotationState.abFactors = abFactors;
    rotationState.highlightRotfactor1 = false;
    rotationState.highlightRotfactor2 = false;
    rotationState.highlightRotfactor3 = false;
    rotationState.highlightRotfactor4 = false;
    rotationState.highlightRotfactor5 = false;
    rotationState.highlightRotfactor6 = false;
    rotationState.highlightRotfactor7 = false;
    rotationState.highlightRotfactor8 = false;
    rotationState.userSelectedRotFactors = userSelectedRotFactors;
    // reset varimax
    rotationState.varimaxButtonDisabled = false;
    rotationState.varimaxButtonText = 'Varimax Rotation';
    rotationState.varimaxButtonActive = false;
    appState.isRotationButtonGreen = true;
  }

  render() {
    const minNumFactors = getCoreState('numQsorts');
    const btnId = [1, 2, 3, 4, 5, 6, 7, 8];
    if (minNumFactors < btnId.length) {
      btnId.length = minNumFactors;
    }

    // getState
    const isCentroid = getFactorState('activeCentroidRevealButton');
    const isFacSelectDisabled = getRotationState('isFacSelectDisabled');

    if (isCentroid) {
      const numCentroidFactors = getFactorState('numCentroidFactors');
      btnId.length = +numCentroidFactors;
    }

    const showKeepFacForRotButton = getRotationState('showKeepFacForRotButton');
    if (showKeepFacForRotButton) {
      return (
        <React.Fragment>
          {btnId.map((item) => (
            <GeneralFacNumButton
              as={GeneralButton}
              key={`f${item}`}
              value={item}
              isActive={rotationState[`factor${item}Active`]}
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
export default view(FactorSelectionForOutputButtons);

const GeneralFacNumButton = styled.div`
  height: 40px;
  width: 50px;
`;
