import parseExcelType2 from './parseExcelType2';
import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';
import throwDataAlreadyLoadedInputErrorModal from '../ErrorChecking/throwDataAlreadyLoadedInputErrorModal';
import NewLoadButton from '../../../Utils/NewLoadButton';
import inputState from '../../GlobalState/inputState';
import { useTranslation } from 'react-i18next';

const LoadExcelT2 = () => {
  const [t] = useTranslation();
  const isLoadExcelT2ButtonGreen = inputState.getState().isLoadExcelT2ButtonGreen;

  const handleClick = async () => {
    // check to see if data loaded and correlations started - true ==> throw error
    const isDataAlreadyLoaded = inputState.getState().isDataAlreadyLoaded;
    if (isDataAlreadyLoaded) {
      throwDataAlreadyLoadedInputErrorModal();
    } else {
      try {
        await window.electronAPI.openExcelFile();
        window.bridge.excelData((event, excelData) => {
          parseExcelType2(excelData);
          revertLoadButtonsColors('excelT2');
        });
      } catch (error) {
        // catch unknown input error
        inputState.errorMessage = t('There was an unexpected XSLX data input error');
        inputState.extendedErrorMessage = t('Check the format of the file and try again');
        inputState.errorStackTrace = t('no stack trace available');
        inputState.showErrorMessageBar = true;
      }
    }
  };

  return (
    <NewLoadButton
      className={`${isLoadExcelT2ButtonGreen ? 'bg-primary-button' : 'bg-grey-button'}`}
      onClick={handleClick}
    >
      <div
        id="ExcelT2LineContainer"
        className="flex flex-row justify-center items-center h-full w-full gap-3"
      >
        <svg
          id="ExcelT2SvgContainer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          className="rotate-180  h-[17px] w-[17px] fill-current"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <div className="font-sans text-lg font-bold">{t('Load Type 2 XLSX File')}</div>
      </div>
    </NewLoadButton>
  );
};

export default LoadExcelT2;
