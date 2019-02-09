import state from "../../../store";

const determineNumberPCs = () => {
  const totalNumberSorts = state.getState("respondentNames").length;
  const numStatements = state.getState("numStatements");

  console.log("respon names", totalNumberSorts);
  console.log("respon names", numStatements);

  const numFactorsCalcArray = [8, totalNumberSorts, numStatements];

  const numberPCsToExtract = Math.min(...numFactorsCalcArray);

  return numberPCsToExtract;
};

export default determineNumberPCs;
