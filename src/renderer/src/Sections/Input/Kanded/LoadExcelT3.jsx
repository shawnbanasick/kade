import parseExcelType3 from './KandedLogic/parseExcelType3.js';
import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';
import NewLoadButton from '../../../Utils/NewLoadButton';
import inputState from '../../GlobalState/inputState';
import appState from '../../GlobalState/appState';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

const LoadExcelT3 = () => {
  const { t } = useTranslation();
  // getState
  const isLoadExcelT3ButtonGreen = inputState((state) => state.isLoadExcelT3ButtonGreen);
  const isDataAlreadyLoaded = inputState((state) => state.isDataAlreadyLoaded);
  const updateErrorMessage = inputState((state) => state.updateErrorMessage);
  const updateExtendedErrorMessage = inputState((state) => state.updateExtendedErrorMessage);
  const updateErrorStackTrace = inputState((state) => state.updateErrorStackTrace);
  const updateShowErrorMessageBar = inputState((state) => state.updateShowErrorMessageBar);
  const updateNotifyDataUploadSuccess = inputState((state) => state.updateNotifyDataUploadSuccess);
  const updateIsLoadExcelT3ButtonGreen = inputState(
    (state) => state.updateIsLoadExcelT3ButtonGreen
  );
  const updateIsInputButtonGreen = appState((state) => state.updateIsInputButtonGreen);
  const updateIsDataButtonGreen = appState((state) => state.updateIsDataButtonGreen);

  const handleClick = async () => {
    const trans1 = i18n.t('Data have already been loaded and the analysis has started');
    const trans2 = i18n.t('To clear this analysis and restart the application');
    const trans3 = i18n.t('click the Clear Project button near the bottom of the navigation panel');
    // check to see if data loaded and correlations started - true ==> throw error
    if (isDataAlreadyLoaded) {
      updateShowErrorMessageBar(true);
      updateErrorMessage(i18n.t('Data are already loaded click Clear Project to restart'));
      updateExtendedErrorMessage(`${trans1}. ${trans2}, ${trans3}.`);
      updateErrorStackTrace(i18n.t('no stack trace available'));
    } else {
      try {
        await window.electronAPI.openExcelFile();
        window.bridge.excelData((event, excelData) => {
          parseExcelType3(excelData);
          revertLoadButtonsColors('excelT3');
          updateNotifyDataUploadSuccess(true);
          updateIsLoadExcelT3ButtonGreen(true);
          updateIsInputButtonGreen(true);
          updateIsDataButtonGreen(true);
        });
      } catch (error) {
        // catch unknown input error
        updateErrorMessage(i18n.t('There was an unexpected XSLX data input error'));
        updateExtendedErrorMessage(i18n.t('Check the format of the file and try again'));
        updateErrorStackTrace(i18n.t('no stack trace available'));
        updateShowErrorMessageBar(true);
      }
    }
  };

  return (
    <NewLoadButton $isActive={isLoadExcelT3ButtonGreen} onClick={() => handleClick()}>
      <div
        id="ExcelT3LineContainer"
        className="flex flex-row justify-center items-center h-full w-full gap-3"
      >
        <svg
          id="ExcelT3SvgContainer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          className="rotate-180 mr-5 h-[17px] w-[17px] fill-current"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <div className="ml-5 font-sans text-lg font-bold">{t('Load KADE XLSX File')}</div>
      </div>
    </NewLoadButton>
  );
};

export default LoadExcelT3;
