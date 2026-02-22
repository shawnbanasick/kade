import DownloadResultsAsExcel from './DownloadResultsAsExcel';
import DownloadResultsAsCsv from './DownloadResultsAsCsv';
import { useTranslation } from 'react-i18next';
import outputState from '../../GlobalState/outputState';
import DownloadDocxFile from './DownloadDocxFile';

const DownloadResultsButtons = () => {
  const { t } = useTranslation();
  const showDownloadOutputButtons = outputState((state) => state.showDownloadOutputButtons);

  return (
    <div className={`h-[100px] mt-[30px] ${showDownloadOutputButtons ? 'visible' : 'hidden'}`}>
      <div className="w-fit text-[24px] mr-[5px] mt-0!">{t('Download complete output as')}</div>
      <div className="flex flex-row gap-[47px] items-center py-[10px] w-full h-[60px]">
        <DownloadResultsAsExcel />
        <DownloadResultsAsCsv />
        <DownloadDocxFile />
      </div>
    </div>
  );
};

export default DownloadResultsButtons;
