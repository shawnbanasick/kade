import outputState from '../GlobalState/outputState';
import appState from '../GlobalState/appState';
import i18n from 'i18next';
import resetSection6 from '../../Utils/resetSection6';
import GeneralButton from '../../Utils/GeneralButton';

const UnforcedWarningModal = () => {
  const showMultipleFactorsFlaggedWarningModal = outputState(
    (state) => state.showMultipleFactorsFlaggedWarningModal
  );
  const sortsFlaggedOnTwoFactors = outputState((state) => state.sortsFlaggedOnTwoFactors);
  const updateShowMultipleFactorsFlaggedWarningModal = outputState(
    (state) => state.updateShowMultipleFactorsFlaggedWarningModal
  );
  const btnId = outputState((state) => state.outputButtonsArray);

  function handleClose() {
    resetSection6();
    updateShowMultipleFactorsFlaggedWarningModal(false);
    for (let i = 0; i < btnId.length; i += 1) {
      outputState[`highlightfactor${btnId[i]}`] = false;
    }
    appState.isOutputButtonGreen = false;
    outputState.showTableDataNotSentWarning = true;
  }

  function handleContinue() {
    outputState.showMultipleFactorsFlaggedWarningModal = false;
  }

  if (!showMultipleFactorsFlaggedWarningModal) return null;

  return (
    <dialog className={`modal ${showMultipleFactorsFlaggedWarningModal ? 'modal-open' : ''}`}>
      <div className="modal-box bg-gray-800 text-neutral-content w-[600px]">
        <div className="text-3xl text-center font-bold mb-4">{`${i18n.t('Warning')}!`}</div>
        <div className="mb-6">
          <p className="text-2xl mb-4">{`${i18n.t('Q sorts flagged for more than one factor')}:`}</p>
          <p className="text-xl">{sortsFlaggedOnTwoFactors}</p>
        </div>
        <div className="flex justify-between gap-4">
          <GeneralButton
            id="multipleFactorsFlaggedWarningModalContinueButton"
            onClick={handleContinue}
            className="bg-orange-400 text-black"
          >
            {i18n.t('Continue to Output')}
          </GeneralButton>
          <GeneralButton
            id="multipleFactorsFlaggedWarningModalReflagButton"
            onClick={handleClose}
            className="bg-orange-400 text-black"
          >
            {i18n.t('ReFlag Q sorts')}
          </GeneralButton>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={handleClose}>close</button>
      </form>
    </dialog>
  );
};

export default UnforcedWarningModal;
