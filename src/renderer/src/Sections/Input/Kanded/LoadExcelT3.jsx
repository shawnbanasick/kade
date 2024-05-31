import parseExcelType3 from './KandedLogic/parseExcelType3.js';
import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';
import LoadButton from '../DemoData/LoadButton';
import inputState from '../../GlobalState/inputState';
import appState from '../../GlobalState/appState';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import styled from 'styled-components';

// const { remote } = require('electron');
// const mainWindow = remote.getCurrentWindow();
// const { dialog } = require('electron').remote;

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
    <LoadButton $isActive={isLoadExcelT3ButtonGreen} onClick={() => handleClick()}>
      <LineContainer>
        <SvgContainer xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </SvgContainer>
        <p>{t('Load KADE XLSX File')}</p>
      </LineContainer>
    </LoadButton>
  );
};

export default LoadExcelT3;

const SvgContainer = styled.svg`
  transform: rotate(180deg);
  margin-right: 20px;
  height: 17px;
  width: 17px;
  fill: currentColor;
`;

const LineContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
