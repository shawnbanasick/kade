import coreState from '../GlobalState/coreState';

const initializeCoreState = () => {
 
    coreState.csvData = [];
    coreState.jsonObj = {};
  
    coreState.mainDataObject = [];
    coreState.multiplierArray = [];
  
    coreState.numQsorts = 0;
    coreState.numStatements = 0;
  
    coreState.oldQsortPattern = [];
  
    coreState.projectName = "";
    coreState.qSortPattern = [];
    coreState.qSortPatternObject = {};
  
    coreState.respondentNames = [];
  
    coreState.statements = [];
    coreState.statementNumArray = [];
  
    coreState.sortsDisplayText = [];

    return;
    
}

export default initializeCoreState;