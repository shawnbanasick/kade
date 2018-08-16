import store from "../../../store";

const determineNumberPCs = () => {
  const totalNumberSorts = store.getState("respondentNames").length;
  const numStatements = store.getState("numStatements");

  const numFactorsCalcArray = [8, totalNumberSorts, numStatements];

  const numberPCsToExtract = Math.min(...numFactorsCalcArray);

  return numberPCsToExtract;
};

export default determineNumberPCs;
