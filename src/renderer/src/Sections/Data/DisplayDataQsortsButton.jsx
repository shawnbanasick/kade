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
  const updateIsShowQsortsListButtonGreen = dataDisplayState(
    (state) => state.updateIsShowQsortsListButtonGreen
  );

  const handleClick = () => {
    updateShowQsortsSpreadsheet(false);
    updateShowQsorts(true);
    updateShowQsortsList(false);

    updateIsShowQsortsSpreadsheetButtonGreen(false);
    updateIsShowQsortsListButtonGreen(false);
    updateIsShowQsortsButtonGreen(true);
  };

  return (
    <div>
      <GeneralButton
        className={`h-[30px] w-[130px] ${isActive ? 'bg-primary-button' : 'bg-grey-button'}`}
        id="qSortsButton"
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pb-0.5"
          >
            <rect x="3" y="4" width="2.5" height="5" rx="0.5" />
            <rect x="7.2" y="4" width="2.5" height="10" rx="0.5" />
            <rect x="11.4" y="4" width="2.5" height="15" rx="0.5" />
            <rect x="15.6" y="4" width="2.5" height="10" rx="0.5" />
            <rect x="19.8" y="4" width="2.5" height="5" rx="0.5" />
          </svg>
          {t('Grid')}
        </div>
      </GeneralButton>
    </div>
  );
};

export default DisplayDataQSortsButton;
