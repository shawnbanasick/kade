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
    <GeneralButton
      className={`ml-[70px] mr-[5px] ${isActive ? 'bg-primary-button' : 'bg-grey-button'}`}
      id="FirebaseButton"
      onClick={handleOnclick}
      disabled={isDisabled}
    >
      {t('Firebase or Local Data')}
    </GeneralButton>
  );
};

export default FirebaseButton;
