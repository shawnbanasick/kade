import includes from 'lodash/includes';
import styled from 'styled-components';
import { Transition } from 'semantic-ui-react';
import outputDispatch from '../calcualteOutputLogic/1_outputDispatch';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import outputState from '../../GlobalState/outputState';
import appState from '../../GlobalState/appState';
import calcState from '../../GlobalState/calcState';
import resetSection6 from '../../../Utils/resetSection6';
import filter from 'lodash/filter';

const FactorSelectionForOutputButtons = () => {
  const { t } = useTranslation();
  const updateShowDownloadOutputButtons = outputState(
    (state) => state.updateShowDownloadOutputButtons
  );
  const updateIsOutputButtonGreen = appState((state) => state.updateIsOutputButtonGreen);
  const updateOutputFactorSelectButtonsDisabled = outputState(
    (state) => state.updateOutputFactorSelectButtonsDisabled
  );
  let userSelectedFactors = outputState((state) => state.userSelectedFactors);
  const showOutputFactorSelection = outputState((state) => state.showOutputFactorSelection);
  const areDisabled = outputState((state) => state.outputFactorSelectButtonsDisabled);
  const btnId = outputState((state) => state.outputButtonsArray);
  const updateUserSelectedFactors = outputState((state) => state.updateUserSelectedFactors);
  const updateSelectAllClicked = outputState((state) => state.updateSelectAllClicked);
  const updateOutputForDataViz2 = outputState((state) => state.updateOutputForDataViz2);
  const selectAllClicked = outputState((state) => state.selectAllClicked);
  const highlightFactor1 = outputState((state) => state.highlightFactor1);
  const highlightFactor2 = outputState((state) => state.highlightFactor2);
  const highlightFactor3 = outputState((state) => state.highlightFactor3);
  const highlightFactor4 = outputState((state) => state.highlightFactor4);
  const highlightFactor5 = outputState((state) => state.highlightFactor5);
  const highlightFactor6 = outputState((state) => state.highlightFactor6);
  const highlightFactor7 = outputState((state) => state.highlightFactor7);
  const highlightFactor8 = outputState((state) => state.highlightFactor8);
  const updateHighlightFactor1 = outputState((state) => state.updateHighlightFactor1);
  const updateHighlightFactor2 = outputState((state) => state.updateHighlightFactor2);
  const updateHighlightFactor3 = outputState((state) => state.updateHighlightFactor3);
  const updateHighlightFactor4 = outputState((state) => state.updateHighlightFactor4);
  const updateHighlightFactor5 = outputState((state) => state.updateHighlightFactor5);
  const updateHighlightFactor6 = outputState((state) => state.updateHighlightFactor6);
  const updateHighlightFactor7 = outputState((state) => state.updateHighlightFactor7);
  const updateHighlightFactor8 = outputState((state) => state.updateHighlightFactor8);
  const sigLevel1 = calcState((state) => state.userSelectedDistStateSigLevel1);
  const sigLevel2 = calcState((state) => state.userSelectedDistStateSigLevel2);

  const buttonsToRenderArray = [];
  for (let i = 0; i < 8; i++) {
    if (i < btnId.length) {
      buttonsToRenderArray.push(true);
    } else {
      buttonsToRenderArray.push(false);
    }
  }
  const show1 = buttonsToRenderArray[0];
  const show2 = buttonsToRenderArray[1];
  const show3 = buttonsToRenderArray[2];
  const show4 = buttonsToRenderArray[3];
  const show5 = buttonsToRenderArray[4];
  const show6 = buttonsToRenderArray[5];
  const show7 = buttonsToRenderArray[6];
  const show8 = buttonsToRenderArray[7];

  const handleSubmit = () => {
    if (sigLevel1 <= sigLevel2) {
      outputState.notifyOutputDistStateError = true;
      return;
    }
    // also dismiss dist state threshold error toast if present
    // toast.dismiss();
    // if no error calc output
    if (userSelectedFactors.length !== 0) {
      outputDispatch();
      updateShowDownloadOutputButtons(true);
      updateIsOutputButtonGreen(true);
      updateOutputFactorSelectButtonsDisabled(true);
    }
  };

  const handleOnclick = (event) => {
    const factor = event.target.id;
    // getState

    // select all
    if (factor === 'selectAllFacs') {
      userSelectedFactors = [];

      for (let i = 0; i < btnId.length; i += 1) {
        const temp1 = `factor ${btnId[i]}`;
        userSelectedFactors.push(temp1);
      }
      updateHighlightFactor1(true);
      updateHighlightFactor2(true);
      updateHighlightFactor3(true);
      updateHighlightFactor4(true);
      updateHighlightFactor5(true);
      updateHighlightFactor6(true);
      updateHighlightFactor7(true);
      updateHighlightFactor8(true);

      // updateSelectAllClicked(true);
      resetSection6('output');
      // cleared by resetSection6, so add back
      // updateShowDownloadOutputButtons(true);
      // construct state object and user selected factors array
      updateUserSelectedFactors(userSelectedFactors);
    } else if (factor === 'clearAllFacs') {
      updateHighlightFactor1(false);
      updateHighlightFactor2(false);
      updateHighlightFactor3(false);
      updateHighlightFactor4(false);
      updateHighlightFactor5(false);
      updateHighlightFactor6(false);
      updateHighlightFactor7(false);
      updateHighlightFactor8(false);

      // clear visualizations
      resetSection6('output');
      // reset cache of factor viz data
      updateUserSelectedFactors([]);
      updateOutputForDataViz2([]);
    } else {
      if (!includes(userSelectedFactors, factor)) {
        userSelectedFactors.push(factor);
        userSelectedFactors.sort();
        if (factor === 'factor 1') {
          updateHighlightFactor1(true);
        }
        if (factor === 'factor 2') {
          updateHighlightFactor2(true);
        }
        if (factor === 'factor 3') {
          updateHighlightFactor3(true);
        }
        if (factor === 'factor 4') {
          updateHighlightFactor4(true);
        }
        if (factor === 'factor 5') {
          updateHighlightFactor5(true);
        }
        if (factor === 'factor 6') {
          updateHighlightFactor6(true);
        }
        if (factor === 'factor 7') {
          updateHighlightFactor7(true);
        }
        if (factor === 'factor 8') {
          updateHighlightFactor8(true);
        }

        resetSection6('output');
        updateUserSelectedFactors(userSelectedFactors);
      } else if (includes(userSelectedFactors, factor)) {
        let filteredArray = filter(userSelectedFactors, (item) => item !== factor);

        if (factor === 'factor 1') {
          updateHighlightFactor1(false);
        }
        if (factor === 'factor 2') {
          updateHighlightFactor2(false);
        }
        if (factor === 'factor 3') {
          updateHighlightFactor3(false);
        }
        if (factor === 'factor 4') {
          updateHighlightFactor4(false);
        }
        if (factor === 'factor 5') {
          updateHighlightFactor5(false);
        }
        if (factor === 'factor 6') {
          updateHighlightFactor6(false);
        }
        if (factor === 'factor 7') {
          updateHighlightFactor7(false);
        }
        if (factor === 'factor 8') {
          updateHighlightFactor8(false);
        }
        updateUserSelectedFactors(filteredArray);
      }
    }
  };

  if (showOutputFactorSelection) {
    return (
      <Transition visible={showOutputFactorSelection} animation="fade" duration={1000}>
        <Container1>
          <StyledWrapper>
            <span style={{ marginRight: 5, fontSize: 25, display: 'inlineBlock' }}>
              {t('Select Factors')}
            </span>
            {show1 && (
              <NumButtons
                id={'factor 1'}
                width={'50px'}
                onClick={handleOnclick}
                key={`factor1`}
                $isActive={highlightFactor1}
                disabled={areDisabled}
              >
                1
              </NumButtons>
            )}
            {show2 && (
              <NumButtons
                id={'factor 2'}
                width={'50px'}
                onClick={handleOnclick}
                key={`factor2`}
                $isActive={highlightFactor2}
                disabled={areDisabled}
              >
                2
              </NumButtons>
            )}
            {show3 && (
              <NumButtons
                id={'factor 3'}
                width={'50px'}
                onClick={handleOnclick}
                key={`factor3`}
                $isActive={highlightFactor3}
                disabled={areDisabled}
              >
                3
              </NumButtons>
            )}
            {show4 && (
              <NumButtons
                id={'factor 4'}
                width={'50px'}
                onClick={handleOnclick}
                key={`factor4`}
                $isActive={highlightFactor4}
                disabled={areDisabled}
              >
                4
              </NumButtons>
            )}
            {show5 && (
              <NumButtons
                id={'factor 5'}
                width={'50px'}
                onClick={handleOnclick}
                key={`factor5`}
                $isActive={highlightFactor5}
                disabled={areDisabled}
              >
                5
              </NumButtons>
            )}
            {show6 && (
              <NumButtons
                id={'factor 6'}
                width={'50px'}
                onClick={handleOnclick}
                key={`factor6`}
                $isActive={highlightFactor6}
                disabled={areDisabled}
              >
                6
              </NumButtons>
            )}
            {show7 && (
              <NumButtons
                id={'factor 7'}
                width={'50px'}
                onClick={handleOnclick}
                key={`factor7`}
                $isActive={highlightFactor7}
                disabled={areDisabled}
              >
                7
              </NumButtons>
            )}
            {show8 && (
              <NumButtons
                id={'factor 8'}
                width={'50px'}
                onClick={handleOnclick}
                key={`factor8`}
                $isActive={highlightFactor8}
                disabled={areDisabled}
              >
                8
              </NumButtons>
            )}

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

export default FactorSelectionForOutputButtons;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  width: 900px;
  align-items: baseline;
`;

const NumButtons = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  box-shadow: none;
  min-height: 40px;
  height: ${(props) => props.height || 'auto'};
  width: ${(props) => props.width || 'auto'};
  text-align: center;
  font-size: 18px;
  font-family: Helvetica, sans-serif;
  font-weight: semibold;
  border: none;
  border-radius: 4px;
  margin-right: 3px;
  margin-bottom: 3px;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  background: #d6dbe0;
  text-decoration: none;
  color: black;
  transition: all 0.5s ease;
  /* transition: background-color 0.5s ease; */
  transition-duration: 0.3s;
  transition-property: box-shadow;
  transform: translateZ(0);
  box-shadow:
    inset 0 0 0 4px ${(props) => (props.$isActive ? 'var(--main-theme-color)' : '#d6dbe0')},
    0 0 1px 0.6;
  background-color: ${(props) => (props.$isActive ? 'var(--main-theme-color)' : '#d6dbe0')};

  box-shadow: ${(props) =>
    props.$isActive
      ? 'inset 0 0 0 2px #666, 0 0 1px transparent'
      : 'inset 0 0 0 0px #666, 0 0 0px transparent'};

  &:hover {
    box-shadow:
      inset 0 0 0 4px #666,
      0 0 1px transparent;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.7;
  }
`;

const SelectButtons = styled.div`
  min-width: 75px;
`;

const Container1 = styled.div`
  // outline: 2px solid red;
  margin-top: 3px;
  height: 100px;
  width: 800px;
`;
