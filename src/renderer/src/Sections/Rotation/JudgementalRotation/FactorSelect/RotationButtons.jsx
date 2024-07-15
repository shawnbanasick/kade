import { useState } from 'react';
import styled from 'styled-components';
import RotationDegreeInput from './RotationDegreeInput';
import GeneralButton from '../../../../Utils/GeneralButton';
import rotationState from '../../../GlobalState/rotationState';

const RotationButtons = () => {
  // getState
  const shouldDisplayDegreeButtonButtons = rotationState((state) => state.shouldShowJudgeRotDiv);
  const highlightDegreeInputButton = rotationState((state) => state.highlightDegreeInputButton);

  const highlightDegreeButton1 = rotationState((state) => state.highlightDegreeButton1);
  const highlightDegreeButton3 = rotationState((state) => state.highlightDegreeButton3);
  const highlightDegreeButton4 = rotationState((state) => state.highlightDegreeButton4);
  const highlightDegreeButton5 = rotationState((state) => state.highlightDegreeButton5);

  const updateHighlightDegreeInputButton = rotationState(
    (state) => state.updateHighlightDegreeInputButton
  );
  const updateHighlightDegreeButton1 = rotationState((state) => state.updateHighlightDegreeButton1);
  const updateHighlightDegreeButton2 = rotationState((state) => state.updateHighlightDegreeButton2);
  const updateHighlightDegreeButton3 = rotationState((state) => state.updateHighlightDegreeButton3);
  const updateHighlightDegreeButton4 = rotationState((state) => state.updateHighlightDegreeButton4);
  const updateHighlightDegreeButton5 = rotationState((state) => state.updateHighlightDegreeButton5);
  const updateRotateByDegrees = rotationState((state) => state.updateRotateByDegrees);

  const [localStore, setLocalStore] = useState({
    rotationDegreeInput: '',
    pressed: +false,
  });

  const getRotationDegreeFromUI = (event) => {
    const value = event.target.value;
    // clean input
    if (isNaN(value)) {
      return;
    }
    if (value > 360) {
      setLocalStore({ ...localStore, rotationDegreeInput: '' });
      return;
    }
    setLocalStore({ pressed: +true, rotationDegreeInput: +value });

    updateHighlightDegreeInputButton(true);

    // clear all button highlighting
    updateHighlightDegreeButton1(false);
    updateHighlightDegreeButton2(false);
    updateHighlightDegreeButton3(false);
    updateHighlightDegreeButton4(false);
    updateHighlightDegreeButton5(false);
    updateRotateByDegrees(+value);
  };

  const handleOnclick = (event) => {
    const buttonId = event.target.id;

    // clear all button highlighting
    updateHighlightDegreeButton1(false);
    updateHighlightDegreeButton2(false);
    updateHighlightDegreeButton3(false);
    updateHighlightDegreeButton4(false);
    updateHighlightDegreeButton5(false);

    if (buttonId === 'Button1Degree') {
      setLocalStore({ pressed: +false, rotationDegreeInput: '' });
      updateHighlightDegreeInputButton(false);
      updateHighlightDegreeButton1(true);
      updateRotateByDegrees(1);
    }

    if (buttonId === 'Button5Degrees') {
      setLocalStore({ pressed: +false, rotationDegreeInput: '' });
      updateHighlightDegreeInputButton(false);
      updateHighlightDegreeButton3(true);
      updateRotateByDegrees(5);
    }

    if (buttonId === 'Button10Degrees') {
      setLocalStore({ pressed: +false, rotationDegreeInput: '' });
      updateHighlightDegreeInputButton(false);
      updateHighlightDegreeButton4(true);
      updateRotateByDegrees(10);
    }

    if (buttonId === 'Button90Degrees') {
      setLocalStore({ pressed: +false, rotationDegreeInput: '' });
      updateHighlightDegreeInputButton(false);
      updateHighlightDegreeButton5(true);
      updateRotateByDegrees(90);
    }
  };

  if (shouldDisplayDegreeButtonButtons) {
    return (
      <ButtonsContainer>
        <GeneralButton
          id={'Button1Degree'}
          $isActive={highlightDegreeButton1}
          width="50px"
          onClick={handleOnclick}
          key={'f1'}
        >
          {`${1}\u00B0`}
        </GeneralButton>
        <GeneralButton
          id={'Button5Degrees'}
          width="50px"
          $isActive={highlightDegreeButton3}
          onClick={handleOnclick}
          key={'f3'}
        >
          {`${5}\u00B0`}
        </GeneralButton>
        <GeneralButton
          id={'Button10Degrees'}
          $isActive={highlightDegreeButton4}
          width="50px"
          onClick={handleOnclick}
          key={'f4'}
        >
          {`${10}\u00B0`}
        </GeneralButton>
        <GeneralButton
          id={'Button90Degrees'}
          $isActive={highlightDegreeButton5}
          width="50px"
          onClick={handleOnclick}
          key={'f5'}
        >
          {`${90}\u00B0`}
        </GeneralButton>
        <RotationDegreeInput
          name="rotationDegrees"
          value={localStore.rotationDegreeInput}
          active={highlightDegreeInputButton}
          onChangeCallback={getRotationDegreeFromUI}
        />
      </ButtonsContainer>
    );
  }
  return null;
};

export default RotationButtons;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
