import React from 'react';
import GeneralButton from '../../../Utils/GeneralButton';
import factorState from '../../GlobalState/factorState';
import { useTranslation } from 'react-i18next';

const UseHorstAutoStop = () => {
  const { t } = useTranslation();

  const showUseHorstLimit = factorState((state) => state.showUseHorstLimit);
  const horstAutoStopYesActive = factorState((state) => state.horstAutoStopYesActive);
  const horstAutoStopYesDisabled = factorState((state) => state.horstAutoStopYesDisabled);
  const horstAutoStopNoActive = factorState((state) => state.horstAutoStopNoActive);
  const horstAutoStopNoDisabled = factorState((state) => state.horstAutoStopNoDisabled);
  const updateShowUseHorstIterationSetup = factorState(
    (state) => state.updateShowUseHorstIterationSetup
  );
  const updateShowHorstIterationLimit = factorState((state) => state.updateShowHorstIterationLimit);
  const updateShowNumberOfCentroidFacToExtract = factorState(
    (state) => state.updateShowNumberOfCentroidFacToExtract
  );
  const updateHorstAutoStopYesActive = factorState((state) => state.updateHorstAutoStopYesActive);
  const updateHorstAutoStopYesDisabled = factorState(
    (state) => state.updateHorstAutoStopYesDisabled
  );
  const updateHorstAutoStopNoActive = factorState((state) => state.updateHorstAutoStopNoActive);
  const updateHorstAutoStopNoDisabled = factorState((state) => state.updateHorstAutoStopNoDisabled);

  const handleClick = (event) => {
    const id = event.target.id;
    if (id === 'yes') {
      updateHorstAutoStopYesActive(true);
      updateHorstAutoStopYesDisabled(true);
      updateHorstAutoStopNoDisabled(true);
      updateShowUseHorstIterationSetup(true);
    } else {
      updateShowHorstIterationLimit(true);
      updateHorstAutoStopYesDisabled(true);
      updateHorstAutoStopNoDisabled(true);
      updateHorstAutoStopNoActive(true);
      updateShowNumberOfCentroidFacToExtract(true);
    }
  };

  if (!showUseHorstLimit) return null;

  return (
    <React.Fragment>
      <div className="flex mt-10 ml-17.25 flex-row justify-start gap-3 items-center">
        <span className="mr-2.5">
          {`${t('Use Horst limit to determine the number of factors to extract')}?  `}
        </span>
        <GeneralButton
          id="useHorstLimitYesButton"
          onClick={handleClick}
          disabled={horstAutoStopYesDisabled}
          className={`w-18.75 ${horstAutoStopYesActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        >
          {t('Yes')}
        </GeneralButton>
        <GeneralButton
          id="useHorstLimitNoButton"
          onClick={handleClick}
          disabled={horstAutoStopNoDisabled}
          className={`w-18.75 ${horstAutoStopNoActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        >
          {t('No')}
        </GeneralButton>
      </div>
    </React.Fragment>
  );
};

export default UseHorstAutoStop;
