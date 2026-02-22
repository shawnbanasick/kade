import parseExcelType1 from './parseExcelType1';
import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';
import throwDataAlreadyLoadedInputErrorModal from '../ErrorChecking/throwDataAlreadyLoadedInputErrorModal';
import NewLoadButton from '../../../Utils/NewLoadButton';
import inputState from '../../GlobalState/inputState';
import { useTranslation } from 'react-i18next';

const LoadExcelT1 = () => {
  const { t } = useTranslation();
  const isLoadExcelT1ButtonGreen = inputState((state) => state.isLoadExcelT1ButtonGreen);
  const isDataAlreadyLoaded = inputState((state) => state.isDataAlreadyLoaded);
  const updateErrorMessage = inputState((state) => state.updateErrorMessage);
  const updateExtendedErrorMessage = inputState((state) => state.updateExtendedErrorMessage);
  const updateErrorStackTrace = inputState((state) => state.updateErrorStackTrace);
  const updateShowErrorMessageBar = inputState((state) => state.updateShowErrorMessageBar);

  const handleClick = async () => {
    // check to see if data loaded and correlations started - true ==> throw error
    if (isDataAlreadyLoaded) {
      throwDataAlreadyLoadedInputErrorModal();
    } else {
      try {
        await window.electronAPI.openExcelFile();
        window.bridge.excelData((event, excelData) => {
          parseExcelType1(excelData);
          revertLoadButtonsColors('excelT1');
        });
      } catch (error) {
        // catch unknown input error
        updateErrorMessage(t('There was an unexpected XLSX data input error'));
        updateExtendedErrorMessage(t('Check the format of the file and try again'));
        updateErrorStackTrace(t('no stack trace available'));
        updateShowErrorMessageBar(true);
      }
    }
  };

  return (
    <NewLoadButton
      className={`${isLoadExcelT1ButtonGreen ? 'bg-primary-button' : 'bg-grey-button'}`}
      onClick={handleClick}
    >
      <div
        id="ExcelT1LineContainer"
        className="flex flex-row justify-center items-center h-full w-full gap-3"
      >
        <svg
          id="ExcelT1SvgContainer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          className="rotate-180 h-[17px] w-[17px] fill-current"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <div className="font-sans text-lg font-bold">{t('Load Type 1 XLSX File')}</div>
      </div>
    </NewLoadButton>
  );
};

export default LoadExcelT1;
