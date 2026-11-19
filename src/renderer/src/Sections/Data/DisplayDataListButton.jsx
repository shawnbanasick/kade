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
  const updateShowQsortsList = dataDisplayState((state) => state.updateShowQsortsList);
  const isShowQsortsListButtonGreen = dataDisplayState(
    (state) => state.isShowQsortsListButtonGreen
  );
  const updateIsShowQsortsListButtonGreen = dataDisplayState(
    (state) => state.updateIsShowQsortsListButtonGreen
  );

  const handleClick = () => {
    console.log('DisplayDataQSortsButton clicked');
    updateShowQsortsSpreadsheet(false);
    updateShowQsorts(false);
    updateShowQsortsList(true);

    updateIsShowQsortsSpreadsheetButtonGreen(false);
    updateIsShowQsortsButtonGreen(false);
    updateIsShowQsortsListButtonGreen(true);
  };

  return (
    <div>
      <GeneralButton
        className={`h-[30px] w-[130px] ${isShowQsortsListButtonGreen ? 'bg-primary-button' : 'bg-grey-button'}`}
        id="qSortsButton"
        onClick={handleClick}
      >
        <div className="flex justify-center gap-2 items-center mr-2.5">
          <svg
            width="22"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
          {t('List')}
        </div>
      </GeneralButton>
    </div>
  );
};

export default DisplayDataQSortsButton;
