import downloadExcelDispatch from '../downloadExcelLogic/1_downloadExcelDispatch';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import XlsxIcon from '../../images/XLSX_Icon2.svg';
import outputState from '../../GlobalState/outputState';

const DownloadResultsAsExcel = () => {
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
      downloadExcelDispatch();
    }
  };

  return (
    <GeneralButton
      id="downloadResultsAsExcelButton"
      onClick={handleClick}
      className="w-fit min-w-[250px]  bg-grey-button"
    >
      <div className="flex flex-row justify-center items-center text-[22px]  h-full w-full">
        <div className="flex justify-center  items-center mr-[10px]">
          <img src={XlsxIcon} alt="xlsx Icon" className="h-[30px]" />
        </div>
        {t('Spreadsheet')}
      </div>
    </GeneralButton>
  );
};

export default DownloadResultsAsExcel;
