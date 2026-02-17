import structureState from '../GlobalState/structureState';
import { MarkerType } from 'reactflow';

const refreshViz = () => {
  const newCutoff = structureState.getState().structureCorrelationThreshold; // ← match the correct state key
  const data = structureState.getState().responseArray;
  const initialEdges = [];

  data.forEach((item) => {
    if (Math.abs(item[3]) > newCutoff) {
      initialEdges.push({
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
      });
    }
  });

  structureState.setState({ initialEdges }); // ← moved outside the loop
};

export default refreshViz;
