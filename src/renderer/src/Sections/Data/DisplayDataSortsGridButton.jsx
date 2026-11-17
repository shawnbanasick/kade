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
  const updateShowQsortsList = dataDisplayState((state) => state.updateShowQsortsList);
  const updateIsShowQsortsListButtonGreen = dataDisplayState(
    (state) => state.updateIsShowQsortsListButtonGreen
  );

  const handleClick = () => {
    updateShowQsortsSpreadsheet(true);
    updateShowQsorts(false);
    updateShowQsortsList(false);

    updateIsShowQsortsSpreadsheetButtonGreen(true);
    updateIsShowQsortsButtonGreen(false);
    updateIsShowQsortsListButtonGreen(false);
  };

  const isActive = dataDisplayState((state) => state.isShowQsortsSpreadsheetButtonGreen);

  return (
    <div>
      <GeneralButton
        className={`h-[30px] w-[120px] ${isActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        id="SortsGridButton"
        onClick={handleClick}
      >
        <div className="flex justify-center gap-2 items-center mr-2.5">
          <svg
            xmlns="http://w3.org"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="pb-0.5"
          >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path
              d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3H3V6z"
              fill="currentColor"
              stroke="none"
            />
            <line x1="3" y1="14.5" x2="21" y2="14.5" />
            <line x1="10" y1="9" x2="10" y2="20" />
          </svg>
          {t('Table')}
        </div>
      </GeneralButton>
    </div>
  );
};

export default DisplayDataSortsGridButton;
