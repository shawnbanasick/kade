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
        className="h-[50px] w-[120px] bg-grey-button"
        id="qSortsButton"
        onClick={handleClick}
        $isActive={isActive}
      >
        {t('Q sorts')}
      </GeneralButton>
    </div>
  );
};

export default DisplayDataQSortsButton;
