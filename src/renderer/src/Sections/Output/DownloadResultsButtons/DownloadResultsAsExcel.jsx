import { useState } from 'react';
import styled from 'styled-components';
import { Button, Header, Modal } from 'semantic-ui-react';
import downloadExcelDispatch from '../downloadExcelLogic/1_downloadExcelDispatch';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import XlsxIcon from '../../images/XLSX_Icon2.svg';
import outputState from '../../GlobalState/outputState';

const DownloadResultsAsExcel = () => {
  const { t } = useTranslation();
  const updateShowDocxOptions = outputState((state) => state.updateShowDocxOptions);
  const updateDownloadDocxButtonActive = outputState(
    (state) => state.updateDownloadDocxButtonActive
  );
  const userSelectedFactors = outputState((state) => state.userSelectedFactors);

  const [localStore, setLocalStore] = useState({
    modalOpen: false,
    active: false,
  });

  const handleOpen = () => {
    if (userSelectedFactors.length === 0) {
      setLocalStore({ modalOpen: true, active: false });
    } else {
      updateShowDocxOptions(false);
      updateDownloadDocxButtonActive(false);
      downloadExcelDispatch();
      setLocalStore({ modalOpen: false, active: true });
    }
  };

  const handleClose = () => {
    setLocalStore({ modalOpen: false, active: false });
  };

  const active = localStore.active;
  return (
    <Modal
      dimmer={'blurring'}
      trigger={
        <ExcelButton
          as={GeneralButton}
          id="downloadResultsAsExcelButton"
          $isActive={active}
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
