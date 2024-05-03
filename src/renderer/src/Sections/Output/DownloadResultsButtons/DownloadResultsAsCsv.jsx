import React from 'react';
import styled from 'styled-components';
import { view, store } from '@risingstack/react-easy-state';
import { Button, Header, Modal } from 'semantic-ui-react';
import downloadResultsAsCsv from '../downloadCsvLogic/downloadCsvOutputFile';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import getOutputState from '../../GlobalState/getOutputState';
import outputState from '../../GlobalState/outputState';
import CsvIcon from '../../images/CSV_Icon2.svg';

const localStore = store({
  modalOpen: false
});

const DownloadResultsAsCsv1 = () => {
  const { t } = useTranslation();

  const handleOpen = () => {
    // getState
    const userSelectedFactors = getOutputState('userSelectedFactors');
    if (userSelectedFactors.length === 0) {
      localStore.modalOpen = true;
    } else {
      outputState.showDocxOptions = false;
      outputState.downloadDocxButtonActive = false;
      downloadResultsAsCsv();
    }
  };

  const handleClose = () => {
    localStore.modalOpen = false;
  };

  const { active } = localStore;
  return (
    <Modal
      dimmer={'blurring'}
      trigger={
        <CsvButton
          as={GeneralButton}
          id="downloadResultsAsCsvButton"
          isActive={active}
          onClick={handleOpen}
        >
          <LineContainer>
            <SvgContainer>
              <img src={CsvIcon} height="50px" alt="csv Icon" />
            </SvgContainer>
            {t('Data')}
          </LineContainer>
        </CsvButton>
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
          id="downloadResultsAsCsvModalGotItButton"
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

export default view(DownloadResultsAsCsv1);

const CsvButton = styled.div`
  width: fit-content;
  min-width: 250px;
  //  margin-right: 20px;
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
