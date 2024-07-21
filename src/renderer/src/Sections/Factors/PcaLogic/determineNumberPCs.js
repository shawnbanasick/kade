import coreState from '../../GlobalState/coreState';
import cloneDeep from 'lodash/cloneDeep';

const determineNumberPCs = () => {
  // getState
  const totalNumberSorts1 = cloneDeep(coreState.getState().respondentNames);
  const numStatements = coreState.getState().numStatements;

  const totalNumberSorts = totalNumberSorts1.length;
  const numFactorsCalcArray = [8, totalNumberSorts, numStatements];
  const numberPCsToExtract = Math.min(...numFactorsCalcArray);

  return numberPCsToExtract;
};

export default determineNumberPCs;
