import determineNumberPCs from '../Factors/PcaLogic/determineNumberPCs';
import correlationState from '../GlobalState/correlationState';
import cloneDeep from 'lodash/cloneDeep';
import PromiseWorker from 'promise-worker';
import structureState from '../GlobalState/structureState';
import { MarkerType } from 'reactflow';

const structureDispatch = () => {
  const X = cloneDeep(correlationState.getState().correlation5Calcs);
  const numberofPrincipalComps = determineNumberPCs();

  // dispatch webWorker
  const worker = new Worker(new URL('./webWorkerPca.js', import.meta.url), { type: 'module' });
  const promiseWorker = new PromiseWorker(worker);
  let initialEdges = [];

  // receive webWorker response
  promiseWorker
    .postMessage(JSON.stringify([X, numberofPrincipalComps]))
    .then(function (response) {
      console.log('response', JSON.stringify(response[0], null, 2));
      console.log('response', JSON.stringify(response[1], null, 2));

      response.forEach((item) => {
        if (Math.abs(item[3]) > 0.4) {
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
        structureState.setState({ initialEdges: initialEdges });
      });
    })
    .catch(function (error) {
      console.error(error);
      // handle error
    });
};

export default structureDispatch;
