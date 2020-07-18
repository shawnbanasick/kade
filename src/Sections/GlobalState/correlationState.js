import { store } from "react-easy-state";

const correlationState = store({
  activeStartAnalysisButton: false,

  colMaxWidth: 0,
  correlationTableArray: [],
  correlation5Calcs: [],

  firstColMaxWidth: 0,

  gridColDefs: [],
  gridRowData: [],

  isLoadingBeginAnalysis: false,

  showCorrelationMatrix: false
});

export default correlationState;
