import { useCallback, useMemo, useRef, useState } from 'react';
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
import exportToDrawio from './exportToDrawio';

// adjust text padding in nodes
const paddingTopVal = 8;
const heightVal = 20;

const labelObj = {
  label11: '1-1',
  label21: '2-1',
  label22: '2-2',
  label31: '3-1',
};

const constantWidthObj = {
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

// Convert explained variance array to width object
// Input: [[26],[25,23],[22,23,19],...] where each subarray is a row
// Output: { width11: X, width21: Y, width22: Z, ... }
const computeVarianceWidths = (explainedVarianceArrays, scaleFactor = 3) => {
  if (!explainedVarianceArrays || explainedVarianceArrays.length === 0) {
    return constantWidthObj;
  }

  const widthObj = {};
  const minWidth = 30; // minimum node width
  const maxWidth = 250; // maximum node width

  explainedVarianceArrays.forEach((row, rowIdx) => {
    const rowNum = rowIdx + 1;
    row.forEach((variance, colIdx) => {
      const colNum = colIdx + 1;
      const key = `width${rowNum}${colNum}`;
      // Scale variance (0-100) to width range
      const width = Math.max(minWidth, Math.min(maxWidth, variance * scaleFactor));
      widthObj[key] = Math.round(width);
    });
  });

  return widthObj;
};

// ─── Inner component — has access to useReactFlow ────────────────────────────
function FlowInner() {
  const flowRef = useRef(null);
  const [nodeSizeMode, setNodeSizeMode] = useState('constant'); // 'constant' or 'variance'
  const [varianceScaleFactor, setVarianceScaleFactor] = useState(5); // default scaling

  const edges = structureState((state) => state.initialEdges);
  const updateEdges = structureState((state) => state.updateInitialEdges);
  const structureCorrelationThreshold = structureState(
    (state) => state.structureCorrelationThreshold
  );
  const verticalSpacing = structureState((state) => state.verticalSpacing);
  const horizontalSpacing = structureState((state) => state.horizontalSpacing);
  const explainedVarianceArrays = structureState((state) => state.explainedVarianceArrays);

  // Compute width object based on mode
  const widthObj = useMemo(() => {
    if (nodeSizeMode === 'variance') {
      return computeVarianceWidths(explainedVarianceArrays, varianceScaleFactor);
    }
    return constantWidthObj;
  }, [nodeSizeMode, explainedVarianceArrays, varianceScaleFactor]);

  const nodes = useMemo(
    () =>
      getNodes(labelObj, widthObj, paddingTopVal, heightVal, horizontalSpacing, verticalSpacing),
    [widthObj, horizontalSpacing, verticalSpacing]
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
            node?.classList?.contains('react-flow__background') ||
            node?.classList?.contains('react-flow__panel-top')
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

  const handleDownloadDrawio = useCallback(() => {
    const drawioXml = exportToDrawio(nodes, edges);
    const blob = new Blob([drawioXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'structure-model.drawio';
    link.click();
    URL.revokeObjectURL(url);
  }, [nodes, edges]);

  return (
    <div ref={flowRef} className="relative w-full h-[800px] bg-white">
      <div className="flex flex-row gap-20 items-end react-flow__panel-top">
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

        {/* Node Size Mode Select */}
        <div className="form-control flex flex-col p-0 pt-0 mr-0 border-2 border-red-500">
          <label className="label mb-1 mt-1">
            <span className="label-text font-medium">Node Size:</span>
          </label>
          <select
            value={nodeSizeMode}
            onChange={(e) => setNodeSizeMode(e.target.value)}
            className="input input-bordered h-[22px] text-xs px-2 py-0"
          >
            <option value="constant">Constant</option>
            <option value="variance">Explained Variance</option>
          </select>
        </div>

        {/* Variance Scale Factor - only show when variance mode is active */}
        {nodeSizeMode === 'variance' && (
          <UserNumberInput
            onChange={setVarianceScaleFactor}
            value={varianceScaleFactor}
            label="Scale Factor"
            placeholder="Scale"
            min={1}
            max={10}
            step={0.5}
            debounceMs={300}
            className="w-[60px] border-2 border-red-500"
          />
        )}

        <button
          onClick={handleDownloadSvg}
          className="px-4 py-2 bg-grey-button text-black rounded-md hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download SVG
        </button>
        <button
          onClick={handleDownloadDrawio}
          className="px-4 py-2 bg-grey-button text-black rounded-md hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] transition-colors flex items-center gap-2"
        >
          Download Draw.io
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
        proOptions={{ hideAttribution: true }}
      >
        <Background />
        <Controls />
        <Panel position="top-right" style={{ marginRight: '400px', marginTop: '100px' }}>
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
