import coreState from '../../GlobalState/coreState';

const determineNumberPCs = () => {
  // getState
  const totalNumberSorts1 = coreState.getState().respondentNames;
  const totalNumberSorts = totalNumberSorts1.length;
  const numStatements = coreState.getState().numStatements;

  const numFactorsCalcArray = [8, totalNumberSorts, numStatements];

  const numberPCsToExtract = Math.min(...numFactorsCalcArray);

  return numberPCsToExtract;
};

export default determineNumberPCs;
