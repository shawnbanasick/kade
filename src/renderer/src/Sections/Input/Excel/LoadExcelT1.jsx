import parseExcelType1 from './parseExcelType1';
import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';
import throwDataAlreadyLoadedInputErrorModal from '../ErrorChecking/throwDataAlreadyLoadedInputErrorModal';
import LoadButton from '../DemoData/LoadButton';
import inputState from '../../GlobalState/inputState';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

// const { dialog } = require('electron').remote;
// const { remote } = require('electron');
// const mainWindow = remote.getCurrentWindow();

const LoadExcelT1 = () => {
  const { t } = useTranslation();
  // const isLoadExcelT1ButtonGreen = getInputState('isLoadExcelT1ButtonGreen');
  const isLoadExcelT1ButtonGreen = inputState((state) => state.isLoadExcelT1ButtonGreen);
  // const isDataAlreadyLoaded = getInputState('isDataAlreadyLoaded');
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
    <LoadButton $isActive={isLoadExcelT1ButtonGreen} onClick={handleClick}>
      <LineContainer>
        <SvgContainer xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </SvgContainer>
        <p>{t('Load Type 1 XLSX File')}</p>
      </LineContainer>
    </LoadButton>
  );
};

export default LoadExcelT1;

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
