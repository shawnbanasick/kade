import styled from 'styled-components';
import dataDisplayState from '../GlobalState/dataDisplayState';
import { useTranslation } from 'react-i18next';

import GeneralButton from './../../Utils/GeneralButton';

const DisplayDataSortsGridButton = () => {
  const { t } = useTranslation();
  const updateShowQsortsSpreadsheet = dataDisplayState(
    (state) => state.updateShowQsortsSpreadsheet
  );
  const updateShowQsorts = dataDisplayState((state) => state.updateShowQsorts);
  const updateIsShowQsortsSpreadsheetButtonGreen = dataDisplayState(
    (state) => state.updateIsShowQsortsSpreadsheetButtonGreen
  );
  const updateIsShowQsortsButtonGreen = dataDisplayState(
    (state) => state.updateIsShowQsortsButtonGreen
  );

  const handleClick = () => {
    updateShowQsortsSpreadsheet(true);
    updateShowQsorts(false);
    updateIsShowQsortsSpreadsheetButtonGreen(true);
    updateIsShowQsortsButtonGreen(false);
  };

  const isActive = dataDisplayState((state) => state.isShowQsortsSpreadsheetButtonGreen);

  return (
    <TradButton as={GeneralButton} id="SortsGridButton" onClick={handleClick} $isActive={isActive}>
      {t('Spreadsheet')}
    </TradButton>
  );
};
export default DisplayDataSortsGridButton;

const TradButton = styled.div`
  margin-left: 5px;
  margin-right: 5px;
`;
