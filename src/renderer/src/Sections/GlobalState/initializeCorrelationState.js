import correlationState from '../GlobalState/correlationState';

const initializeCorrelationState = () => {
  const updateActiveStartAnalysisButton = correlationState(
    (state) => state.updateActiveStartAnalysisButton
  );

  const updateColMaxWidth = correlationState((state) => state.updateColMaxWidth);
  const updateCorrelationTableArray = correlationState(
    (state) => state.updateCorrelationTableArray
  );
  const updateCorrelation5Calcs = correlationState((state) => state.updateCorrelation5Calcs);

  const updateFirstColMaxWidth = correlationState((state) => state.updateFirstColMaxWidth);

  const updateGridColDefs = correlationState((state) => state.updateGridColDefs);
  const updateGridRowData = correlationState((state) => state.updateGridRowData);

  const updateIsLoadingBeginAnalysis = correlationState(
    (state) => state.updateIsLoadingBeginAnalysis
  );

  const updateShowCorrelationMatrix = correlationState(
    (state) => state.updateShowCorrelationMatrix
  );

  updateActiveStartAnalysisButton(false);

  updateColMaxWidth(0);
  updateCorrelationTableArray([]);
  updateCorrelation5Calcs([]);

  updateFirstColMaxWidth(0);

  updateGridColDefs([]);
  updateGridRowData([]);

  updateIsLoadingBeginAnalysis(false);

  updateShowCorrelationMatrix(false);

  return;
};

export default initializeCorrelationState;
