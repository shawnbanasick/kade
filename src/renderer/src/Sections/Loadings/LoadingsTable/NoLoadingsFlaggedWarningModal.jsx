import loadingState from '../../GlobalState/loadingState';
import outputState from '../../GlobalState/outputState';
import GeneralButton from '../../../Utils/GeneralButton';

const NoLoadingsFlaggedWarningModal = () => {
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

  if (!showNoLoadingsFlaggedWarningModal) return null;

  return (
    <dialog className={`modal ${showNoLoadingsFlaggedWarningModal ? 'modal-open' : ''}`}>
      <div className="modal-box bg-gray-800 text-neutral-content w-[600px]">
        <div className="text-3xl text-center font-bold mb-4">Error Checking</div>
        <div className="mb-6">
          <p className="text-2xl mb-4">A factor without a flagged loading was selected.</p>
          <p className="text-xl">Problem factors: {factorsWithoutLoading}</p>
        </div>
        <div className="flex justify-end">
          <GeneralButton
            id="noLoadingsFlaggedModalGotItButton"
            onClick={handleClose}
            className="bg-primary-button"
          >
            Got it
          </GeneralButton>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={handleClose}>close</button>
      </form>
    </dialog>
  );
};

export default NoLoadingsFlaggedWarningModal;
