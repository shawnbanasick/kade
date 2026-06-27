import DownloadResultsAsExcel from './DownloadResultsAsExcel';
import DownloadResultsAsCsv from './DownloadResultsAsCsv';
import { useTranslation } from 'react-i18next';
import outputState from '../../GlobalState/outputState';
import DownloadDocxFile from './DownloadDocxFile';

const DownloadResultsButtons = () => {
  const { t } = useTranslation();
  // const showDownloadOutputButtons = outputState((state) => state.showDownloadOutputButtons);
  const displayOutputTabContent = outputState((state) => state.displayOutputTabContent);

  if (!displayOutputTabContent) {
    return (
      <h2 className="mt-12.5 text-2xl ml-12.5">
        {t('Select factors for output in the Options tab')}
      </h2>
    );
  }

  return (
    <>
      <div className="text-5xl mb-8">{t('Download Results')}</div>
      <div className={`h-[100px] mt-[30px] ${displayOutputTabContent ? 'visible' : 'hidden'}`}>
        <div className="w-fit text-[24px] mr-[5px] mt-0!">{t('Download complete output as')}</div>
        <div className="flex flex-row gap-[47px] items-center py-[10px] w-full h-[60px]">
          <DownloadResultsAsExcel />
          <DownloadResultsAsCsv />
          <DownloadDocxFile />
        </div>
      </div>
    </>
  );
};

export default DownloadResultsButtons;
