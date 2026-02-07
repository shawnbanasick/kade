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
  const areQsortsVerified = inputState((state) => state.areQsortsVerified);

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
      <GeneralButton
        onClick={handleOnClick}
        className={
          areQsortsVerified
            ? 'bg-primary-button h-[50px] w-[120px] text-[clamp(1.3rem,1.5vw,1.8rem)]'
            : 'bg-[orange] h-[50px] w-[120px] text-[clamp(1.3rem,1.5vw,1.8rem)]'
        }
      >
        <div>{t('Sorts Verified')}</div>
      </GeneralButton>
    );
  } else {
    return (
      <GeneralButton
        onClick={handleOnClick2}
        className={
          areQsortsVerified
            ? 'bg-primary-button h-[50px] w-[120px] text-[clamp(1.3rem,1.5vw,1.8rem)]'
            : 'bg-[orange] h-[50px] w-[120px] text-[clamp(1.3rem,1.5vw,1.8rem)]'
        }
      >
        <div>
          {t('Click after Verifying Sorts')}. {t('Unforced Q sorts')}:{` ${props.number}`}
        </div>
      </GeneralButton>
    );
  }
};

export default UnforcedSortsDisplayButton;
