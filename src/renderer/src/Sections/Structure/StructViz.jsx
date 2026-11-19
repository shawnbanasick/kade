import { useCallback, useMemo, useRef, useState } from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import * as htmlToImage from 'html-to-image';
import { useTranslation } from 'react-i18next';
import './reactFlow.css';
import ReactFlow, {
  Controls,
  Background,
  applyEdgeChanges,
  ReactFlowProvider,
  Panel,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import structureState from '../GlobalState/structureState';
import coreState from '../GlobalState/coreState';
import outputState from '../GlobalState/outputState';
import correlationState from '../GlobalState/correlationState';

import StraightEdgeWithLabel from './StraightEdgeWithLabel';
import EdgeLegend from './EdgeLegend';
import currentDate from '../../Utils/currentDate1';
import currentTime from '../../Utils/currentTime1';
import getNodes from './getNodes';
import UserNumberInput from './UserNumberInput';
import refreshViz from './refreshViz';
import exportToDrawio from './exportToDrawio';

const edgeTypes = { straightWithLabel: StraightEdgeWithLabel };

const getDateTime = () => {
  const date = currentDate();
  const time = currentTime();
  return `${date}_${time}`;
};

const EXPORT_PADDING = 40; // px of white space on every side
const EXPORT_PADDING_TOP = 130; // px of white space on top (for title)

// Bounding box (in container-relative px) of everything visible in the export:
// nodes, edges, edge labels, and the legend panel.
const getContentBounds = (container) => {
  const c = container.getBoundingClientRect();
  const selectors = [
    '.react-flow__node',
    '.react-flow__edge',
    '.react-flow__edgelabel-renderer > *',
    '.react-flow__panel.top', // EdgeLegend (the button panel is bottom-left, so it's excluded)
  ];

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  container.querySelectorAll(selectors.join(',')).forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;
    minX = Math.min(minX, r.left - c.left);
    minY = Math.min(minY, r.top - c.top);
    maxX = Math.max(maxX, r.right - c.left);
    maxY = Math.max(maxY, r.bottom - c.top);
  });

  // Nothing found: fall back to the full container
  if (!Number.isFinite(minX)) {
    return { minX: 0, minY: 0, maxX: c.width, maxY: c.height };
  }

  // Never go outside the container (anything out there is clipped anyway)
  return { minX, minY, maxX, maxY };
};

const exportFilter = (node) => {
  if (
    node?.classList?.contains('react-flow__minimap') ||
    node?.classList?.contains('react-flow__controls') ||
    node?.classList?.contains('react-flow__background') ||
    node?.classList?.contains('react-flow__panel-top')
  ) {
    return false;
  }
  let currentNode = node;
  while (currentNode) {
    if (currentNode?.tagName === 'BUTTON') return false;
    if (
      currentNode?.classList?.contains('react-flow__panel') &&
      currentNode?.style?.position === 'absolute' &&
      currentNode?.querySelector('button')
    ) {
      return false;
    }
    currentNode = currentNode.parentElement;
  }
  if (node?.tagName === 'LINK' && node?.rel === 'stylesheet') return false;
  return true;
};

