import React from 'react';
import { view } from '@risingstack/react-easy-state';
import styled from 'styled-components';
import GeneralButton from '../../Utils/GeneralButton';
import appState from '../GlobalState/appState';
import { useTranslation } from 'react-i18next';
import inputState from '../GlobalState/inputState';

// const localStore = store({
//   buttonColor: "orange"
// });

function handleOnClick() {
  inputState.areQsortsVerified = true;
  appState.isDataButtonGreen = true;
  appState.hasDataBeenConfirmed = true;
  inputState.showExportButtons = true;
}
function handleOnClick2() {
  inputState.areQsortsVerified = true;
  appState.isDataButtonGreen = true;
  appState.hasDataBeenConfirmed = true;
  inputState.showExportButtons = true;
  inputState.isForcedQsortPattern = false;
}

const UnforcedSortsDisplayButton = (props) => {
  const { t } = useTranslation();

  if (props.number === 0) {
    return (
      <Button
        as={GeneralButton}
        onClick={handleOnClick}
        buttonColor={inputState.areQsortsVerified ? '#a5d6a7' : 'orange'}
      >
        <p>{t('Click after Verifying Sorts')}.</p>
      </Button>
    );
  } else {
    return (
      <Button
        as={GeneralButton}
        onClick={handleOnClick2}
        buttonColor={inputState.areQsortsVerified ? '#a5d6a7' : 'orange'}
      >
        <p>
          {t('Click after Verifying Sorts')}. {t('Unforced Q sorts')}:{` ${props.number}`}
        </p>
      </Button>
    );
  }
};

export default view(UnforcedSortsDisplayButton);

const Button = styled.button`
  background-color: ${(props) => props.buttonColor};
  height: 60px;
`;
