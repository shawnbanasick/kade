import getCoreState from "../../GlobalState/getCoreState";

const determineNumberPCs = () => {
  // getState
  const totalNumberSorts1 = getCoreState("respondentNames");
  const totalNumberSorts = totalNumberSorts1.length;
  const numStatements = getCoreState("numStatements");

  const numFactorsCalcArray = [8, totalNumberSorts, numStatements];

  const numberPCsToExtract = Math.min(...numFactorsCalcArray);

  return numberPCsToExtract;
};

export default determineNumberPCs;
