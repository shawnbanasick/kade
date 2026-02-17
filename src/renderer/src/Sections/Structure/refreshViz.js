import structureState from '../GlobalState/structureState';
import { MarkerType } from 'reactflow';

const refreshViz = () => {
  const newCutoff = structureState.getState().structureCorrelationThreshold; // ← match the correct state key
  const data = structureState.getState().responseArray;
  const initialEdges = [];

  // Group edges by source so we can alternate label offsets per source node
  const sourceCounters = {};

  data.forEach((item) => {
    const absValue = Math.abs(item[3]);
    const isNegative = item[3] < 0;

    if (absValue > newCutoff) {
      const source = item[1];

      // Track how many edges we've already added for this source
      if (sourceCounters[source] === undefined) sourceCounters[source] = 0;
      const edgeIndex = sourceCounters[source]++;

      // Alternate: even indices offset up (-12), odd indices offset down (+12)
      const labelOffset = edgeIndex % 2 === 0 ? -12 : 12;

      initialEdges.push({
        id: item[0],
        source,
        target: item[2],
        label: item[3].toString().replace('0.', '.'),
        type: 'straightWithLabel', // ← custom SVG-native label edge
        interactionWidth: 20,
        labelY: labelOffset,
        style: {
          strokeWidth: absValue > 0.9 ? 3 : 1.5,
          stroke: 'black',
          strokeDasharray: isNegative ? '6 3' : undefined,
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
