import React from 'react';
import includes from 'lodash/includes';
import styled from 'styled-components';
import { view } from '@risingstack/react-easy-state';
import { Transition } from 'semantic-ui-react';
import outputDispatch from '../calcualteOutputLogic/1_outputDispatch';
import outputState from '../../GlobalState/outputState';
import appState from '../../GlobalState/appState';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import getOutputState from '../../GlobalState/getOutputState';
import getCalcState from '../../GlobalState/getCalcState';

const FactorSelectionForOutputButtons = () => {
  const { t } = useTranslation();

  const handleSubmit = () => {
    // getState
    const userSelectedFactors = getOutputState('userSelectedFactors');
    const sigLevel1 = getCalcState('userSelectedDistStateSigLevel1');
    const sigLevel2 = getCalcState('userSelectedDistStateSigLevel2');
    if (sigLevel1 <= sigLevel2) {
      outputState.notifyOutputDistStateError = true;
      return;
    }
    // also dismiss dist state threshold error toast if present
    // toast.dismiss();
    // if no error calc output
    if (userSelectedFactors.length !== 0) {
      outputDispatch();
      outputState.showDownloadOutputButtons = true;
      appState.isOutputButtonGreen = true;
      outputState.outputFactorSelectButtonsDisabled = true;
    }
  };

  const handleOnclick = (event) => {
    const factor = event.target.id;
    // getState
    let userSelectedFactors = getOutputState('userSelectedFactors');
    const btnId = getOutputState('outputButtonsArray');

    // select all
    if (factor === 'selectAllFacs') {
      userSelectedFactors = [];
      // construct state object and user selected factors array
      outputState.userSelectedFactors = [];
      for (let i = 0; i < btnId.length; i += 1) {
        outputState[`highlightfactor${btnId[i]}`] = true;
        const temp1 = `factor ${btnId[i]}`;
        userSelectedFactors.push(temp1);
      }
      outputState.selectAllClicked = true;
      outputState.userSelectedFactors = userSelectedFactors;
      outputState.showDownloadOutputButtons = false;
      outputState.showFactorCorrelationsTable = false;
      outputState.showFactorCharacteristicsTable = false;
      outputState.showStandardErrorsDifferences = false;
      outputState.displayFactorVisualizations = false;
      outputState.shouldDisplayFactorVizOptions = false;
      outputState.showDocxOptions = false;
      // clear all
    } else if (factor === 'clearAllFacs') {
      for (let i = 0; i < btnId.length; i += 1) {
        outputState[`highlightfactor${btnId[i]}`] = false;
      }
      outputState.userSelectedFactors = [];
      outputState.showFactorCorrelationsTable = false;
      outputState.showFactorCharacteristicsTable = false;
      outputState.showStandardErrorsDifferences = false;
      outputState.showDownloadOutputButtons = false;
      outputState.displayFactorVisualizations = false;
      outputState.shouldDisplayFactorVizOptions = false;
      outputState.outputFactorSelectButtonsDisabled = false;
      outputState.showDocxOptions = false;
      outputState.downloadDocxButtonActive = false;
      outputState.showDocxOptions = false;
      outputState.showDocxOptions = false;
      // reset cache of factor viz data
      outputState.outputForDataViz2 = [];
    } else {
      // getState - select individual factors
      const selectAllClicked = getOutputState('selectAllClicked');
      // select all factors
      if (selectAllClicked) {
        outputState.userSelectedFactors = [];
        // clear all factors for output buttons
        for (let i = 0; i < btnId.length; i += 1) {
          outputState[`highlightfactor${btnId[i]}`] = false;
        }
        outputState.userSelectedFactors = userSelectedFactors;
        outputState.showFactorCorrelationsTable = false;
        outputState.showFactorCharacteristicsTable = false;
        outputState.showStandardErrorsDifferences = false;
        outputState.selectAllClicked = false;
        outputState.displayFactorVisualizations = false;
        outputState.shouldDisplayFactorVizOptions = false;
      }
      if (!includes(userSelectedFactors, factor)) {
        userSelectedFactors.push(factor);
        userSelectedFactors.sort();

        outputState.userSelectedFactors = userSelectedFactors;

        const newFactorId = `highlight${factor.replace(' ', '')}`;
        outputState[newFactorId] = true;
        outputState.showDownloadOutputButtons = false;
        outputState.showFactorCorrelationsTable = false;
        outputState.showFactorCharacteristicsTable = false;
        outputState.showStandardErrorsDifferences = false;
        outputState.displayFactorVisualizations = false;
        outputState.shouldDisplayFactorVizOptions = false;
        outputState.showDocxOptions = false;
      }
    }
  };

  // getState
  const btnId = getOutputState('outputButtonsArray');
  const showOutputFactorSelection = getOutputState('showOutputFactorSelection');
  const areDisabled = getOutputState('outputFactorSelectButtonsDisabled');

  if (showOutputFactorSelection) {
    return (
      <Transition visible={showOutputFactorSelection} animation="fade" duration={1000}>
        <Container1>
          <StyledWrapper>
            <span style={{ marginRight: 5, fontSize: 25, display: 'inlineBlock' }}>
              {t('Select Factors')}
            </span>
            {btnId.map((item) => (
              <NumButtons
                as={GeneralButton}
                key={`f${item}`}
                isActive={outputState[`highlightfactor${item}`]}
                disabled={areDisabled}
                onClick={handleOnclick}
                id={`factor ${item}`}
              >
                {item}
              </NumButtons>
            ))}
            <SelectButtons
              as={GeneralButton}
              id="selectAllFacs"
              disabled={areDisabled}
              onClick={handleOnclick}
            >
              {t('All')}
            </SelectButtons>
            <SelectButtons id="clearAllFacs" as={GeneralButton} onClick={handleOnclick}>
              {t('Clear')}
            </SelectButtons>
            <SelectButtons id="startOutput" as={GeneralButton} onClick={handleSubmit}>
              {t('Submit')}
            </SelectButtons>
          </StyledWrapper>
        </Container1>
      </Transition>
    );
  } else {
    return null;
  }
};

export default view(FactorSelectionForOutputButtons);

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  width: 900px;
  align-items: baseline;
`;

const NumButtons = styled.div`
  width: 50px;
`;

const SelectButtons = styled.div`
  min-width: 75px;
`;

const Container1 = styled.div`
  // outline: 2px solid red;
  height: 100px;
  width: 800px;
`;
