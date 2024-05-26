import React from 'react';
import styled from 'styled-components';
import { view, store } from '@risingstack/react-easy-state';
import { Button, Header, Modal } from 'semantic-ui-react';
import downloadExcelDispatch from '../downloadExcelLogic/1_downloadExcelDispatch';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import getOutputState from '../../GlobalState/getOutputState';
import outputState from '../../GlobalState/outputState';
import XlsxIcon from '../../images/XLSX_Icon2.svg';

const localStore = store({
  modalOpen: false,
});

const handleOpen = () => {
  const userSelectedFactors = getOutputState('userSelectedFactors');

  if (userSelectedFactors.length === 0) {
    localStore.modalOpen = true;
  } else {
    outputState.showDocxOptions = false;
    outputState.downloadDocxButtonActive = false;
    downloadExcelDispatch();
  }
};

const handleClose = () => {
  localStore.modalOpen = false;
};

const DownloadResultsAsExcel = () => {
  const { t } = useTranslation();

  const { active } = localStore;
  return (
    <Modal
      dimmer={'blurring'}
      trigger={
        <ExcelButton
          as={GeneralButton}
          id="downloadResultsAsExcelButton"
          isActive={active}
          onClick={handleOpen}
        >
          <LineContainer>
            <SvgContainer>
              <img src={XlsxIcon} height="50px" alt="xlsx Icon" />
            </SvgContainer>
            {t('Spreadsheet')}
          </LineContainer>
        </ExcelButton>
      }
      open={localStore.modalOpen}
      onClose={handleClose}
      basic
      size="small"
    >
      <Header content={t('Analysis Output')} />
      <Modal.Content>
        <span style={{ fontSize: 30 }}>{t('Select the factors to output first')}</span>
      </Modal.Content>
      <Modal.Actions>
        <Button
          id="downloadResultsAsExcelModalGotItButton"
          size={'huge'}
          color="green"
          onClick={handleClose}
          inverted
        >
          {t('Got it')}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DownloadResultsAsExcel;

const ExcelButton = styled.div`
  width: fit-content;
  min-width: 250px;
  // margin-right: 20px;
`;

const LineContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const SvgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  margin-left: 10;
`;
