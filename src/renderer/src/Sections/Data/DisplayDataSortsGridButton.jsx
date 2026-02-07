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
    <div>
      <GeneralButton
        className="h-[50px] w-[120px]"
        id="SortsGridButton"
        onClick={handleClick}
        $isActive={isActive}
      >
        {t('Spreadsheet')}
      </GeneralButton>
    </div>
  );
};

export default DisplayDataSortsGridButton;
