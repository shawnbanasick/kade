import { useState } from 'react';
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

  const [localStore, setLocalStore] = useState({ modalOpen: false, active: false });

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

  return (
    <Modal
      dimmer="blurring"
      trigger={
        <GeneralButton
          id="downloadResultsAsExcelButton"
          onClick={handleOpen}
          className="w-fit min-w-[250px]  bg-grey-button"
        >
          <div className="flex flex-row justify-center items-center text-[22px]  h-full w-full">
            <div className="flex justify-center  items-center mr-[10px]">
              <img src={XlsxIcon} alt="xlsx Icon" className="h-[30px]" />
            </div>
            {t('Spreadsheet')}
          </div>
        </GeneralButton>
      }
      open={localStore.modalOpen}
      onClose={handleClose}
      basic
      size="small"
    >
      <Header content={t('Analysis Output')} />
      <Modal.Content>
        <span className="text-[30px]">{t('Select the factors to output first')}</span>
      </Modal.Content>
      <Modal.Actions>
        <Button
          id="downloadResultsAsExcelModalGotItButton"
          size="huge"
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
