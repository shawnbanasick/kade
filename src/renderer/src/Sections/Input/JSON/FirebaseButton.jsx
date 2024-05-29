import styled from 'styled-components';
import GeneralButton from './../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import inputState from '../../GlobalState/inputState';

const FirebaseButton = () => {
  const { t } = useTranslation();
  const updateShowSheetsInput = inputState((state) => state.updateShowSheetsInput);
  const updateShowFirebaseInput = inputState((state) => state.updateShowFirebaseInput);
  const updateShowNetlifyInput = inputState((state) => state.updateShowNetlifyInput);
  const updateIsShowFirebaseInputButtonGreen = inputState(
    (state) => state.updateIsShowFirebaseInputButtonGreen
  );
  const updateIsShowSheetsInputButtonGreen = inputState(
    (state) => state.updateIsShowSheetsInputButtonGreen
  );
  const updateIsShowNetlifyInputButtonGreen = inputState(
    (state) => state.updateIsShowNetlifyInputButtonGreen
  );
  const isActive = inputState((state) => state.isShowFirebaseInputButtonGreen);
  const isDisabled = inputState((state) => state.disabledFirebaseButton);

  const handleOnclick = () => {
    updateShowSheetsInput(false);
    updateShowFirebaseInput(true);
    updateShowNetlifyInput(false);
    updateIsShowFirebaseInputButtonGreen(true);
    updateIsShowSheetsInputButtonGreen(false);
    updateIsShowNetlifyInputButtonGreen(false);
  };

  return (
    <TradButton
      as={GeneralButton}
      id="FirebaseButton"
      $isActive={isActive}
      onClick={handleOnclick}
      disabled={isDisabled}
    >
      {t('Firebase or Local Data')}
    </TradButton>
  );
};

export default FirebaseButton;

const TradButton = styled.div`
  margin-left: 70px;
  margin-right: 5px;
`;
