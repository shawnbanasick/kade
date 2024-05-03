import React from 'react';
import { view, store } from '@risingstack/react-easy-state';
import mainCorrCalcs from './correlationsLogic/mainCorrCalcs';
import ErrorNotification from '../Input/ErrorChecking/ErrorNotification';
import calcMaxRespondentNameLength from './calcMaxRespondentNameLength';
import getCoreState from '../GlobalState/getCoreState';
import getAppState from '../GlobalState/getAppState';
import inputState from '../GlobalState/inputState';
import GeneralButton from '../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';

const localStore = store({
  isCorrelationsButtonGreen: false
});

const CalculateCorrelationsButton = () => {
  const { t } = useTranslation();

  const handleClick = () => {
    // State
    const respondentNames = getCoreState('respondentNames');

    if (respondentNames) {
      calcMaxRespondentNameLength(respondentNames);
      const mainDataObject = getCoreState('mainDataObject');
      const rawSortsArray = mainDataObject.map((item) => item.rawSort);
      mainCorrCalcs(respondentNames, rawSortsArray);
    } else {
      inputState.showErrorMessageBar = true;
      inputState.errorMessage = t('No data to calculate correlations');
    }
  };

  const isCorrelationsButtonGreen = getAppState('isCorrelationsButtonGreen');

  localStore.isCorrelationsButtonGreen = isCorrelationsButtonGreen;
  return (
    <React.Fragment>
      <GeneralButton isActive={localStore.isCorrelationsButtonGreen} onClick={() => handleClick()}>
        <p>{t('Calculate Correlations')}</p>
      </GeneralButton>
      <ErrorNotification />
    </React.Fragment>
  );
};

export default view(CalculateCorrelationsButton);
