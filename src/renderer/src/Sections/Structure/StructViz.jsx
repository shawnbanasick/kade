import { useCallback, useMemo, useRef } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  ReactFlowProvider,
  Panel,
} from 'reactflow';
import * as htmlToImage from 'html-to-image';
import StraightEdgeWithLabel from './StraightEdgeWithLabel';
import EdgeLegend from './EdgeLegend';

const edgeTypes = { straightWithLabel: StraightEdgeWithLabel };
import 'reactflow/dist/style.css';
import getNodes from './getNodes';
import './reactFlow.css';
import structureState from '../GlobalState/structureState';
import UserNumberInput from './UserNumberInput';
import refreshViz from './refreshViz';

const paddingTopVal = 0;
const heightVal = 20;

const labelObj = {
  label11: '1-1',
  label21: '2-1',
  label22: '2-2',
  label31: '3-1',
};

const widthObj = {
  width11: 200,
  width21: 100,
  width22: 100,
  width31: 80,
  width32: 80,
  width33: 80,
  width41: 60,
  width42: 60,
  width43: 60,
  width44: 60,
  width51: 60,
  width52: 60,
  width53: 60,
  width54: 60,
  width55: 60,
  width61: 60,
  width62: 60,
  width63: 60,
  width64: 60,
  width65: 60,
  width66: 60,
  width71: 60,
  width72: 60,
  width73: 60,
  width74: 60,
  width75: 60,
  width76: 60,
  width77: 60,
  width81: 60,
  width82: 60,
  width83: 60,
  width84: 60,
  width85: 60,
  width86: 60,
  width87: 60,
  width88: 60,
};

// ─── Inner component — has access to useReactFlow ────────────────────────────
function FlowInner() {
  const flowRef = useRef(null);

  const edges = structureState((state) => state.initialEdges);
  const updateEdges = structureState((state) => state.updateInitialEdges);
  const structureCorrelationThreshold = structureState(
    (state) => state.structureCorrelationThreshold
  );
  const verticalSpacing = structureState((state) => state.verticalSpacing);
  const horizontalSpacing = structureState((state) => state.horizontalSpacing);

  const nodes = useMemo(
    () =>
      getNodes(labelObj, widthObj, paddingTopVal, heightVal, horizontalSpacing, verticalSpacing),
    [horizontalSpacing, verticalSpacing]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      const currentEdges = structureState.getState().initialEdges;
      updateEdges(applyEdgeChanges(changes, currentEdges));
    },
    [updateEdges]
  );

  const onEdgesDelete = useCallback(
    (deletedEdges) => {
      const currentEdges = structureState.getState().initialEdges;
      const deletedIds = new Set(deletedEdges.map((e) => e.id));
      updateEdges(currentEdges.filter((e) => !deletedIds.has(e.id)));
    },
    [updateEdges]
  );

  const handleCorrelationChange = useCallback((newValue) => {
    structureState.setState({ structureCorrelationThreshold: newValue });
    refreshViz();
  }, []);

  const handleVerticalSpacingChange = useCallback((newValue) => {
    structureState.setState({ verticalSpacing: newValue });
  }, []);

  const handleHorizontalSpacingChange = useCallback((newValue) => {
    structureState.setState({ horizontalSpacing: newValue });
  }, []);

  const handleDownloadSvg = useCallback(() => {
    const container = flowRef.current;
    if (!container) return;

    htmlToImage
      .toSvg(container, {
        skipFonts: true,
        skipAutoScale: true,
        backgroundColor: 'white',
        filter: (node) => {
          if (
            node?.classList?.contains('react-flow__minimap') ||
            node?.classList?.contains('react-flow__controls') ||
            node?.classList?.contains('react-flow__background')
          ) {
            return false;
          }
          if (node?.tagName === 'LINK' && node?.rel === 'stylesheet') {
            return false;
          }
          return true;
        },
      })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'structure-model.svg';
        link.click();
      })
      .catch((err) => {
        console.error('SVG export failed:', err);
      });
  }, []);

  return (
    <div ref={flowRef} className="relative w-full h-[800px] bg-white">
      <div className="flex flex-row gap-20 items-end">
        <UserNumberInput
          onChange={handleCorrelationChange}
          value={structureCorrelationThreshold}
          label="Correlation Cutoff"
          placeholder="Threshold"
          min={0}
          max={1}
          step={0.01}
          debounceMs={500}
          className="w-[60px]"
        />
        <UserNumberInput
          onChange={handleVerticalSpacingChange}
          value={verticalSpacing}
          label="Vertical Spacing"
          placeholder="Vertical Spacing"
          min={0}
          max={500}
          step={1}
          debounceMs={500}
          className="w-[60px]"
        />
        <UserNumberInput
          onChange={handleHorizontalSpacingChange}
          value={horizontalSpacing}
          label="Horizontal Spacing"
          placeholder="Horizontal Spacing"
          min={0}
          max={500}
          step={1}
          debounceMs={500}
          className="w-[60px]"
        />
        <button
          onClick={handleDownloadSvg}
          className="h-[22px] px-2.5 mb-1 text-xs bg-gray-100 border border-gray-300 rounded cursor-pointer whitespace-nowrap hover:bg-gray-200"
        >
          Download SVG
        </button>
      </div>
      <ReactFlow
        id="SvgNode"
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        onEdgesDelete={onEdgesDelete}
        deleteKeyCode={['Backspace', 'Delete']}
        elementsSelectable={true}
        edgesFocusable={true}
        edgesUpdatable={true}
        fitView
      >
        <Background />
        <Controls />
        <Panel position="top-right">
          <EdgeLegend />
        </Panel>
      </ReactFlow>
    </div>
  );
}

// ─── Outer wrapper — provides ReactFlowProvider context ──────────────────────
function Flow() {
  return (
    <ReactFlowProvider>
      <FlowInner />
    </ReactFlowProvider>
  );
}

export default Flow;
