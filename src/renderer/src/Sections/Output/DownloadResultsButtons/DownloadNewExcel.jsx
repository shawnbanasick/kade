import downloadExcelDispatch from '../downloadExcelLogic/1_downloadExcelDispatch';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import XlsxIcon from '../../images/XLSX_Icon2.svg';
import outputState from '../../GlobalState/outputState';
import calcState from '../../GlobalState/calcState';
import cloneDeep from 'lodash/cloneDeep';
import coreState from '../../GlobalState/coreState';

const DownloadResultsAsExcel = () => {
  const { t } = useTranslation();
  const updateShowDocxOptions = outputState((state) => state.updateShowDocxOptions);
  const updateDownloadDocxButtonActive = outputState(
    (state) => state.updateDownloadDocxButtonActive
  );
  const userSelectedFactors = outputState((state) => state.userSelectedFactors);
  const dataXlsxPrep = calcState((state) => state.outputData);
  const dataXlsx = cloneDeep(dataXlsxPrep);
  const projectName = coreState((state) => state.projectName);
  const powerSetDiffsNumber = calcState((state) => state.powerSetDiffsNumber);

  console.log('dataXlsxPrep in DownloadResultsAsExcel:', dataXlsxPrep);

  //   console.log('dataXlsx in DownloadResultsAsExcel:', dataXlsx[0][0][0]);
  //   console.log('projectName in DownloadResultsAsExcel:', dataXlsx[0][2][0]);
  //   console.log('projectName in DownloadResultsAsExcel:', dataXlsx[0][2][1]);

  const handleClick = async () => {
    console.log('DownloadResultsAsExcel button clicked');
    if (userSelectedFactors.length === 0) {
      throw new Error('No factors selected');
      return;
    }

    const dataContent = {
      type: 'ExcelResults',
      data: dataXlsx,
      projectName: projectName,
      userSelectedFactors: userSelectedFactors,
      powerSetDiffsNumber: powerSetDiffsNumber,
    };

    const newBlob = new Blob([JSON.stringify(dataContent)], { type: 'text/plain' });
    const arrayBuffer = await new Response(newBlob).arrayBuffer();

    try {
      window.bridge.sendLargeData('large-data', arrayBuffer, 'path');
    } catch (error) {
      console.error('Failed to export Excel Results file:', error);
    }
    //   updateShowDocxOptions(false);
    //   updateDownloadDocxButtonActive(false);
    //   downloadExcelDispatch();
  };

  return (
    <GeneralButton
      id="downloadResultsAsExcelButton"
      onClick={handleClick}
      className="w-fit min-w-62.5  bg-grey-button"
    >
      <div className="flex flex-row justify-center items-center text-[22px]  h-full w-full">
        <div className="flex justify-center  items-center mr-2.5">
          <img src={XlsxIcon} alt="xlsx Icon" className="h-7.5" />
        </div>
        {t('Spreadsheet')}
      </div>
    </GeneralButton>
  );
};

export default DownloadResultsAsExcel;
