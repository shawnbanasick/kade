import DownloadResultsAsExcel from './DownloadResultsAsExcel';
import DownloadResultsAsCsv from './DownloadResultsAsCsv';
import { useTranslation } from 'react-i18next';
import outputState from '../../GlobalState/outputState';
import DownloadDocxFile from './DownloadDocxFile';

const DownloadResultsButtons = () => {
  const { t } = useTranslation();
  const showDownloadOutputButtons = outputState((state) => state.showDownloadOutputButtons);

  return (
    <div
      className={`h-[120px] transition-opacity duration-1000 ease-in-out ${
        showDownloadOutputButtons ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="w-fit text-[24px] leading-[1.2] mr-[5px]">
        {t('Download complete output as')}
      </div>
      <div className="flex flex-row gap-[47px] items-center py-[10px] w-full h-[80px]">
        <DownloadResultsAsExcel />
        <DownloadResultsAsCsv />
        <DownloadDocxFile />
      </div>
    </div>
  );
};

export default DownloadResultsButtons;
