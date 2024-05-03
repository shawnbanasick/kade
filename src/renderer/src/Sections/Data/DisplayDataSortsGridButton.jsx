import React from 'react';
import { view } from '@risingstack/react-easy-state';
import styled from 'styled-components';
import dataDisplayState from '../GlobalState/dataDisplayState';
import getDataDisplayState from '../GlobalState/getDataDisplayState';
import { useTranslation } from 'react-i18next';

import GeneralButton from './../../Utils/GeneralButton';

const DisplayDataSortsGridButton = () => {
  const { t } = useTranslation();

  const handleClick = () => {
    console.log('clicked');

    dataDisplayState.showQsortsSpreadsheet = true;
    dataDisplayState.showQsorts = false;

    dataDisplayState.isShowQsortsSpreadsheetButtonGreen = true;
    dataDisplayState.isShowQsortsButtonGreen = false;
  };

  const isActive = getDataDisplayState('isShowQsortsSpreadsheetButtonGreen');

  return (
    <TradButton as={GeneralButton} id="SortsGridButton" onClick={handleClick} isActive={isActive}>
      {t('Spreadsheet')}
    </TradButton>
  );
};
export default view(DisplayDataSortsGridButton);

const TradButton = styled.div`
  margin-left: 5px;
  margin-right: 5px;
`;
