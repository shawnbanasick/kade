import { update } from 'lodash';
import rotationState from '../GlobalState/rotationState';

const initializeRotationState = () => {
  const updateAbFactors = rotationState((state) => state.updateAbFactors);
  const updateArchiveCounter = rotationState((state) => state.updateArchiveCounter);
  const updateCalculateRotationsArray = rotationState(
    (state) => state.updateCalculateRotationsArray
  );
  const updateColMaxWidth = rotationState((state) => state.updateColMaxWidth);
  const updateD3RotChartData = rotationState((state) => state.updateD3RotChartData);
  const updateFSigCriterion = rotationState((state) => state.updateFSigCriterion);
  const updateFSigCriterionResults = rotationState((state) => state.updateFSigCriterionResults);

  const updateFactor1Active = rotationState((state) => state.updateFactor1Active);
  const updateFactor2Active = rotationState((state) => state.updateFactor2Active);
  const updateFactor3Active = rotationState((state) => state.updateFactor3Active);
  const updateFactor4Active = rotationState((state) => state.updateFactor4Active);
  const updateFactor5Active = rotationState((state) => state.updateFactor5Active);
  const updateFactor6Active = rotationState((state) => state.updateFactor6Active);
  const updateFactor7Active = rotationState((state) => state.updateFactor7Active);
  const updateFactor8Active = rotationState((state) => state.updateFactor8Active);

  const updateHighlightRotfactor1 = rotationState((state) => state.updateHighlightRotfactor1);
  const updateHighlightRotfactor2 = rotationState((state) => state.updateHighlightRotfactor2);
  const updateHighlightRotfactor3 = rotationState((state) => state.updateHighlightRotfactor3);
  const updateHighlightRotfactor4 = rotationState((state) => state.updateHighlightRotfactor4);
  const updateHighlightRotfactor5 = rotationState((state) => state.updateHighlightRotfactor5);
  const updateHighlightRotfactor6 = rotationState((state) => state.updateHighlightRotfactor6);
  const updateHighlightRotfactor7 = rotationState((state) => state.updateHighlightRotfactor7);
  const updateHighlightRotfactor8 = rotationState((state) => state.updateHighlightRotfactor8);

  const updateHighlightDegreeButton1 = rotationState((state) => state.updateHighlightDegreeButton1);
  const updateHighlightDegreeButton2 = rotationState((state) => state.updateHighlightDegreeButton2);
  const updateHighlightDegreeButton3 = rotationState((state) => state.updateHighlightDegreeButton3);
  const updateHighlightDegreeButton4 = rotationState((state) => state.updateHighlightDegreeButton4);
  const updateHighlightDegreeButton5 = rotationState((state) => state.updateHighlightDegreeButton5);
  const updateHighlightDegreeInputButton = rotationState(
    (state) => state.updateHighlightDegreeInputButton
  );

  const updateIsFacSelectDisabled = rotationState((state) => state.updateIsFacSelectDisabled);
  const updateIsCalculatingVarimax = rotationState((state) => state.updateIsCalculatingVarimax);

  const updateJudgeButtonActive = rotationState((state) => state.updateJudgeButtonActive);

  const updateNewRotationVectors = rotationState((state) => state.updateNewRotationVectors);
  const updateNotifyForSavedRotation = rotationState((state) => state.updateNotifyForSavedRotation);
  const updateNumFactorsKeptForRot = rotationState((state) => state.updateNumFactorsKeptForRot);

  const updateParticipantDataObject = rotationState((state) => state.updateParticipantDataObject);

  const updateRotateByDegrees = rotationState((state) => state.updateRotateByDegrees);
  const updateRowH2 = rotationState((state) => state.updateRowH2);
  const updateRotColDefsFactorTable = rotationState((state) => state.updateRotColDefsFactorTable);
  const updateRotRowDataFactorTable = rotationState((state) => state.updateRotRowDataFactorTable);
  const updateRotationActiveTabIndex = rotationState((state) => state.updateRotationActiveTabIndex);
  const updateRotationDegrees = rotationState((state) => state.updateRotationDegrees);

  const updateShouldDisplayFacKept = rotationState((state) => state.updateShouldDisplayFacKept);
  const updateShowRotFactorSelectWarning = rotationState(
    (state) => state.updateShowRotFactorSelectWarning
  );
  const updateShowKeepFacForRotButton = rotationState(
    (state) => state.updateShowKeepFacForRotButton
  );
  const updateShouldShowJudgeRotDiv = rotationState((state) => state.updateShouldShowJudgeRotDiv);
  const updateShowScatterPlotTableDiv = rotationState(
    (state) => state.updateShowScatterPlotTableDiv
  );
  const updateShowVarimaxHeywoodWarning = rotationState(
    (state) => state.updateShowVarimaxHeywoodWarning
  );

  const updateTempRotFacStateArray = rotationState((state) => state.updateTempRotFacStateArray);

  const updateUserSelectedRotFactors = rotationState((state) => state.updateUserSelectedRotFactors);

  const updateVarimaxButtonDisabled = rotationState((state) => state.updateVarimaxButtonDisabled);
  const updateVarimaxButtonText = rotationState((state) => state.updateVarimaxButtonText);
  const updateVarimaxButtonActive = rotationState((state) => state.updateVarimaxButtonActive);

  const updateVariContinueButtonActive = rotationState(
    (state) => state.updateVariContinueButtonActive
  );
  const updateVariContinueButtonDisabled = rotationState(
    (state) => state.updateVariContinueButtonDisabled
  );
  const updateVariAdjustButtonActive = rotationState((state) => state.updateVariAdjustButtonActive);
  const updateVariAdjustButtonDisabled = rotationState(
    (state) => state.updateVariAdjustButtonDisabled
  );
  const updateVariPqmAdjustButtonActive = rotationState(
    (state) => state.updateVariPqmAdjustButtonActive
  );
  const updateVariPqmAdjustButtonDisabled = rotationState(
    (state) => state.updateVariPqmAdjustButtonDisabled
  );

  updateAbFactors([]);
  updateArchiveCounter(0);
  updateCalculateRotationsArray([]);
  updateColMaxWidth(0);
  updateD3RotChartData([]);
  updateFSigCriterion([]);
  updateFSigCriterionResults([]);

  updateFactor1Active(false);
  updateFactor2Active(false);
  updateFactor3Active(false);
  updateFactor4Active(false);
  updateFactor5Active(false);
  updateFactor6Active(false);
  updateFactor7Active(false);
  updateFactor8Active(false);

  updateHighlightRotfactor1(false);
  updateHighlightRotfactor2(false);
  updateHighlightRotfactor3(false);
  updateHighlightRotfactor4(false);
  updateHighlightRotfactor5(false);
  updateHighlightRotfactor6(false);
  updateHighlightRotfactor7(false);
  updateHighlightRotfactor8(false);

  updateHighlightDegreeButton1(false);
  updateHighlightDegreeButton2(false);
  updateHighlightDegreeButton3(false);
  updateHighlightDegreeButton4(true);
  updateHighlightDegreeButton5(false);
  updateHighlightDegreeInputButton(false);

  updateIsFacSelectDisabled(false);
  updateIsCalculatingVarimax(false);

  updateJudgeButtonActive(false);

  updateNewRotationVectors([]);
  updateNotifyForSavedRotation(false);
  updateNumFactorsKeptForRot(undefined);

  updateParticipantDataObject(false);

  updateRotateByDegrees(10);
  updateRowH2([]);
  updateRotColDefsFactorTable([]);
  updateRotRowDataFactorTable([]);
  updateRotationActiveTabIndex(0);
  updateRotationDegrees(0);

  updateShouldDisplayFacKept(false);
  updateShowRotFactorSelectWarning(false);
  updateShowKeepFacForRotButton(false);
  updateShouldShowJudgeRotDiv(false);
  updateShowScatterPlotTableDiv(false);
  updateShowVarimaxHeywoodWarning(false);

  updateTempRotFacStateArray([]);

  updateUserSelectedRotFactors([]);

  updateVarimaxButtonDisabled(false);
  updateVarimaxButtonText('Varimax Rotation');
  updateVarimaxButtonActive(true);

  updateVariContinueButtonActive(false);
  updateVariContinueButtonDisabled(false);
  updateVariAdjustButtonActive(false);
  updateVariAdjustButtonDisabled(false);
  updateVariPqmAdjustButtonActive(false);
  updateVariPqmAdjustButtonDisabled(false);

  // clear stored factor matrix archives
  sessionStorage.clear();

  return;
};

export default initializeRotationState;
