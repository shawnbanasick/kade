import { useState } from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import initializeAppState from '../GlobalState/initializeAppState';
import initializeInputState from '../GlobalState/initializeInputState';
import initializeCorrelationState from '../GlobalState/initializeCorrelationState';
import initializeFactorState from '../GlobalState/initializeFactorState';
import initializeRotationState from '../GlobalState/initializeRotationState';
import initializeLoadingState from '../GlobalState/initializeLoadingState';
import initializeOutPutState from '../GlobalState/initializeOutputState';
import initializeProjectHistoryState from '../GlobalState/initializeProjectHistoryState';
import initializeVizState from '../GlobalState/initializeVizState';
import initializeCalcState from '../GlobalState/initializeCalcState';
import initializeCoreState from '../GlobalState/initializeCoreState';
import initializeDataDisplayState from '../GlobalState/initializeDataDisplayState';
import GeneralButton from '../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';

const ClearProjectModal = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  const projectClearedTrans = t('Project Cleared');

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const clearAnalysis = () => {
    setModalOpen(false);
    toast.success(projectClearedTrans);
    initializeInputState();
    initializeAppState();
    initializeCorrelationState();
    initializeDataDisplayState();
    initializeFactorState();
    initializeRotationState();
    initializeLoadingState();
    initializeOutPutState();
    initializeProjectHistoryState();
    initializeVizState();
    initializeCalcState();
    initializeCoreState();
  };

  return (
    <>
      <ToastContainer autoClose={2000} transition={Zoom} />

      {/* Trigger Button */}
      <GeneralButton onClick={handleOpen}>{t('Clear Project')}</GeneralButton>

      {/* Modal */}
      <dialog className={`modal ${modalOpen ? 'modal-open' : ''}`}>
        <div className="modal-box bg-gray-800 text-neutral-content w-[600px]">
          <div className="text-3xl text-center font-bold mb-4">{t('Clear Project')}</div>
          <div className="mb-6">
            <p className="text-xl mb-2">
              {t('Clearing the project will remove all data and analysis')}
            </p>
            <p className="text-xl mb-2">{t('This action cannot be reversed')}</p>
            <p className="text-xl">{t('Are you sure you want to clear the current project')}</p>
          </div>
          <div className="flex justify-between gap-4">
            <GeneralButton onClick={handleClose} className="bg-primary-button">
              {t('No Go Back')}
            </GeneralButton>
            <GeneralButton
              id="resetAnalysisModalGotItButton"
              onClick={clearAnalysis}
              className="bg-red-500 text-white"
            >
              {t('Yes delete the data and analysis')}
            </GeneralButton>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleClose}>close</button>
        </form>
      </dialog>
    </>
  );
};

export default ClearProjectModal;
