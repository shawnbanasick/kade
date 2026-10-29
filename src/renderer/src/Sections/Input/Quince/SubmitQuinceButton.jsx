import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import inputState from '../../GlobalState/inputState';

const SubmitQuinceButton = () => {
  const { t } = useTranslation();
  // getState
  const isActive = inputState((state) => state.isShowNetlifyInputButtonGreen);
  const isDisabled = inputState((state) => state.disabledNetlifyButton);
  const updateShowSheetsInput = inputState((state) => state.updateShowSheetsInput);
  const updateShowNetlifyInput = inputState((state) => state.updateShowNetlifyInput);
  const updateShowFirebaseInput = inputState((state) => state.updateShowFirebaseInput);
  const updateIsShowSheetsInputButtonGreen = inputState(
    (state) => state.updateIsShowSheetsInputButtonGreen
  );
  const updateIsShowFirebaseInputButtonGreen = inputState(
    (state) => state.updateIsShowFirebaseInputButtonGreen
  );
  const updateIsShowNetlifyInputButtonGreen = inputState(
    (state) => state.updateIsShowNetlifyInputButtonGreen
  );

  const handleOnclick = () => {
    updateShowSheetsInput(false);
    updateShowNetlifyInput(true);
    updateShowFirebaseInput(false);
    updateIsShowSheetsInputButtonGreen(false);
    updateIsShowFirebaseInputButtonGreen(false);
    updateIsShowNetlifyInputButtonGreen(true);
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 p-2 h-[205px] w-[250px]">
      <GeneralButton
        id="NetlifyButton"
        onClick={handleOnclick}
        disabled={isDisabled}
        className={`min-w-[120px] ${isActive ? 'bg-primary-button' : 'bg-orange-button'}`}
      >
        {t('Submit Quince Data')}
      </GeneralButton>
    </div>
  );
};

export default SubmitQuinceButton;
