import determineNumberPCs from '../Factors/PcaLogic/determineNumberPCs';
import correlationState from '../GlobalState/correlationState';
import cloneDeep from 'lodash/cloneDeep';
import PromiseWorker from 'promise-worker';
import structureState from '../GlobalState/structureState';
import { MarkerType } from 'reactflow';
import coreState from '../GlobalState/coreState';
import factorState from '../GlobalState/factorState';

const structureDispatch = () => {
  const X = cloneDeep(correlationState.getState().correlation5Calcs);
  const forcedAll = cloneDeep(correlationState.getState().forcedGraphDataAll);
  const forcedPos = cloneDeep(correlationState.getState().forcedGraphDataPos);
  const forcedNeg = cloneDeep(correlationState.getState().forcedGraphDataNeg);

  const totalStatements = coreState.getState().numStatements;
  const numberofPrincipalComps = determineNumberPCs();

  const mainDataObject = coreState.getState().mainDataObject;
  const sortsArray = mainDataObject.map((item) => item.rawSort);

  // dispatch STRUCTURE webWorker
  const worker = new Worker(new URL('./webWorkerPca.js', import.meta.url), { type: 'module' });
  const promiseWorker = new PromiseWorker(worker);
  let initialEdges = [];

  // receive webWorker response
  promiseWorker
    .postMessage(
      JSON.stringify([X, numberofPrincipalComps, totalStatements, forcedAll, forcedPos, forcedNeg])
    )
    .then(function (response) {
      let data = [...response[0]];
      let factorIndices = [...response[1]];
      let forcedPos = [...response[2]];
      let forcedNeg = [...response[3]];
      let forcedAll = [...response[4]];
      let explainedVarianceArrays = [...response[5]];

      data.forEach((item) => {
        if (Math.abs(item[3]) > 0.3) {
          let tempObj = {
            id: item[0],
            source: item[1],
            target: item[2],
            label: item[3].toString().replace('0.', '.'),
            type: 'straight',
            style: {
              strokeWidth: 1.5,
              stroke: 'black',
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 8,
              height: 8,
              color: 'black',
            },
          };
          initialEdges.push(tempObj);
        }
        structureState.setState({ responseArray: data });
        structureState.setState({ initialEdges: initialEdges });
        structureState.setState({ explainedVarianceArrays: explainedVarianceArrays });
        correlationState.setState({ factorIndices: factorIndices });
        correlationState.setState({ forcedGraphDataPos: forcedPos });
        correlationState.setState({ forcedGraphDataNeg: forcedNeg });
        correlationState.setState({ forcedGraphDataAll: forcedAll });
      });
    })
    .catch(function (error) {
      console.error(error);
      // handle error
    });

  // dispatch PARALLEL webWorker
  const worker2 = new Worker(new URL('./webWorkerParallel.js', import.meta.url), {
    type: 'module',
  });
  const promiseWorker2 = new PromiseWorker(worker2);

  promiseWorker2
    .postMessage(JSON.stringify(sortsArray))
    .then(function (response) {
      const means = [...response[1]];
      const p95 = [...response[2]];

      const meansDataArray = [];
      const p95DataArray = [];

      means.forEach((item, index) => {
        meansDataArray.push([index + 1, item]);
      });

      p95.forEach((item, index) => {
        p95DataArray.push([index + 1, item]);
      });

      factorState.setState({ parallelMeans: meansDataArray });
      factorState.setState({ parallel95: p95DataArray });
      structureState.setState({ hasParallelAnalysisFinished: true });
    })
    .catch(function (error) {
      console.error(error);
      // handle error
    });
};

export default structureDispatch;
