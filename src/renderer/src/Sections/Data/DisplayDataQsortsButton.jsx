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
    <div>
      <GeneralButton
        className={`h-[30px] w-[120px] ${isActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        id="qSortsButton"
        onClick={handleClick}
      >
        {t('Q sorts')}
      </GeneralButton>
    </div>
  );
};

export default DisplayDataQSortsButton;
