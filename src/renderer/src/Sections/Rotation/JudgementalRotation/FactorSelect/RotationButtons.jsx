import React from 'react';
import styled from 'styled-components';
import { view, store } from '@risingstack/react-easy-state';
import RotationDegreeInput from './RotationDegreeInput';
import GeneralButton from '../../../../Utils/GeneralButton';
import rotationState from '../../../GlobalState/rotationState';
import getRotationState from '../../../GlobalState/getRotationState';

const localStore = store({
  rotationDegreeInput: '',
  pressed: false
});

const getRotationDegreeFromUI = (event) => {
  const value = event.target.value;
  // clean input
  if (isNaN(value)) {
    return;
  }
  if (value > 360) {
    localStore.rotationDegreeInput = '';
    return;
  }
  localStore.rotationDegreeInput = +value;
  rotationState.highlightDegreeInputButton = true;
  localStore.pressed = true;

  // clear all button highlighting
  rotationState.highlightDegreeButton1 = false;
  rotationState.highlightDegreeButton2 = false;
  rotationState.highlightDegreeButton3 = false;
  rotationState.highlightDegreeButton4 = false;
  rotationState.highlightDegreeButton5 = false;
  rotationState.rotateByDegrees = +value;
};

const handleOnclick = (event) => {
  const buttonId = event.target.id;

  // clear all button highlighting
  rotationState.highlightDegreeButton1 = false;
  rotationState.highlightDegreeButton2 = false;
  rotationState.highlightDegreeButton3 = false;
  rotationState.highlightDegreeButton4 = false;
  rotationState.highlightDegreeButton5 = false;

  if (buttonId === 'Button1Degree') {
    localStore.rotationDegreeInput = '';
    rotationState.highlightDegreeInputButton = false;
    localStore.pressed = false;
    rotationState.highlightDegreeButton1 = true;
    rotationState.rotateByDegrees = 1;
  }

  if (buttonId === 'Button5Degrees') {
    localStore.rotationDegreeInput = '';
    rotationState.highlightDegreeInputButton = false;
    localStore.pressed = false;
    rotationState.highlightDegreeButton3 = true;
    rotationState.rotateByDegrees = 5;
  }

  if (buttonId === 'Button10Degrees') {
    rotationState.highlightDegreeInputButton = false;
    localStore.rotationDegreeInput = '';
    localStore.pressed = false;
    rotationState.highlightDegreeButton4 = true;
    rotationState.rotateByDegrees = 10;
  }

  if (buttonId === 'Button90Degrees') {
    rotationState.highlightDegreeInputButton = false;
    localStore.rotationDegreeInput = '';
    localStore.pressed = false;
    rotationState.highlightDegreeButton5 = true;
    rotationState.rotateByDegrees = 90;
  }
};

const RotationButtons = () => {
  // getState
  const shouldDisplayDegreeButtonButtons = getRotationState('shouldShowJudgeRotDiv');
  const highlightDegreeInputButton = getRotationState('highlightDegreeInputButton');

  if (shouldDisplayDegreeButtonButtons) {
    return (
      <ButtonsContainer>
        <GenButton
          as={GeneralButton}
          id={'Button1Degree'}
          isActive={rotationState.highlightDegreeButton1}
          onClick={handleOnclick}
          key={'f1'}
        >
          {`${1}\u00B0`}
        </GenButton>
        <GenButton
          as={GeneralButton}
          id={'Button5Degrees'}
          isActive={rotationState.highlightDegreeButton3}
          onClick={handleOnclick}
          key={'f3'}
        >
          {`${5}\u00B0`}
        </GenButton>
        <GenButton
          as={GeneralButton}
          id={'Button10Degrees'}
          isActive={rotationState.highlightDegreeButton4}
          onClick={handleOnclick}
          key={'f4'}
        >
          {`${10}\u00B0`}
        </GenButton>
        <GenButton
          as={GeneralButton}
          id={'Button90Degrees'}
          isActive={rotationState.highlightDegreeButton5}
          onClick={handleOnclick}
          key={'f5'}
        >
          {`${90}\u00B0`}
        </GenButton>
        <RotationDegreeInput
          name="rotationDegrees"
          value={localStore.rotationDegreeInput}
          pressed={localStore.pressed}
          isActive={highlightDegreeInputButton}
          onChangeCallback={getRotationDegreeFromUI}
        />
      </ButtonsContainer>
    );
  }
  return null;
};

export default view(RotationButtons);

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const GenButton = styled.div`
  width: 50px;
`;
