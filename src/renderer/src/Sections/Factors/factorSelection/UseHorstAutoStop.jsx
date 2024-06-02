import React from 'react';
import styled from 'styled-components';
import GeneralButton from '../../../Utils/GeneralButton';
import factorState from '../../GlobalState/factorState';
import { useTranslation } from 'react-i18next';

const UseHorstAutoStop = () => {
  const { t } = useTranslation();

  // getState
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
      // shouldUseHorstLimit = true;
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

  if (showUseHorstLimit) {
    return (
      <React.Fragment>
        <HorstLimitContainerDiv>
          <TextSpan>
            {`${t('Use Horst limit to determine the number of factors to extract')}?  `}
          </TextSpan>
          <YesButton
            id={'yes'}
            onClick={handleClick}
            $isActive={horstAutoStopYesActive}
            disabled={horstAutoStopYesDisabled}
          >
            {t('Yes')}
          </YesButton>
          <NoButton
            id={'no'}
            onClick={handleClick}
            $isActive={horstAutoStopNoActive}
            disabled={horstAutoStopNoDisabled}
          >
            {t('No')}
          </NoButton>
        </HorstLimitContainerDiv>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default UseHorstAutoStop;

const HorstLimitContainerDiv = styled.div`
  display: flex;
  margin-top: 25px;
  margin-left: 70px;
  width: 800px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const YesButton = styled(GeneralButton)`
  width: 75px;
`;

const NoButton = styled(GeneralButton)`
  width: 75px;
`;

const TextSpan = styled.span`
  margin-right: 10px;
`;
