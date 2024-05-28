import parseExcelType2 from './parseExcelType2';
import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';
import throwDataAlreadyLoadedInputErrorModal from '../ErrorChecking/throwDataAlreadyLoadedInputErrorModal';
import LoadButton from '../DemoData/LoadButton';
import inputState from '../../GlobalState/inputState';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const LoadTxtStatementFile = () => {
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
        window.bridgeExcel.excelData((event, excelData) => {
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
    <LoadButton $isActive={isLoadExcelT2ButtonGreen} onClick={handleClick}>
      <LineContainer>
        <SvgContainer xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </SvgContainer>
        <p>{t('Load Type 2 XLSX File')}</p>
      </LineContainer>
    </LoadButton>
  );
};

export default LoadTxtStatementFile;

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
