import React from 'react';
import mainCorrCalcs from './correlationsLogic/mainCorrCalcs';
import ErrorNotification from '../Input/ErrorChecking/ErrorNotification';
import calcMaxRespondentNameLength from './calcMaxRespondentNameLength';
import inputState from '../GlobalState/inputState';
import GeneralButton from '../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import coreState from '../GlobalState/coreState';
import appState from '../GlobalState/appState';

const CalculateCorrelationsButton = () => {
  const { t } = useTranslation();
  // Global State
  const respondentNames = coreState((state) => state.respondentNames);
  const mainDataObject = coreState((state) => state.mainDataObject);
  const updateShowErrorMessageBar = inputState((state) => state.updateShowErrorMessageBar);
  const updateErrorMessage = inputState((state) => state.updateErrorMessage);
  const isCorrelationsButtonGreen = appState((state) => state.isCorrelationsButtonGreen);

  const handleClick = () => {
    if (respondentNames) {
      calcMaxRespondentNameLength(respondentNames);
      const rawSortsArray = mainDataObject.map((item) => item.rawSort);
      mainCorrCalcs(respondentNames, rawSortsArray);
    } else {
      updateShowErrorMessageBar(true);
      updateErrorMessage(t('No data to calculate correlations'));
    }
  };

  return (
    <React.Fragment>
      <GeneralButton $isActive={isCorrelationsButtonGreen} onClick={() => handleClick()}>
        <p>{t('Calculate Correlations')}</p>
      </GeneralButton>
      <ErrorNotification />
    </React.Fragment>
  );
};

export default CalculateCorrelationsButton;
