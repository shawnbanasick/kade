import loadingState from '../GlobalState/loadingState';

const initializeLoadingState = () => {
  const updateAutoflagButtonColor = loadingState((state) => state.updateAutoflagButtonColor);
  const updateAutoFlagHistory = loadingState((state) => state.updateAutoFlagHistory);

  const updateBipolarDisabled = loadingState((state) => state.updateBipolarDisabled);
  const updateBipolarIndexArray = loadingState((state) => state.updateBipolarIndexArray);
  const updateBipolarSplitCount = loadingState((state) => state.updateBipolarSplitCount);

  const updateCurrentLoadingsTable = loadingState((state) => state.updateCurrentLoadingsTable);

  const updateFactorToInvert = loadingState((state) => state.updateFactorToInvert);
  const updateFactorToSplit = loadingState((state) => state.updateFactorToSplit);

  const updateGridColDefsLoadingsTable = loadingState(
    (state) => state.updateGridColDefsLoadingsTable
  );
  const updateGridRowDataLoadingsTable = loadingState(
    (state) => state.updateGridRowDataLoadingsTable
  );

  const updateHighlighting = loadingState((state) => state.updateHighlighting);

  const updateIsLoadingFactorsKept = loadingState((state) => state.updateIsLoadingFactorsKept);
  const updateIsLoadingAutoflag = loadingState((state) => state.updateIsLoadingAutoflag);
  const updateIsLoadingsTableInitialRender = loadingState(
    (state) => state.updateIsLoadingsTableInitialRender
  );

  const updateNotifyDataSentToOutputSuccess = loadingState(
    (state) => state.updateNotifyDataSentToOutputSuccess
  );

  const updateRespondentNamesMaxLength = loadingState(
    (state) => state.updateRespondentNamesMaxLength
  );
  const updateRequireMajorityCommonVariance = loadingState(
    (state) => state.updateRequireMajorityCommonVariance
  );

  const updateSendDataToOutputButtonColor = loadingState(
    (state) => state.updateSendDataToOutputButtonColor
  );
  const updateShowInvertFactorModal = loadingState((state) => state.updateShowInvertFactorModal);
  const updateShowLoadingsTable = loadingState((state) => state.updateShowLoadingsTable);
  const updateShowSplitFactorModal = loadingState((state) => state.updateShowSplitFactorModal);

  const updateBipolarFactorsArray = loadingState((state) => state.updateBipolarFactorsArray);
  const updateSplitFactorsArrayArchive = loadingState(
    (state) => state.updateSplitFactorsArrayArchive
  );
  const updateSplitFactorsArray = loadingState((state) => state.updateSplitFactorsArray);

  const updateUserSelectedSigLevel = loadingState((state) => state.updateUserSelectedSigLevel);


  updateAutoflagButtonColor("#d6dbe0");
  updateAutoFlagHistory([]);

  updateBipolarDisabled(false);
  updateBipolarIndexArray([]);
  updateBipolarSplitCount(0);

  updateCurrentLoadingsTable([]);

  updateFactorToInvert(undefined);
  updateFactorToSplit(undefined);

  updateGridColDefsLoadingsTable([]);
  updateGridRowDataLoadingsTable([]);

  updateHighlighting("grays");

  updateIsLoadingFactorsKept(false);
  updateIsLoadingAutoflag(false);
  updateIsLoadingsTableInitialRender(true);

  updateNotifyDataSentToOutputSuccess(false);

  updateRespondentNamesMaxLength(20);
  updateRequireMajorityCommonVariance(true);

  updateSendDataToOutputButtonColor("#d6dbe0");
  updateShowInvertFactorModal(false);
  updateShowLoadingsTable(false);
  updateShowSplitFactorModal(false);

  updateBipolarFactorsArray([]);
  updateSplitFactorsArrayArchive([]);

  updateUserSelectedSigLevel(1.96);

  

  loadingState.autoflagButtonColor = '#d6dbe0';
  loadingState.autoFlagHistory = [];

  loadingState.bipolarDisabled = false;
  loadingState.bipolarIndexArray = [];
  loadingState.bipolarSplitCount = 0;

  loadingState.currentLoadingsTable = [];

  loadingState.factorToInvert = 0;
  loadingState.factorToSplit = 0;

  loadingState.gridColDefsLoadingsTable = [];
  loadingState.gridRowDataLoadingsTable = [];

  loadingState.highlighting = 'grays';

  loadingState.isLoadingFactorsKept = false;
  loadingState.isLoadingAutoflag = false;
  loadingState.isLoadingsTableInitialRender = true;

  loadingState.notifyDataSentToOutputSuccess = false;

  loadingState.respondentNamesMaxLength = 20;
  loadingState.requireMajorityCommonVariance = true;

  loadingState.sendDataToOutputButtonColor = '#d6dbe0';
  loadingState.showInvertFactorModal = false;
  loadingState.showLoadingsTable = false;
  loadingState.showSplitFactorModal = false;

  loadingState.userSelectedSigLevel = 1.96;

  return;
};

export default initializeLoadingState;
