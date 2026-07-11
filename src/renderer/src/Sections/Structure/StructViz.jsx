import { useCallback, useMemo, useRef, useState } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  ReactFlowProvider,
  Panel,
  useReactFlow,
} from 'reactflow';
import * as htmlToImage from 'html-to-image';
import StraightEdgeWithLabel from './StraightEdgeWithLabel';
import EdgeLegend from './EdgeLegend';
import { useTranslation } from 'react-i18next';
import currentDate from '../../Utils/currentDate1';
import currentTime from '../../Utils/currentTime1';
import coreState from '../GlobalState/coreState';
import 'reactflow/dist/style.css';
import getNodes from './getNodes';
import './reactFlow.css';
import structureState from '../GlobalState/structureState';
import UserNumberInput from './UserNumberInput';
import refreshViz from './refreshViz';
import exportToDrawio from './exportToDrawio';

const edgeTypes = { straightWithLabel: StraightEdgeWithLabel };

const getDateTime = () => {
  const date = currentDate();
  const time = currentTime();
  return `${date}_${time}`;
};

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
  const { t } = useTranslation();

  const edges = structureState((state) => state.initialEdges);
  const updateEdges = structureState((state) => state.updateInitialEdges);
  const structureCorrelationThreshold = structureState(
    (state) => state.structureCorrelationThreshold
  );
  const verticalSpacing = structureState((state) => state.verticalSpacing);
  const horizontalSpacing = structureState((state) => state.horizontalSpacing);
  const explainedVarianceArrays = structureState((state) => state.explainedVarianceArrays);
  const projectName = coreState.getState().projectName;

  const onInit = useCallback((instance) => {
    instance.fitView({ padding: 0.2 });
    // Shift the fitted view to the right by a fixed pixel amount
    requestAnimationFrame(() => {
      const viewport = instance.getViewport();
      const container = flowRef.current;
      const shiftAmount = container ? container.clientWidth * 0.3 : 175;
      instance.setViewport({ ...viewport, x: viewport.x + shiftAmount, zoom: 0.8 });
    });
  }, []);

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

  const handleDownloadPng = async () => {
    const container = flowRef.current;
    if (!container) return;

    const dataUrl = await htmlToImage.toPng(container, {
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
        // Exclude button panel - check parent chain for button elements
        let currentNode = node;
        while (currentNode) {
          if (currentNode?.tagName === 'BUTTON') {
            return false;
          }
          if (
            currentNode?.classList?.contains('react-flow__panel') &&
            currentNode?.style?.position === 'absolute' &&
            currentNode?.querySelector('button')
          ) {
            return false;
          }
          currentNode = currentNode.parentElement;
        }
        if (node?.tagName === 'LINK' && node?.rel === 'stylesheet') {
          return false;
        }
        return true;
      },
    });

    const filename = `KADE_${projectName}_${t('Hierarchical_Factor_Graph')}_${getDateTime()}`;
    const defaultPath = `${filename}.png`;
    const filepath = await window.electronAPI?.showSavePngDialog?.(defaultPath);
    if (!filepath) {
      alert('Save operation was canceled.');
      return;
    }

    try {
      const result = await window.electronAPI.savePNG(dataUrl?.split(',')?.[1], filepath);
      console.log(result);
    } catch (error) {
      console.error('Failed to save PNG file:', error);
    }
  };

  const handleDownloadSvg = useCallback(async () => {
    const filename = `KADE_${projectName}_${t('Hierarchical_Factor_Graph')}_${getDateTime()}`;
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
          // Exclude button panel - check parent chain for button elements
          let currentNode = node;
          while (currentNode) {
            if (currentNode?.tagName === 'BUTTON') {
              return false;
            }
            if (
              currentNode?.classList?.contains('react-flow__panel') &&
              currentNode?.style?.position === 'absolute' &&
              currentNode?.querySelector('button')
            ) {
              return false;
            }
            currentNode = currentNode.parentElement;
          }
          if (node?.tagName === 'LINK' && node?.rel === 'stylesheet') {
            return false;
          }
          return true;
        },
      })
      .then(async (dataUrl) => {
        const defaultPath = `${filename}.svg`;
        const filepath = await window.electronAPI?.showSaveSvgDialog(defaultPath);
        if (!filepath) {
          alert('Save operation was canceled.');
          return;
        }
        try {
          const result = await window.electronAPI.saveSVG(arrayBuffer, filepath);
          console.log(result);
        } catch (error) {
          console.error('Failed to save SVG file:', error);
        }
      })
      .catch((err) => {
        console.error('SVG export failed:', err);
      });
  }, []);

  const handleDownloadDrawio = async () => {
    const filename = `KADE_${projectName}_${t('Hierarchical_Factor_Graph')}_${getDateTime()}`;
    const defaultPath = `${filename}.drawio`;
    const drawioXml = exportToDrawio(nodes, edges, { includeLegend: true });
    const encoder = new TextEncoder();
    const arrayBuffer = encoder.encode(drawioXml).buffer;
    const filepath = await window.electronAPI?.showSaveDrawioDialog?.(defaultPath);
    if (!filepath) {
      alert('Save operation was canceled.');
      return;
    }
    try {
      await window.electronAPI.saveSVG(arrayBuffer, filepath);
    } catch (error) {
      console.error('Failed to save .drawio file:', error);
    }
  };

  return (
    <>
      <div className="text-4xl mb-3 mt-3">{t('Hierarchical Factor Graph')}</div>
      <div ref={flowRef} className="relative w-[95%] h-[82%] bg-white">
        <div className="flex flex-row gap-15 items-end react-flow__panel-top mb-5">
          <UserNumberInput
            onChange={handleCorrelationChange}
            value={structureCorrelationThreshold}
            label="Corr. Cutoff"
            placeholder="Threshold"
            min={0}
            max={1}
            step={0.01}
            debounceMs={500}
            className="w-15"
          />
          <UserNumberInput
            onChange={handleVerticalSpacingChange}
            value={verticalSpacing}
            label="Vert. Spacing"
            placeholder="Vertical Spacing"
            min={0}
            max={500}
            step={1}
            debounceMs={500}
            className="w-15"
          />
          <UserNumberInput
            onChange={handleHorizontalSpacingChange}
            value={horizontalSpacing}
            label="Hori. Spacing"
            placeholder="Horizontal Spacing"
            min={0}
            max={500}
            step={1}
            debounceMs={500}
            className="w-15"
          />

          {/* Node Size Mode Select */}
          <div className="form-control flex flex-col p-0 pt-0 ml-5 mr-0 mb-3.5 ">
            <label className="label mb-2">
              <span className="label-text font-medium">Node Size:</span>
            </label>
            <select
              value={nodeSizeMode}
              onChange={(e) => setNodeSizeMode(e.target.value)}
              className="input input-bordered h-5.5 text-xs px-2 py-0 "
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
              step={0.1}
              debounceMs={300}
              className="w-15"
            />
          )}
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
          onInit={onInit}
          proOptions={{ hideAttribution: true }}
        >
          <Background />
          <Controls className="hidden" />
          <Panel position="top-left" style={{ marginLeft: '557px', marginTop: '100px' }}>
            <EdgeLegend />
          </Panel>
          <Panel position="bottom-left" className="mb-5 ml-2.5">
            <div id="hierarchyButtonGroup" className="flex gap-3">
              <button
                onClick={handleDownloadPng}
                className="px-4 py-2 bg-grey-button text-black rounded-md hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent] transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download PNG
              </button>{' '}
              <button
                onClick={handleDownloadSvg}
                className="px-4 py-2 bg-grey-button text-black rounded-md hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent] transition-colors flex items-center gap-2"
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
                className="px-4 py-2 bg-grey-button text-black rounded-md hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent] transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download draw.io
              </button>
            </div>
          </Panel>
        </ReactFlow>
      </div>
      <div className="absolute top-35 left-180 w-50 bg-white rounded-md shadow-md p-2 text-xs text-gray-600">
        <div className="mb-1 font-semibold">Controls:</div>
        <div>🖱️ {t('Scroll to zoom')}</div>
        <div>🖐️ {t('Drag background to pan')}</div>
      </div>
    </>
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
