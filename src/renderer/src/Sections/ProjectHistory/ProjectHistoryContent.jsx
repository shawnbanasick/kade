import transposeMatrix from '../../Utils/transposeMatrix';
import calculateCommunalities from '../Rotation/varimaxLogic/2calculateCommunalities';
import calcuateSigCriterionValues from '../Rotation/varimaxLogic/2calculateSigCriterionValues';
import loadingsTableDataPrep from '../Loadings/LoadingsTable/loadingsTableDataPrep';
import GeneralButton from '../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import rotationState from '../GlobalState/rotationState';
import outputState from '../GlobalState/outputState';
import loadingState from '../GlobalState/loadingState';
import factorState from '../GlobalState/factorState';
import projectHistoryState from '../GlobalState/projectHistoryState';
import resetSection6 from '../../Utils/resetSection6';
import resetManualRotation from '../../Utils/resetManualRotation';
import resetVarimax from '../../Utils/resetVarimax';

const ProjectHistoryContent = () => {
  const { t } = useTranslation();

  const updateSendDataToOutputButtonColor = loadingState(
    (state) => state.updateSendDataToOutputButtonColor
  );

  let archiveCounter = rotationState((state) => state.archiveCounter);
  const projectHistoryArray = projectHistoryState((state) => state.projectHistoryArray);
  const numFactors = rotationState((state) => state.numFactorsKeptForRot);
  let bipolarSplitCount = loadingState((state) => state.bipolarSplitCount);
  let splitFactorsArray = loadingState((state) => state.splitFactorsArrayArchive);

  const updateBipolarFactorsArray = loadingState((state) => state.updateBipolarFactorsArray);
  updateBipolarFactorsArray([]);
  const updateSplitFactorsArray = loadingState((state) => state.updateSplitFactorsArray);
  updateSplitFactorsArray([...splitFactorsArray]);
  const updateArchiveCounter = rotationState((state) => state.updateArchiveCounter);
  const updateProjectHistoryArray = projectHistoryState((state) => state.updateProjectHistoryArray);
  const updateShouldDisplayFacKept = rotationState((state) => state.updateShouldDisplayFacKept);
  const updateVarimaxButtonDisabled = rotationState((state) => state.updateVarimaxButtonDisabled);
  const updateBipolarSplitCount = loadingState((state) => state.updateBipolarSplitCount);
  const updateUserSelectedFactors = outputState((state) => state.updateUserSelectedFactors);
  const updateShowLoadingsTable = loadingState((state) => state.updateShowLoadingsTable);
  const updateBipolarDisabled = loadingState((state) => state.updateBipolarDisabled);
  const updateBipolarIndexArray = loadingState((state) => state.updateBipolarIndexArray);

  const handleUndo = () => {
    archiveCounter -= 1;
    const previousFacMatrixArchive = `facMatrixArc${archiveCounter}`;

    const typeOfUndo3 = projectHistoryArray.pop();
    const typeOfUndo = typeOfUndo3.logType;

    let previousFacMatrix = JSON.parse(sessionStorage.getItem(previousFacMatrixArchive));

    if (typeOfUndo === 'Bipolar') {
      previousFacMatrix = JSON.parse(sessionStorage.getItem('undoAllBipolarMatrix'));

      const projectHistoryArrayLength = JSON.parse(
        sessionStorage.getItem('projectHistoryArrayLength')
      );

      projectHistoryArray.length = projectHistoryArrayLength;
      bipolarSplitCount = 0;
      archiveCounter -= 1;
    }

    const previousFacMatrix2 = transposeMatrix([...previousFacMatrix]);
    calculateCommunalities(previousFacMatrix2);
    calcuateSigCriterionValues('noFlag');

    const updateFactorMatrix = factorState((state) => state.updateFactorMatrix);
    updateFactorMatrix(previousFacMatrix);

    loadingsTableDataPrep(numFactors);

    if (typeOfUndo === 'Varimax') {
      const updateProjectHistoryArray = projectHistoryState(
        (state) => state.updateProjectHistoryArray
      );
      updateProjectHistoryArray(projectHistoryArray);
      const updateArchiveCounter = rotationState((state) => state.updateArchiveCounter);
      updateArchiveCounter(archiveCounter);
      const updateVarimaxButtonActive = rotationState((state) => state.updateVarimaxButtonActive);
      updateVarimaxButtonActive(false);
      const updateVarimaxButtonText = rotationState((state) => state.updateVarimaxButtonText);
      updateVarimaxButtonText('Varimax Rotation');
      const updateVarimaxButtonDisabled = rotationState(
        (state) => state.updateVarimaxButtonDisabled
      );
      updateVarimaxButtonDisabled(false);
      resetSection6();
      updateSendDataToOutputButtonColor('#d6dbe0');
      updateUserSelectedFactors([]);
      resetManualRotation();
      resetVarimax();
      return;
    }

    if (typeOfUndo === 'Selected') {
      updateArchiveCounter(archiveCounter);
      updateProjectHistoryArray(projectHistoryArray);
      updateShouldDisplayFacKept(false);
      updateVarimaxButtonDisabled(false);
      resetManualRotation();
      updateShowLoadingsTable(false);
      resetSection6();
      updateSendDataToOutputButtonColor('#d6dbe0');
      return;
    }

    updateArchiveCounter(archiveCounter);
    updateBipolarSplitCount(bipolarSplitCount);
    updateProjectHistoryArray(projectHistoryArray);
    resetSection6();
    updateSendDataToOutputButtonColor('#d6dbe0');
    updateBipolarDisabled(false);
    updateBipolarIndexArray([]);
  };

  const shouldDisplayUndoButton = projectHistoryArray.length > 3;
  let mapCounter = 1;

  return (
    <div className="grid grid-rows-[100px_1fr] grid-cols-1 text-black justify-items-start items-center box-border bg-white pb-[10px] pt-[10px] font-[Helvetica,sans-serif] text-[18px]  border-l border-red-500">
      <div className="text-[28px]  ml-[50px] h-[35px] w-[400px] border-2 border-red-500">
        {t('Project Log')}
      </div>
      <ol className="text-[20px] list-decimal ml-[70px] leading-[2em] w-[900px] border-2 border-red-500">
        {projectHistoryArray.map((listValue) => (
          <li key={mapCounter++}>{listValue.logMessage}</li>
        ))}
      </ol>
      {shouldDisplayUndoButton && (
        <div className="ml-[40px] mt-[15px]">
          <GeneralButton id="undoButton" onClick={handleUndo} className="bg-grey-button">
            {t('Undo Last Action')}
          </GeneralButton>
        </div>
      )}
    </div>
  );
};

export default ProjectHistoryContent;
