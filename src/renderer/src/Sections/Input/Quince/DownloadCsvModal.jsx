import downloadCSVdata from './downloadCSVdata';
import LoadButton from '../DemoData/LoadButton';
import inputState from '../../GlobalState/inputState';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import CsvIcon from '../../images/CSV_Icon2.svg';

const DownloadCsvModal = () => {
  const { t } = useTranslation();
  const isJsonLoaded = inputState((state) => state.showJsonFileLoadedMessage);
  const updateShowErrorMessageBar = inputState((state) => state.updateShowErrorMessageBar);
  const updateExtendedErrorMessage = inputState((state) => state.updateExtendedErrorMessage);
  const updateErrorMessage = inputState((state) => state.updateErrorMessage);

  const handleClick = () => {
    if (isJsonLoaded) {
      downloadCSVdata();
    } else {
      updateShowErrorMessageBar(true);
      updateErrorMessage(i18n.t('No data to download'));
      updateExtendedErrorMessage(i18n.t('No data available for download'));
    }
  };

  return (
    <div className="[grid-column-start:3] [grid-row-start:1]">
      <LoadButton onClick={handleClick}>
        <div className="flex flex-row justify-center items-center h-full w-full">
          <div className="flex justify-center items-center mr-[10px]">
            <img src={CsvIcon} height="50px" alt="CSV Icon" />
          </div>
          {t('Download JSON Data')}
        </div>
      </LoadButton>
    </div>
  );
};

export default DownloadCsvModal;
