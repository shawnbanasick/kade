import coreState from '../../GlobalState/coreState';

const determineNumberPCs = () => {
  // getState
  const totalNumberSorts = coreState.respondentNames.length;
  const numStatements = coreState.numStatements;

  const numFactorsCalcArray = [8, totalNumberSorts, numStatements];

  const numberPCsToExtract = Math.min(...numFactorsCalcArray);

  return numberPCsToExtract;
};

export default determineNumberPCs;
