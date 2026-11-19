import parseExcelType1 from './parseExcelType1';
import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';
import throwDataAlreadyLoadedInputErrorModal from '../ErrorChecking/throwDataAlreadyLoadedInputErrorModal';
import NewLoadButton from '../../../Utils/NewLoadButton';
import inputState from '../../GlobalState/inputState';
import { useTranslation } from 'react-i18next';

const DownloadExampleT1 = () => {
  const { t } = useTranslation();
  const isLoadExcelT1ButtonGreen = inputState((state) => state.isLoadExcelT1ButtonGreen);
  const isDataAlreadyLoaded = inputState((state) => state.isDataAlreadyLoaded);
  const updateErrorMessage = inputState((state) => state.updateErrorMessage);
  const updateExtendedErrorMessage = inputState((state) => state.updateExtendedErrorMessage);
  const updateErrorStackTrace = inputState((state) => state.updateErrorStackTrace);
  const updateShowErrorMessageBar = inputState((state) => state.updateShowErrorMessageBar);

  const handleClick = async () => {
    console.log('DownloadExampleT1 button clicked');

    const dataContent = {
      type: 'ExampleExcelT1',
    };

    const newBlob = new Blob([JSON.stringify(dataContent)], { type: 'text/plain' });
    const arrayBuffer = await new Response(newBlob).arrayBuffer();

    try {
      window.bridge.sendLargeData('large-data', arrayBuffer, 'path');
    } catch (error) {
      console.error('Failed to export Excel T1 Example file:', error);
    }
  };

  return (
    <NewLoadButton
      className={`w-87.5 h-18.75 rounded-lg bg-[#F0F0F0] hover:bg-[#E0E0E0] active:bg-[#D0D0D0]`}
      onClick={handleClick}
    >
      <div
        id="ExcelT1LineContainer"
        className="flex flex-row justify-center items-center h-full w-full gap-3"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        <div className="font-sans text-sm font-bold">{t('Download Type 1 Template')}</div>
      </div>
    </NewLoadButton>
  );
};

export default DownloadExampleT1;
