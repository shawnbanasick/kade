import downloadResultsAsCsv from '../downloadCsvLogic/downloadCsvOutputFile';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import CsvIcon from '../../images/CSV_Icon2.svg';
import outputState from '../../GlobalState/outputState';

const DownloadResultsAsCsv1 = () => {
  const { t } = useTranslation();
  const updateShowDocxOptions = outputState((state) => state.updateShowDocxOptions);
  const updateDownloadDocxButtonActive = outputState(
    (state) => state.updateDownloadDocxButtonActive
  );
  const userSelectedFactors = outputState((state) => state.userSelectedFactors);

  const handleClick = () => {
    if (userSelectedFactors.length === 0) {
      throw new Error('No factors selected');
    } else {
      updateShowDocxOptions(false);
      updateDownloadDocxButtonActive(false);
      downloadResultsAsCsv();
    }
  };

  return (
    <GeneralButton
      id="downloadResultsAsCsvButton"
      onClick={handleClick}
      className="w-fit min-w-[250px] bg-grey-button"
    >
      <div className="flex flex-row justify-center items-center text-[22px] h-full w-full">
        <div className="flex justify-center items-center mr-[10px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="h-[17px] w-[17px] fill-current"
          >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
        </div>
        {t('Text')}
      </div>
    </GeneralButton>
  );
};

export default DownloadResultsAsCsv1;
