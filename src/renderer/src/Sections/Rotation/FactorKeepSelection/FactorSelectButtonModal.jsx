import React, { useState } from 'react';
import loadingsTableDataPrep from '../../Loadings/LoadingsTable/loadingsTableDataPrep';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import rotationState from '../../GlobalState/rotationState';
import projectHistoryState from '../../GlobalState/projectHistoryState';
import loadingState from '../../GlobalState/loadingState';
import factorState from '../../GlobalState/factorState';

const FactorSelectButtonModal = () => {
  const { t } = useTranslation();

  const numFactorsKept = rotationState((state) => state.numFactorsKeptForRot);
  const projectHistoryArray = projectHistoryState((state) => state.projectHistoryArray);
  let splitFactorsArray = loadingState((state) => state.splitFactorsArray);
  const updateSplitFactorsArray = loadingState((state) => state.updateSplitFactorsArray);
  const updateSplitFactorsArrayArchive = loadingState(
    (state) => state.updateSplitFactorsArrayArchive
  );
  const updateProjectHistoryArray = projectHistoryState((state) => state.updateProjectHistoryArray);
  const updateIsLoadingFactorsKept = loadingState((state) => state.updateIsLoadingFactorsKept);
  const updateIsFacSelectDisabled = rotationState((state) => state.updateIsFacSelectDisabled);
  const updateShouldDisplayFacKept = rotationState((state) => state.updateShouldDisplayFacKept);
  const updateShowLoadingsTable = loadingState((state) => state.updateShowLoadingsTable);
  const updateArchiveCounter = rotationState((state) => state.updateArchiveCounter);
  let archiveCounter = rotationState((state) => state.archiveCounter);
  const factorMatrix = factorState((state) => state.factorMatrix);

  const [isActive, setIsActive] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const isFacSelectDisabled = rotationState((state) => state.isFacSelectDisabled);
  const showKeepFacForRotButton = rotationState((state) => state.showKeepFacForRotButton);

  const handleOpen = () => {
    if (isNaN(numFactorsKept)) {
      setModalOpen(true);
    } else {
      setIsActive(true);

      splitFactorsArray.length = +numFactorsKept;
      updateSplitFactorsArray([...splitFactorsArray]);
      updateSplitFactorsArrayArchive([...splitFactorsArray]);

      const projectHistoryText = `${i18n.t(
        'Number of factors selected for rotation'
      )}: ${numFactorsKept}`;

      projectHistoryArray.length = 2;

      const logMessageObj = {
        logMessage: projectHistoryText,
        logType: 'factorsSelected',
      };

      projectHistoryArray.push(logMessageObj);
      updateProjectHistoryArray(projectHistoryArray);

      updateIsLoadingFactorsKept(true);

      setTimeout(() => {
        loadingsTableDataPrep(numFactorsKept);
      }, 10);

      updateIsFacSelectDisabled(true);
      updateShouldDisplayFacKept(true);
      updateShowLoadingsTable(true);
      updateArchiveCounter(archiveCounter);

      archiveCounter += 1;
      const archiveName = `facMatrixArc${archiveCounter}`;
      sessionStorage.setItem(archiveName, JSON.stringify(factorMatrix));
    }
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  if (!showKeepFacForRotButton) return null;

  return (
    <>
      {/* Trigger Button */}
      <GeneralButton
        id="factorsKeptSubmitButton"
        disabled={isFacSelectDisabled}
        onClick={handleOpen}
        className={`${isActive ? 'bg-primary-button' : 'bg-grey-button'} h-[30px] p-2 min-w-[100px] ml-8!`}
      >
        {t('Submit')}
      </GeneralButton>

      {/* Modal */}
      <dialog className={`modal ${modalOpen ? 'modal-open' : ''}`}>
        <div className="modal-box bg-gray-800 text-neutral-content h-[250px] w-[600px]">
          <div className="text-3xl text-center font-bold mb-4">{t('Factor Rotation')}</div>
          <div className="mb-6">
            <p className="text-xl">
              {t('Please select the number of factors to keep for rotation')}
            </p>
          </div>
          <div className="flex justify-end">
            <GeneralButton
              id="FactorSelectModalGotItButton"
              onClick={handleClose}
              className="bg-primary-button"
            >
              {t('Got it')}
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

export default FactorSelectButtonModal;
