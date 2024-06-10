import { Button, Header, Modal } from 'semantic-ui-react';
import loadingState from '../../GlobalState/loadingState';
import outputState from '../../GlobalState/outputState';

const NoLoadingsFlaggedWarningModal = () => {
  // getState
  const showNoLoadingsFlaggedWarningModal = outputState(
    (state) => state.showNoLoadingsFlaggedWarningModal
  );
  const factorsWithoutLoading = outputState((state) => state.factorsWithoutLoading);
  const updateShowNoLoadingsFlaggedWarningModal = outputState(
    (state) => state.updateShowNoLoadingsFlaggedWarningModal
  );
  const updateShowOutputFactorSelection = outputState(
    (state) => state.updateShowOutputFactorSelection
  );
  const updateShowFactorCorrelationsTable = outputState(
    (state) => state.updateShowFactorCorrelationsTable
  );
  const updateShowStandardErrorsDifferences = outputState(
    (state) => state.updateShowStandardErrorsDifferences
  );
  const updateShowFactorCharacteristicsTable = outputState(
    (state) => state.updateShowFactorCharacteristicsTable
  );
  const updateShowDownloadOutputButtons = outputState(
    (state) => state.updateShowDownloadOutputButtons
  );
  const updateShouldDisplayFactorVizOptions = outputState(
    (state) => state.updateShouldDisplayFactorVizOptions
  );
  const updateDisplayFactorVisualizations = outputState(
    (state) => state.updateDisplayFactorVisualizations
  );
  const updateShowDocxOptions = outputState((state) => state.updateShowDocxOptions);

  const updateSendDataToOutputButtonColor = loadingState(
    (state) => state.updateSendDataToOutputButtonColor
  );

  const handleClose = () => {
    updateShowNoLoadingsFlaggedWarningModal(false);
    updateShowOutputFactorSelection(false);
    updateShowFactorCorrelationsTable(false);
    updateShowStandardErrorsDifferences(false);
    updateShowFactorCharacteristicsTable(false);
    updateShowDownloadOutputButtons(false);
    updateShouldDisplayFactorVizOptions(false);
    updateDisplayFactorVisualizations(false);
    updateShowDocxOptions(false);
    updateSendDataToOutputButtonColor('#d6dbe0');
  };

  if (showNoLoadingsFlaggedWarningModal) {
    return (
      <Modal dimmer={'blurring'} open={showNoLoadingsFlaggedWarningModal} onClose={handleClose}>
        <Header content="Error Checking" />
        <Modal.Content>
          <span style={{ fontSize: 30, display: 'block' }}>
            A factor without a flagged loading was selected.
          </span>
          <span style={{ fontSize: 22, marginTop: 20, display: 'block' }}>
            Problem factors: {factorsWithoutLoading}
          </span>
        </Modal.Content>
        <Modal.Actions>
          <Button
            id="noLoadingsFlaggedModalGotItButton"
            color="green"
            style={{ margin: 15 }}
            floated="right"
            onClick={handleClose}
            inverted
          >
            Got it
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
  return null;
};
export default NoLoadingsFlaggedWarningModal;
