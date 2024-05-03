import React from 'react';
import { view } from '@risingstack/react-easy-state';
import { Button, Header, Modal } from 'semantic-ui-react';
import outputState from '../GlobalState/outputState';
import appState from '../GlobalState/appState';
import i18n from 'i18next';
import getOutputState from '../GlobalState/getOutputState';

function handleClose() {
  outputState.shouldDisplayFactorVizOptions = false;
  outputState.showOutputFactorSelection = false;
  outputState.showFactorCorrelationsTable = false;
  outputState.showStandardErrorsDifferences = false;
  outputState.showFactorCharacteristicsTable = false;
  outputState.showDownloadOutputButtons = false;
  outputState.showDocxOptions = false;
  outputState.userSelectedFactors = [];
  outputState.displayFactorVisualizations = false;
  outputState.showMultipleFactorsFlaggedWarningModal = false;
  outputState.shouldDisplayFactorVizOptions = false;

  // to clear active state from output buttons
  const btnId = getOutputState('outputButtonsArray');
  for (let i = 0; i < btnId.length; i += 1) {
    outputState[`highlightfactor${btnId[i]}`] = false;
  }
  appState.isOutputButtonGreen = false;
  outputState.showTableDataNotSentWarning = true;
}

function handleContinue() {
  outputState.showMultipleFactorsFlaggedWarningModal = false;
}

const style1 = { display: 'flex', marginLeft: 140 };
const style2 = { alignSelf: 'flexStart' };
const style3 = { alignSelf: 'flexEnd', marginLeft: 300 };

const UnforcedWarningModal = () => {
  const showMultipleFactorsFlaggedWarningModal = outputState.showMultipleFactorsFlaggedWarningModal;
  const sortsFlaggedOnTwoFactors = getOutputState('sortsFlaggedOnTwoFactors');
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
export default view(UnforcedWarningModal);
