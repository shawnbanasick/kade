import { useState } from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import GeneralButton from '../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
// import factorState from '../GlobalState/factorState';
import projectHistoryState from '../GlobalState/projectHistoryState';
import resetManualRotation from '../../Utils/resetManualRotation';
import resetBipolarFactors from '../../Utils/resetBipolarFactors';
import resetAnalysis from '../../Utils/resetAnalysis';
import resetSection3 from '../../Utils/resetSection3';
import resetSection4 from '../../Utils/resetSection4';
import resetSection5 from '../../Utils/resetSection5';
import resetSection6 from '../../Utils/resetSection6';
import resetFacRotSelectButtons from '../../Utils/resetFacRotSelectButtons';

const ResetAnalysisButton = () => {
  const { t } = useTranslation();

  const [localStore, setLocalStore] = useState({
    modalOpen: false,
  });
  const projectHistoryArray = projectHistoryState((state) => state.projectHistoryArray);
  const updateProjectHistoryArray = projectHistoryState((state) => state.updateProjectHistoryArray);

  function handleOpen() {
    setLocalStore({ modalOpen: true });
  }

  function handleClose() {
    setLocalStore({ modalOpen: false });
  }

  function doResetAnalysis() {
    // reset Project History
    const newProjectHistoryArray = [...projectHistoryArray];
    let retainedObject = newProjectHistoryArray[0];
    updateProjectHistoryArray([retainedObject]);

    // hide section 3
    resetSection3();

    // hide section 4
    resetSection4();

    // reset manual rotation
    resetManualRotation();
    resetFacRotSelectButtons();

    // bipolar
    resetBipolarFactors();

    // hide section 5
    resetSection5();

    // hide section 6
    resetSection6('resetAnalysis');
    resetAnalysis();

    handleClose();
  }

  return (
    <Modal
      dimmer={'blurring'}
      trigger={
        <GeneralButton id="resetAnalysisButton" style={{ marginLeft: 275 }} onClick={handleOpen}>
          {t('Reset Analysis')}
        </GeneralButton>
      }
      open={localStore.modalOpen}
      onClose={handleClose}
      basic
      size="small"
    >
      <Header content="Reset Analysis" />
      <Modal.Content>
        <h2>{t('This will remove the current analysis and cannot be reversed')}</h2>
        <h2> {t('Are you sure you want to reset')}</h2>
      </Modal.Content>
      <Modal.Actions>
        <div style={{ display: 'flex' }}>
          <Button
            size={'big'}
            style={{ alignSelf: 'flexStart' }}
            color="green"
            onClick={handleClose}
            inverted
          >
            {t('No Go back')}
          </Button>
          <Button
            id="resetAnalysisModalGotItButton"
            size={'big'}
            style={{ alignSelf: 'flexEnd', marginLeft: 220 }}
            color="red"
            onClick={doResetAnalysis}
            inverted
          >
            {t('Yes reset the analysis')}
          </Button>
        </div>
      </Modal.Actions>
    </Modal>
  );
};

export default ResetAnalysisButton;
