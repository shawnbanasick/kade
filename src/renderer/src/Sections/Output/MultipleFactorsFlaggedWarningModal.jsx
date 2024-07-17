import { Button, Header, Modal } from 'semantic-ui-react';
import outputState from '../GlobalState/outputState';
import appState from '../GlobalState/appState';
import i18n from 'i18next';
import resetSection6 from '../../Utils/resetSection6';

const style1 = { display: 'flex', marginLeft: 140 };
const style2 = { alignSelf: 'flexStart' };
const style3 = { alignSelf: 'flexEnd', marginLeft: 300 };

const UnforcedWarningModal = () => {
  const showMultipleFactorsFlaggedWarningModal = outputState.showMultipleFactorsFlaggedWarningModal;
  const sortsFlaggedOnTwoFactors = outputState((state) => state.sortsFlaggedOnTwoFactors);
  const updateShowMultipleFactorsFlaggedWarningModal = outputState(
    (state) => state.updateShowMultipleFactorsFlaggedWarningModal
  );
  const btnId = outputState((state) => state.outputButtonsArray);

  function handleClose() {
    // hide section 6
    resetSection6();

    updateShowMultipleFactorsFlaggedWarningModal(false);

    // to clear active state from output buttons
    for (let i = 0; i < btnId.length; i += 1) {
      outputState[`highlightfactor${btnId[i]}`] = false;
    }
    appState.isOutputButtonGreen = false;
    outputState.showTableDataNotSentWarning = true;
  }

  function handleContinue() {
    outputState.showMultipleFactorsFlaggedWarningModal = false;
  }

  if (showMultipleFactorsFlaggedWarningModal) {
    return (
      <Modal
        dimmer={'blurring'}
        open={showMultipleFactorsFlaggedWarningModal}
        onClose={handleClose}
      >
        <Header content={`${i18n.t('Warning')}!`} />
        <Modal.Content>
          <span style={{ fontSize: 30, display: 'block' }}>
            {`${i18n.t('Q sorts flagged for more than one factor')}:`}
          </span>
          <span style={{ fontSize: 22, display: 'block' }}>{sortsFlaggedOnTwoFactors}</span>
        </Modal.Content>
        <Modal.Actions>
          <div style={style1}>
            <Button
              id="multipleFactorsFlaggedWarningModalGotItButton"
              color="orange"
              style={style2}
              floated="right"
              onClick={handleContinue}
              inverted
            >
              {i18n.t('Continue to Output')}
            </Button>
            <Button
              id="multipleFactorsFlaggedWarningModalGotItButton"
              color="orange"
              style={style3}
              floated="right"
              onClick={handleClose}
              inverted
            >
              {i18n.t('ReFlag Q sorts')}
            </Button>
          </div>
        </Modal.Actions>
      </Modal>
    );
  }
  return null;
};
export default UnforcedWarningModal;
