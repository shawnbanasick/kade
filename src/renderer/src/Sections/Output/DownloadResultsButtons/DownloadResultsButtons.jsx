import { Transition } from 'semantic-ui-react';
import DownloadResultsAsExcel from './DownloadResultsAsExcel';
import DownloadResultsAsCsv from './DownloadResultsAsCsv';
import { useTranslation } from 'react-i18next';
import outputState from '../../GlobalState/outputState';
import DownloadDocxFile from './DownloadDocxFile';

const DownloadResultsButtons = () => {
  const { t } = useTranslation();
  const showDownloadOutputButtons = outputState((state) => state.showDownloadOutputButtons);

  return (
    <Transition visible={showDownloadOutputButtons} animation="fade" duration={1000}>
      <div className="h-[150px]">
        <div className="w-fit text-[24px] leading-[1.2] mr-[5px]">
          {t('Download complete output as')}
        </div>
        <div className="flex flex-row gap-[47px] items-center py-[20px] w-[1000px] h-[100px]">
          <DownloadResultsAsExcel />
          <DownloadResultsAsCsv />
          <DownloadDocxFile />
        </div>
      </div>
    </Transition>
  );
};

export default DownloadResultsButtons;
