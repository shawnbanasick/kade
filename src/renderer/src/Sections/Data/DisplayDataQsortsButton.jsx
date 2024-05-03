import React from 'react';
import { view } from '@risingstack/react-easy-state';
import styled from 'styled-components';
import dataDisplayState from '../GlobalState/dataDisplayState';
import getDataDisplayState from '../GlobalState/getDataDisplayState';
import { useTranslation } from 'react-i18next';
import GeneralButton from './../../Utils/GeneralButton';

const DisplayDataQSortsButton = () => {
  const { t } = useTranslation();

  const handleClick = () => {
    dataDisplayState.showQsortsSpreadsheet = false;
    dataDisplayState.showQsorts = true;

    dataDisplayState.isShowQsortsSpreadsheetButtonGreen = false;
    dataDisplayState.isShowQsortsButtonGreen = true;
  };

  const isActive = getDataDisplayState('isShowQsortsButtonGreen');

  return (
    <TradButton as={GeneralButton} id="qSortsButton" onClick={handleClick} isActive={isActive}>
      {t('Q sorts')}
    </TradButton>
  );
};
export default view(DisplayDataQSortsButton);

const TradButton = styled.div`
  margin-left: 20px;
  margin-right: 5px;
`;