const toArrayBuffer = (str) => {
  const bytes = new TextEncoder().encode(str);
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
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
  const showCorrelationMatrix = correlationState((state) => state.showCorrelationMatrix);

  const addHierarchySavedImage = outputState((state) => state.addHierarchySavedImage);

  const getImageOptions = () => {
    const container = flowRef.current;
    const { minX, minY, maxX, maxY } = getContentBounds(container);

    return {
      skipFonts: true,
      skipAutoScale: true,
      backgroundColor: 'white',
      filter: exportFilter,
      width: Math.ceil(maxX - minX + EXPORT_PADDING * 2),
      height: Math.ceil(maxY - minY + EXPORT_PADDING_TOP + EXPORT_PADDING),
      style: {
        transform: `translate(${EXPORT_PADDING - minX}px, ${EXPORT_PADDING_TOP - minY}px)`,
        transformOrigin: 'top left',
        boxShadow: `0 0 0 ${EXPORT_PADDING_TOP}px #ffffff`,
      },
    };
  };
  const getBaseName = () => `KADE_${projectName}_${t('Hierarchical_Factor_Graph')}`;

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

  const notify = async () => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    await toast.success(<div>{t('Current graph added to KADE Zip')}</div>, {
      autoClose: true,
      position: 'bottom-right',
      closeOnClick: true,
      draggable: true,
      theme: 'light',
      style: {
        background: '#fff',
        color: 'dark-gray',
        outline: '1px solid #ccc',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    });
  };

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
    const base64 = await generatePngBase64();
    if (!base64) return;

    const filepath = await window.electronAPI?.showSavePngDialog?.(
      `${getBaseName()}_${getDateTime()}_(${structureCorrelationThreshold}_${nodeSizeMode}).png`
    );
    if (!filepath) {
      alert('Save operation was canceled.');
      return;
    }
    try {
      console.log(await window.electronAPI.savePNG(base64, filepath));
    } catch (error) {
      console.error('Failed to save PNG file:', error);
    }
  };

  const handleDownloadSvg = async () => {
    try {
      const svgString = await generateSvgString();
      if (!svgString) return;

      const filepath = await window.electronAPI?.showSaveSvgDialog?.(
        `${getBaseName()}_${getDateTime()}_(${structureCorrelationThreshold}_${nodeSizeMode}).svg`
      );
      if (!filepath) {
        alert('Save operation was canceled.');
        return;
      }
      console.log(await window.electronAPI.saveSVG(toArrayBuffer(svgString), filepath));
    } catch (error) {
      console.error('Failed to save SVG file:', error);
    }
  };

  const handleDownloadDrawio = async () => {
    const drawioXml = generateDrawioString();
    const filepath = await window.electronAPI?.showSaveDrawioDialog?.(
      `${getBaseName()}_${getDateTime()}_(${structureCorrelationThreshold}_${nodeSizeMode}).drawio`
    );
    if (!filepath) {
      alert('Save operation was canceled.');
      return;
    }
    try {
      await window.electronAPI.saveSVG(toArrayBuffer(drawioXml), filepath);
    } catch (error) {
      console.error('Failed to save .drawio file:', error);
    }
  };

  // base64 PNG (no data-URL prefix)
  const generatePngBase64 = async () => {
    const container = flowRef.current;
    if (!container) return null;
    const imageOptions = getImageOptions();
    const dataUrl = await htmlToImage.toPng(container, imageOptions);
    return dataUrl?.split(',')?.[1] ?? null;
  };

  // raw SVG markup
  const generateSvgString = async () => {
    const container = flowRef.current;
    if (!container) return null;
    const imageOptions = getImageOptions();
    const dataUrl = await htmlToImage.toSvg(container, imageOptions);
    if (!dataUrl) return null;

    // html-to-image returns: data:image/svg+xml;charset=utf-8,<encoded svg>
    const commaIdx = dataUrl.indexOf(',');
    const header = dataUrl.slice(0, commaIdx);
    const payload = dataUrl.slice(commaIdx + 1);
    const svg = header.includes(';base64') ? atob(payload) : decodeURIComponent(payload);

    return `<?xml version="1.0" standalone="no"?>\r\n${svg}`;
  };

  const generateDrawioString = () => exportToDrawio(nodes, edges, { includeLegend: true });

  const handleSaveToKadeZip = async () => {
    try {
      const [png, svg] = await Promise.all([generatePngBase64(), generateSvgString()]);
      const drawio = generateDrawioString();

      if (!png || !svg || !drawio) {
        console.error('Failed to generate hierarchy images', {
          png: !!png,
          svg: !!svg,
          drawio: !!drawio,
        });
        return;
      }

      const dateTime = getDateTime();
      addHierarchySavedImage({
        name: `${getBaseName()}_${dateTime}`,
        png, // base64 string
        svg, // string
        drawio, // string
        time: dateTime,
        context: `(${structureCorrelationThreshold}_${nodeSizeMode})`,
      });
      notify();
    } catch (error) {
      console.error('Failed to save hierarchy graph to KADE zip:', error);
    }
  };

  if (!showCorrelationMatrix) {
    return (
      <div className="flex flex-col w-110 border-2 border-gray-100 bg-white rounded-lg shadow-lg p-6 items-center justify-center gap-2">
        <div className="text-lg font-semibold">{t('No hierarchy data available')}</div>
        <div className="text-sm text-gray-500">{t('Please check your data or settings.')}</div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer transition={Zoom} />
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
              <button
                onClick={handleSaveToKadeZip}
                className="px-4 py-2 bg-grey-button text-black rounded-md hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent] transition-colors flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 20H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10l4 4v3" />
                  <path d="M7 3v4h7V3" />
                  <path d="M7 20v-6h4" />
                  <path d="M18 14v7" />
                  <path d="M14.5 17.5h7" />
                </svg>
                {t('Save to KADE Zip')}
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
