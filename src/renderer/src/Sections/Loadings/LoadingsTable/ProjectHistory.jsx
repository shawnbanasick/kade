import styled from 'styled-components';
import transposeMatrix from '../../../Utils/transposeMatrix';
import calculateCommunalities from '../../Rotation/varimaxLogic/2calculateCommunalities';
import calcuateSigCriterionValues from '../../Rotation/varimaxLogic/2calculateSigCriterionValues';
import loadingsTableDataPrep from '../LoadingsTable/loadingsTableDataPrep';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import rotationState from '../../GlobalState/rotationState';
import outputState from '../../GlobalState/outputState';
import loadingState from '../../GlobalState/loadingState';
import factorState from '../../GlobalState/factorState';
import projectHistoryState from '../../GlobalState/projectHistoryState';
import resetSection6 from '../../../Utils/resetSection6';
import resetManualRotation from '../../../Utils/resetManualRotation';
import resetVarimax from '../../../Utils/resetVarimax';

const ProjectHistory = () => {
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
    // getState - get counter and adjust value

    archiveCounter -= 1;
    const previousFacMatrixArchive = `facMatrixArc${archiveCounter}`;

    // getState - remove entry from project history
    const typeOfUndo3 = projectHistoryArray.pop();
    const typeOfUndo = typeOfUndo3.logType;

    // get the previous matrix from archive
    let previousFacMatrix = JSON.parse(sessionStorage.getItem(previousFacMatrixArchive));

    if (typeOfUndo === 'Bipolar') {
      previousFacMatrix = JSON.parse(sessionStorage.getItem('undoAllBipolarMatrix'));

      // let bipolarFactorsArray = getLoadingState("bipolarFactorsArray");

      // bipolarFactorsArray.pop();

      /*
      if (bipolarFactorsArray.length > 0) {
        bipolarFactorsArray.forEach((item, index) => {
          splitFactorsArray = splitFactorsArray.filter(
            object => object.value !== item
          );
        });
      }
      */

      const projectHistoryArrayLength = JSON.parse(
        sessionStorage.getItem('projectHistoryArrayLength')
      );

      // remove all listings of bipolar splits from history array
      projectHistoryArray.length = projectHistoryArrayLength;

      bipolarSplitCount = 0;
      archiveCounter -= 1;
    }

    // ************* Regular Undo

    // reset significance calculations
    const previousFacMatrix2 = transposeMatrix([...previousFacMatrix]);
    calculateCommunalities(previousFacMatrix2);
    calcuateSigCriterionValues('noFlag');

    // restore previous factor matrix to current factor matrix
    const updateFactorMatrix = factorState((state) => state.updateFactorMatrix);
    updateFactorMatrix(previousFacMatrix);

    // re-draw loadings table
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

      // hide section 6
      resetSection6();

      updateSendDataToOutputButtonColor('#d6dbe0');
      updateUserSelectedFactors([]);

      // reset manual rotation
      resetManualRotation();

      // reset varimax
      resetVarimax();
      return; // early return varimax undo
    }

    if (typeOfUndo === 'Selected') {
      updateArchiveCounter(archiveCounter);
      updateProjectHistoryArray(projectHistoryArray);

      // hide section 4
      updateShouldDisplayFacKept(false);
      updateVarimaxButtonDisabled(false);

      // reset manual rotation
      resetManualRotation();

      // hide section 5
      updateShowLoadingsTable(false);

      // hide section 6
      resetSection6();

      // reset send data button (loading state)
      updateSendDataToOutputButtonColor('#d6dbe0');
      return;
    }

    // default undo
    updateArchiveCounter(archiveCounter);
    updateBipolarSplitCount(bipolarSplitCount);
    updateProjectHistoryArray(projectHistoryArray);

    // hide section 6
    resetSection6();

    updateSendDataToOutputButtonColor('#d6dbe0');
    updateBipolarDisabled(false);
    updateBipolarIndexArray([]);
    // normal return
  };

  const shouldDisplayUndoButton = projectHistoryArray.length > 3;
  let mapCounter = 1;
  return (
    <MainContent>
      <TitleDiv>{t('Project Log')}</TitleDiv>
      <CustomOl>
        {projectHistoryArray.map((listValue, index) => (
          <li key={mapCounter++}>{listValue.logMessage}</li>
        ))}
      </CustomOl>
      {shouldDisplayUndoButton && (
        <UndoButton as={GeneralButton} id="undoButton" onClick={handleUndo}>
          {t('Undo Last Action')}
        </UndoButton>
      )}
    </MainContent>
  );
};

export default ProjectHistory;

const UndoButton = styled.div`
  margin-left: 40px;
  margin-top: 15px;
`;

const TitleDiv = styled.div`
  font-size: 28px;
  margin-bottom: 5px;
  margin-left: 20px;
  height: 35px;
  width: 400px;
`;

const CustomOl = styled.ol`
  margin-top: 2px;
  margin-bottom: 2px;
  font-size: 20px;
  line-height: 2em;
  width: 900px;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-template-columns: 1fr;
  justify-items: left;
  align-items: center;
  box-sizing: border-box;
  background-color: white;
  padding-bottom: 50px;
  padding-top: 50px;
  font-family: Helvetica, sans-serif;
  font-size: 18px;
  width: calc(100vw - 155);
  height: calc(100vh - 120);
`;
