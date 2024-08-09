import ReactFlow, { MarkerType } from 'reactflow';

const getEdges = (markerWidthVal, markerHeightVal, markerStrokeWidthVal) => {
  const test = '.80';

  const initialEdges = [
    {
      id: '1/1-2/1',
      source: '1-1',
      target: '2-1',
      label: `${test}`,
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
    {
      id: '1/1-2/2',
      source: '1-1',
      target: '2-2',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },

    {
      id: '2/1-3/1',
      source: '2-1',
      target: '3-1',
      label: '.65',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
    {
      id: '2/1-3/2',
      source: '2-1',
      target: '3-2',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
    {
      id: '2/2-3/2',
      source: '2-2',
      target: '3-2',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
    {
      id: '2/2-3/3',
      source: '2-2',
      target: '3-3',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
    {
      id: '3/1-4/1',
      source: '3-1',
      target: '4-1',
      label: '.65',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
    {
      id: '3/1-4/2',
      source: '3-1',
      target: '4-2',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
    {
      id: '3/2-4/2',
      source: '3-2',
      target: '4-2',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
    {
      id: '3/2-4/3',
      source: '3-2',
      target: '4-3',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },

    {
      id: '3/3-4/3',
      source: '3-3',
      target: '4-3',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
    {
      id: '3/3-4/4',
      source: '3-3',
      target: '4-4',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
    {
      id: '4/1-5/1',
      source: '4-1',
      target: '5-1',
      label: '.65',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
    {
      id: '4/1-5/2',
      source: '4-1',
      target: '5-2',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
    {
      id: '4/2-5/2',
      source: '4-2',
      target: '5-2',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
    {
      id: '4/2-5/3',
      source: '4-2',
      target: '5-3',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },

    {
      id: '4/3-5/3',
      source: '4-3',
      target: '5-3',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
    {
      id: '4/3-5/4',
      source: '4-3',
      target: '5-4',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },

    {
      id: '4/4-5/4',
      source: '4-4',
      target: '5-4',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
    {
      id: '4/4-5/5',
      source: '4-4',
      target: '5-5',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },

    {
      id: '5/1-6/1',
      source: '5-1',
      target: '6-1',
      label: '.65',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
    {
      id: '5/1-6/2',
      source: '5-1',
      target: '6-2',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
    {
      id: '5/2-6/2',
      source: '5-2',
      target: '6-2',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
    {
      id: '5/2-6/3',
      source: '5-2',
      target: '6-3',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },

    {
      id: '5/3-6/3',
      source: '5-3',
      target: '6-3',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
    {
      id: '5/3-6/4',
      source: '5-3',
      target: '6-4',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },

    {
      id: '5/4-6/4',
      source: '5-4',
      target: '6-4',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
    {
      id: '5/4-6/5',
      source: '5-4',
      target: '6-5',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
    {
      id: '5/5-6/5',
      source: '5-5',
      target: '6-5',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
    {
      id: '5/5-6/6',
      source: '5-5',
      target: '6-6',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
    {
      id: '6/1-7/1',
      source: '6-1',
      target: '7-1',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
    {
      id: '6/1-7/2',
      source: '6-1',
      target: '7-2',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
    {
      id: '6/1-7/3',
      source: '6-1',
      target: '7-1',
      label: '.35',
      type: 'straight',
      style: {
        strokeWidth: markerStrokeWidthVal,
        stroke: 'black',
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: markerWidthVal,
        height: markerHeightVal,
        color: 'black',
      },
    },
  ];
  return initialEdges;
};

export default getEdges;
