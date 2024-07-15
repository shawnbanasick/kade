import React from 'react';

import styled from 'styled-components';
import transposeMatrix from '../../../../Utils/transposeMatrix';
import calcuateSigCriterionValues from '../../varimaxLogic/2calculateSigCriterionValues';
import loadingsTableDataPrep from '../../../Loadings/LoadingsTable/loadingsTableDataPrep';
import GeneralButton from '../../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import rotationState from '../../../GlobalState/rotationState';
import projectHistoryState from '../../../GlobalState/projectHistoryState';
import factorState from '../../../GlobalState/factorState';
import loadingState from '../../../GlobalState/loadingState';
import resetSection6 from '../../../../Utils/resetSection6';

const SaveRotationButton = () => {
  const { t } = useTranslation();
  const rotationDegrees = rotationState((state) => state.rotationDegrees);
  const isDisabled = loadingState((state) => state.bipolarDisabled);
  const tempRotFacStateArray = rotationState((state) => state.tempRotFacStateArray);
  let abFactors = rotationState((state) => state.abFactors);
  const numFactors = rotationState((state) => state.numFactorsKeptForRot);
  let archiveCounter = rotationState((state) => state.archiveCounter);
  const projectHistoryArray = projectHistoryState((state) => state.projectHistoryArray);

  const updateRotationDegrees = rotationState((state) => state.updateRotationDegrees);
  const updateHighlightRotfactor1 = rotationState((state) => state.updateHighlightRotfactor1);
  const updateHighlightRotfactor2 = rotationState((state) => state.updateHighlightRotfactor2);
  const updateHighlightRotfactor3 = rotationState((state) => state.updateHighlightRotfactor3);
  const updateHighlightRotfactor4 = rotationState((state) => state.updateHighlightRotfactor4);
  const updateHighlightRotfactor5 = rotationState((state) => state.updateHighlightRotfactor5);
  const updateHighlightRotfactor6 = rotationState((state) => state.updateHighlightRotfactor6);
  const updateHighlightRotfactor7 = rotationState((state) => state.updateHighlightRotfactor7);
  const updateHighlightRotfactor8 = rotationState((state) => state.updateHighlightRotfactor8);
  const updateUserSelectedRotFactors = rotationState((state) => state.updateUserSelectedRotFactors);
  const updateAbFactors = rotationState((state) => state.updateAbFactors);
  const updateShowScatterPlotTableDiv = rotationState(
    (state) => state.updateShowScatterPlotTableDiv
  );
  const updateNotifyForSavedRotation = rotationState((state) => state.updateNotifyForSavedRotation);
  const updateFactorMatrix = factorState((state) => state.updateFactorMatrix);
  const updateArchiveCounter = rotationState((state) => state.updateArchiveCounter);
  const updateProjectHistoryArray = projectHistoryState((state) => state.updateProjectHistoryArray);

  const saveRotations = (e) => {
    e.stopPropagation();
    // moved here to give faster DOM update
    updateRotationDegrees(0);
    updateShowScatterPlotTableDiv(false);

    // replace current rot factor matrix with tempRotFacStateArray
    const factorA = abFactors[0];
    const factorB = abFactors[1];

    // update state before re-drawing loadings table
    const tempRotFacStateArray2 = transposeMatrix(tempRotFacStateArray);
    updateFactorMatrix(tempRotFacStateArray2);

    // calculate sig criterion values for loadings table initialization
    calcuateSigCriterionValues('noFlag');

    // initialize loadings table
    loadingsTableDataPrep(numFactors);

    // to archive current rot factor matrix
    archiveCounter += 1;
    const archiveName = `facMatrixArc${archiveCounter}`;
    updateArchiveCounter(archiveCounter);

    // send archive to storage to use with the undo function in Project History
    sessionStorage.setItem(archiveName, JSON.stringify(tempRotFacStateArray2));

    // update project history in dom and state
    const projectHistoryText = `${t('Factor')} ${factorA} ${t('and')} ${t(
      'Factor'
    )} ${factorB} ${t('rotation')} ${rotationDegrees} ${t('degrees')}`;
    const logMessageObj = {
      logMessage: projectHistoryText,
      logType: 'saveRotation',
    };
    projectHistoryArray.push(logMessageObj);

    // remove plot and table from DOM and update state
    const userSelectedRotFactors = [];
    abFactors = [];
    updateProjectHistoryArray(projectHistoryArray);
    updateHighlightRotfactor1(false);
    updateHighlightRotfactor2(false);
    updateHighlightRotfactor3(false);
    updateHighlightRotfactor4(false);
    updateHighlightRotfactor5(false);
    updateHighlightRotfactor6(false);
    updateHighlightRotfactor7(false);
    updateHighlightRotfactor8(false);
    updateUserSelectedRotFactors(userSelectedRotFactors);
    updateAbFactors(abFactors);
    updateShowScatterPlotTableDiv(false);

    // hide section 6
    resetSection6();

    updateNotifyForSavedRotation(true);
  };

  if (rotationDegrees !== 0) {
    return (
      <OrangeButton
        as={GeneralButton}
        id="saveRotationButtonOrange"
        onClick={saveRotations}
        disabled={isDisabled}
        className="wrapper2"
      >
        {' '}
        {t('Save Rotation')}
      </OrangeButton>
    );
  }
  return (
    <React.Fragment>
      <GeneralButton id="saveRotationButtonGray"> {t('Save Rotation')}</GeneralButton>
    </React.Fragment>
  );
};

export default SaveRotationButton;

const OrangeButton = styled.div`
  background-color: orange !important;
`;
