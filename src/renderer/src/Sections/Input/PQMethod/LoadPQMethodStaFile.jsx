import revertLoadButtonsColors from '../DemoData/revertLoadButtonsColors';
import numStatementsMatchErrorModal from '../ErrorChecking/numStatementsMatchErrorModal';
import coreState from '../../GlobalState/coreState';
import appState from '../../GlobalState/appState';
import inputState from '../../GlobalState/inputState';
import LoadButton from '../DemoData/LoadButton';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const LoadTxtStatementFile = () => {
  const { t } = useTranslation();
  const updateStatements = coreState((state) => state.updateStatements);
  const updateNotifyDataUploadSuccess = inputState((state) => state.updateNotifyDataUploadSuccess);
  const updateStatementsLoaded = inputState((state) => state.updateStatementsLoaded);
  // const areQsortsLoaded = inputState((state) => state.areQsortsLoaded);
  const updateIsLoadPqmethodTextButtonButtonGreen = inputState(
    (state) => state.updateIsLoadPqmethodTextButtonButtonGreen
  );
  const updateIsInputButtonGreen = appState((state) => state.updateIsInputButtonGreen);
  const updateIsDataButtonGreen = appState((state) => state.updateIsDataButtonGreen);
  const updateAreStatementsLoaded = inputState((state) => state.updateAreStatementsLoaded);

  // getState
  const isLoadPqmethodTextButtonButtonGreen = inputState(
    (state) => state.isLoadPqmethodTextButtonButtonGreen
  );
  const areQsortsLoaded = inputState((state) => state.areQsortsLoaded);
  const qSortPattern = coreState((state) => state.qSortPattern);

  const processBlob = (data) => {
    let isNoError = true;

    // split into lines
    const lines = data.split(/[\r\n]+/g);
    // remove empty strings
    const lines2 = lines.filter((e) => e === 0 || e);

    // getState
    if (areQsortsLoaded) {
      if (qSortPattern.length !== lines2.length) {
        isNoError = false;
        numStatementsMatchErrorModal();
      } else {
        updateStatementsLoaded(true);
      }
    }

    if (isNoError) {
      revertLoadButtonsColors('pqmethod');
      // update state
      updateStatements(lines2);
      updateStatementsLoaded(true);
      updateNotifyDataUploadSuccess(true);
      updateIsLoadPqmethodTextButtonButtonGreen(true);
      updateAreStatementsLoaded(true);

      updateIsInputButtonGreen(areQsortsLoaded);
      updateIsDataButtonGreen(areQsortsLoaded);
    }
  };

  const handleClick = async () => {
    await window.electronAPI.openFile();
    window.bridge.staData((event, staData) => {
      console.log('staData', staData);
      processBlob(staData);
    });
  };

  return (
    <LoadButton $isActive={isLoadPqmethodTextButtonButtonGreen} onClick={() => handleClick()}>
      <LineContainer>
        <SvgContainer xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </SvgContainer>
        <p>{t('Load STA File')}</p>
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
