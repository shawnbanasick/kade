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
      className={`w-87.5 h-18.75 rounded-lg border-2 border-black bg-[#F0F0F0] hover:bg-[#E0E0E0] active:bg-[#D0D0D0]`}
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
          className="h-4.25 w-4.25 fill-current"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <div className="font-sans text-lg font-bold">{t('Download Type 1 Template')}</div>
      </div>
    </NewLoadButton>
  );
};

export default DownloadExampleT1;
