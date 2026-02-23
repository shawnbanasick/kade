import GeneralButton from '../../Utils/GeneralButton';
import appState from '../GlobalState/appState';
import { useTranslation } from 'react-i18next';
import inputState from '../GlobalState/inputState';
import calcMaxRespondentNameLength from '../Correlations/calcMaxRespondentNameLength';
import mainCorrCalcs from '../Correlations/correlationsLogic/mainCorrCalcs';
import structureDispatch from '../Structure/structureDispatch';
import coreState from '../GlobalState/coreState';

const UnforcedSortsDisplayButton = (props) => {
  const { t } = useTranslation();

  const updateAreQsortsVerified = inputState((state) => state.updateAreQsortsVerified);
  const updateIsDataButtonGreen = appState((state) => state.updateIsDataButtonGreen);
  const updateHasDataBeenConfirmed = appState((state) => state.updateHasDataBeenConfirmed);
  const updateShowExportButtons = inputState((state) => state.updateShowExportButtons);
  const updateIsForcedQsortPattern = inputState((state) => state.updateIsForcedQsortPattern);
  const areQsortsVerified = inputState((state) => state.areQsortsVerified);
  // correlation related
  const respondentNames = coreState((state) => state.respondentNames);
  const mainDataObject = coreState((state) => state.mainDataObject);

  const handleOnClick = async () => {
    updateAreQsortsVerified(true);
    updateIsDataButtonGreen(true);
    updateHasDataBeenConfirmed(true);
    updateShowExportButtons(true);
    updateIsForcedQsortPattern(true);
    // calculate correlations
    calcMaxRespondentNameLength(respondentNames);
    const rawSortsArray = mainDataObject.map((item) => item.rawSort);
    mainCorrCalcs(respondentNames, rawSortsArray);
    await structureDispatch();
  };
  const handleOnClick2 = async () => {
    updateAreQsortsVerified(true);
    updateIsDataButtonGreen(true);
    updateHasDataBeenConfirmed(true);
    updateShowExportButtons(true);
    updateIsForcedQsortPattern(false);
    // calculate correlations
    calcMaxRespondentNameLength(respondentNames);
    const rawSortsArray = mainDataObject.map((item) => item.rawSort);
    mainCorrCalcs(respondentNames, rawSortsArray);
    await structureDispatch();
  };

  if (props.number === 0) {
    return (
      <GeneralButton
        onClick={handleOnClick}
        className={
          areQsortsVerified
            ? 'bg-primary-button h-[30px] w-[270px] text-[clamp(1.3rem,1.5vw,1.8rem)]'
            : 'bg-[orange] h-[30px] w-[270px] text-[clamp(1.3rem,1.5vw,1.8rem)]'
        }
      >
        <div className="text-[clamp(0.5rem,1.5vw,1rem)] text-center leading-tight">{`${areQsortsVerified ? t('Sorts Verified') : t('Click after Verifying Q Sorts')}`}</div>
      </GeneralButton>
    );
  } else {
    return (
      <div className="flex flex-row gap-4">
        <GeneralButton
          onClick={handleOnClick2}
          className={
            areQsortsVerified
              ? 'bg-primary-button h-[30px] w-[270px] text-[clamp(1.3rem,1.5vw,1.8rem)]'
              : 'bg-[orange] h-[30px] w-[270px] text-[clamp(1.3rem,1.5vw,1.8rem)]'
          }
        >
          <div>
            {`${areQsortsVerified ? t('Sorts Verified') : t('Click after Verifying Q Sorts')}`}
          </div>
        </GeneralButton>
        <div className="flex flex-row items-center ml-8 text-2xl">
          {t('Unforced Q sorts')}:{` ${props.number}`}
        </div>
      </div>
    );
  }
};

export default UnforcedSortsDisplayButton;
