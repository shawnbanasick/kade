import styled from 'styled-components';
import GeneralButton from '../../Utils/GeneralButton';
import appState from '../GlobalState/appState';
import { useTranslation } from 'react-i18next';
import inputState from '../GlobalState/inputState';

const UnforcedSortsDisplayButton = (props) => {
  const { t } = useTranslation();

  const updateAreQsortsVerified = inputState((state) => state.updateAreQsortsVerified);
  const updateIsDataButtonGreen = appState((state) => state.updateIsDataButtonGreen);
  const updateHasDataBeenConfirmed = appState((state) => state.updateHasDataBeenConfirmed);
  const updateShowExportButtons = inputState((state) => state.updateShowExportButtons);
  const updateIsForcedQsortPattern = inputState((state) => state.updateIsForcedQsortPattern);

  function handleOnClick() {
    updateAreQsortsVerified(true);
    updateIsDataButtonGreen(true);
    updateHasDataBeenConfirmed(true);
    updateShowExportButtons(true);
  }
  function handleOnClick2() {
    updateAreQsortsVerified(true);
    updateIsDataButtonGreen(true);
    updateHasDataBeenConfirmed(true);
    updateShowExportButtons(true);
    updateIsForcedQsortPattern(false);
  }

  if (props.number === 0) {
    return (
      <Button
        as={GeneralButton}
        onClick={handleOnClick}
        $buttonColor={inputState.areQsortsVerified ? '#a5d6a7' : 'orange'}
      >
        <p>{t('Click after Verifying Sorts')}.</p>
      </Button>
    );
  } else {
    return (
      <Button
        as={GeneralButton}
        onClick={handleOnClick2}
        $buttonColor={inputState.areQsortsVerified ? '#a5d6a7' : 'orange'}
      >
        <p>
          {t('Click after Verifying Sorts')}. {t('Unforced Q sorts')}:{` ${props.number}`}
        </p>
      </Button>
    );
  }
};

export default UnforcedSortsDisplayButton;

const Button = styled.button`
  background-color: ${(props) => props.$buttonColor};
  height: 60px;
`;
