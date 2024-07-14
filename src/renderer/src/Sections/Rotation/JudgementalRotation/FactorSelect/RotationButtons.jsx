import { useState } from 'react';
import styled from 'styled-components';
import RotationDegreeInput from './RotationDegreeInput';
import GeneralButton from '../../../../Utils/GeneralButton';
import rotationState from '../../../GlobalState/rotationState';
import getRotationState from '../../../GlobalState/getRotationState';

const RotationButtons = () => {
  // getState
  const shouldDisplayDegreeButtonButtons = getRotationState('shouldShowJudgeRotDiv');
  const highlightDegreeInputButton = getRotationState('highlightDegreeInputButton');
  const updateHighlightDegreeInputButton = rotationState(
    (state) => state.highlightDegreeInputButton
  );

  const highlightDegreeButton1 = rotationState((state) => state.highlightDegreeButton1);
  const highlightDegreeButton3 = rotationState((state) => state.highlightDegreeButton3);
  const highlightDegreeButton4 = rotationState((state) => state.highlightDegreeButton4);
  const highlightDegreeButton5 = rotationState((state) => state.highlightDegreeButton5);

  const updateHighlightDegreeButton1 = rotationState((state) => state.highlightDegreeButton1);
  const updateHighlightDegreeButton2 = rotationState((state) => state.highlightDegreeButton2);
  const updateHighlightDegreeButton3 = rotationState((state) => state.highlightDegreeButton3);
  const updateHighlightDegreeButton4 = rotationState((state) => state.highlightDegreeButton4);
  const updateHighlightDegreeButton5 = rotationState((state) => state.highlightDegreeButton5);
  const updateRotateByDegrees = rotationState((state) => state.rotateByDegrees);

  const [localStore, setLocalStore] = useState({
    rotationDegreeInput: '',
    pressed: false,
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
    setLocalStore({ pressed: true, rotationDegreeInput: +value });

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
      setLocalStore({ pressed: false, rotationDegreeInput: '' });
      updateHighlightDegreeInputButton(false);
      updateHighlightDegreeButton1(true);
      updateRotateByDegrees(1);
    }

    if (buttonId === 'Button5Degrees') {
      setLocalStore({ pressed: false, rotationDegreeInput: '' });
      updateHighlightDegreeInputButton(false);
      updateHighlightDegreeButton3(true);
      updateRotateByDegrees(5);
    }

    if (buttonId === 'Button10Degrees') {
      setLocalStore({ pressed: false, rotationDegreeInput: '' });
      updateHighlightDegreeInputButton(false);
      updateHighlightDegreeButton4(true);
      updateRotateByDegrees(10);
    }

    if (buttonId === 'Button90Degrees') {
      setLocalStore({ pressed: false, rotationDegreeInput: '' });
      updateHighlightDegreeInputButton(false);
      updateHighlightDegreeButton5(true);
      updateRotateByDegrees(90);
    }
  };

  if (shouldDisplayDegreeButtonButtons) {
    return (
      <ButtonsContainer>
        <GenButton
          as={GeneralButton}
          id={'Button1Degree'}
          $isActive={highlightDegreeButton1}
          onClick={handleOnclick}
          key={'f1'}
        >
          {`${1}\u00B0`}
        </GenButton>
        <GenButton
          as={GeneralButton}
          id={'Button5Degrees'}
          $isActive={highlightDegreeButton3}
          onClick={handleOnclick}
          key={'f3'}
        >
          {`${5}\u00B0`}
        </GenButton>
        <GenButton
          as={GeneralButton}
          id={'Button10Degrees'}
          $isActive={highlightDegreeButton4}
          onClick={handleOnclick}
          key={'f4'}
        >
          {`${10}\u00B0`}
        </GenButton>
        <GenButton
          as={GeneralButton}
          id={'Button90Degrees'}
          $isActive={highlightDegreeButton5}
          onClick={handleOnclick}
          key={'f5'}
        >
          {`${90}\u00B0`}
        </GenButton>
        <RotationDegreeInput
          name="rotationDegrees"
          value={localStore.rotationDegreeInput}
          pressed={localStore.pressed}
          $isActive={highlightDegreeInputButton}
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

const GenButton = styled.div`
  width: 50px;
`;
