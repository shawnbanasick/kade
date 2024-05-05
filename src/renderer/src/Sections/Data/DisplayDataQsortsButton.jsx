import styled from 'styled-components';
import dataDisplayState from '../GlobalState/dataDisplayState';
import { useTranslation } from 'react-i18next';
import GeneralButton from './../../Utils/GeneralButton';

const DisplayDataQSortsButton = () => {
  const { t } = useTranslation();
  const isActive = dataDisplayState((state) => state.isShowQsortsButtonGreen);
  const updateShowQsorts = dataDisplayState((state) => state.updateShowQsorts);
  const updateShowQsortsSpreadsheet = dataDisplayState(
    (state) => state.updateShowQsortsSpreadsheet
  );
  const updateIsShowQsortsSpreadsheetButtonGreen = dataDisplayState(
    (state) => state.updateIsShowQsortsSpreadsheetButtonGreen
  );
  const updateIsShowQsortsButtonGreen = dataDisplayState(
    (state) => state.updateIsShowQsortsButtonGreen
  );

  const handleClick = () => {
    updateShowQsortsSpreadsheet(false);
    updateShowQsorts(true);
    updateIsShowQsortsSpreadsheetButtonGreen(false);
    updateIsShowQsortsButtonGreen(true);
  };

  return (
    <TradButton as={GeneralButton} id="qSortsButton" onClick={handleClick} $isActive={isActive}>
      {t('Q sorts')}
    </TradButton>
  );
};
export default DisplayDataQSortsButton;

const TradButton = styled.div`
  margin-left: 20px;
  margin-right: 5px;
`;
