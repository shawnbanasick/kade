import loadingState from '../GlobalState/loadingState';

const initializeLoadingState = () => {
    loadingState.autoflagButtonColor = "#d6dbe0";
    loadingState.autoFlagHistory = [];
  
    loadingState.bipolarDisabled = false;
    loadingState.bipolarIndexArray = [];
    loadingState.bipolarSplitCount = 0;
  
    loadingState.currentLoadingsTable = [];
  
    loadingState.factorToInvert = 0;
    loadingState.factorToSplit = 0;
  
    loadingState.gridColDefsLoadingsTable = [];
    loadingState.gridRowDataLoadingsTable = [];
  
    loadingState.highlighting = "grays";
  
    loadingState.isLoadingFactorsKept = false;
    loadingState.isLoadingAutoflag = false;
    loadingState.isLoadingsTableInitialRender = true;
  
    loadingState.notifyDataSentToOutputSuccess = false;
  
    loadingState.respondentNamesMaxLength = 20;
    loadingState.requireMajorityCommonVariance = true;
  
    loadingState.sendDataToOutputButtonColor = "#d6dbe0";
    loadingState.showInvertFactorModal = false;
    loadingState.showLoadingsTable = false;
    loadingState.showSplitFactorModal = false;
  
    loadingState.userSelectedSigLevel = 1.96;
   

    return;
    
}

export default initializeLoadingState;