import correlationState from "../GlobalState/correlationState";

const initializeCorrelationState = () => {
  correlationState.activeStartAnalysisButton = false;

  correlationState.colMaxWidth = 0;
  correlationState.correlationTableArray = [];
  correlationState.correlation5Calcs = [];

  correlationState.firstColMaxWidth = 0;

  correlationState.gridColDefs = [];
  correlationState.gridRowData = [];

  correlationState.isLoadingBeginAnalysis = false;

  correlationState.showCorrelationMatrix = false;

  return;
};

export default initializeCorrelationState;
