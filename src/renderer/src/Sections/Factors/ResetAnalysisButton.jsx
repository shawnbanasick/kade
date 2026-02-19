import { useState } from 'react';
import GeneralButton from '../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
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

  const [modalOpen, setModalOpen] = useState(false);

  const projectHistoryArray = projectHistoryState((state) => state.projectHistoryArray);
  const updateProjectHistoryArray = projectHistoryState((state) => state.updateProjectHistoryArray);

  function handleOpen() {
    setModalOpen(true);
  }

  function handleClose() {
    setModalOpen(false);
  }

  function doResetAnalysis() {
    const newProjectHistoryArray = [...projectHistoryArray];
    let retainedObject = newProjectHistoryArray[0];
    updateProjectHistoryArray([retainedObject]);
    resetSection3();
    resetSection4();
    resetManualRotation();
    resetFacRotSelectButtons();
    resetBipolarFactors();
    resetSection5();
    resetSection6('resetAnalysis');
    resetAnalysis();
    handleClose();
  }

  return (
    <>
      {/* Trigger Button */}
      <GeneralButton
        id="resetAnalysisButton"
        className="bg-grey-button ml-[350px]!"
        onClick={handleOpen}
      >
        {t('Reset Analysis')}
      </GeneralButton>

      {/* Modal */}
      <dialog className={`modal ${modalOpen ? 'modal-open' : ''}`}>
        <div className="modal-box bg-gray-800 text-neutral-content h-[250px] w-[600px]">
          <div className="text-3xl text-center font-bold mb-4">{t('Reset Analysis')}?</div>
          <div className="mb-6">
            <p className="text-xl mb-2">
              {t('This will remove the current analysis and cannot be reversed')}
            </p>
            <p className="text-xl">{t('Are you sure you want to reset')}?</p>
          </div>
          <div className="flex justify-between gap-4">
            <GeneralButton onClick={handleClose} className="bg-primary-button">
              {t('No Go back')}
            </GeneralButton>
            <GeneralButton
              id="resetAnalysisModalGotItButton"
              onClick={doResetAnalysis}
              className="bg-orange-400 text-black"
            >
              {t('Yes reset the analysis')}
            </GeneralButton>
          </div>
        </div>
        {/* Backdrop close */}
        <form method="dialog" className="modal-backdrop">
          <button onClick={handleClose}>close</button>
        </form>
      </dialog>
    </>
  );
};

export default ResetAnalysisButton;
