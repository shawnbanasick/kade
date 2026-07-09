import React, { useEffect, useRef, memo, useState } from 'react';
import * as d3 from 'd3';
import { useTranslation } from 'react-i18next';
import PcaScenarios from './PcaScenarios';
import ForceGraphDataSelectRadio from './ForceGraphDataSelectRadio';
import DebouncedNumberInput from './ForceGraphCorrLimitInput';
import structureState from '../../GlobalState/structureState';
import { update } from 'lodash';
import currentDate from '../../../Utils/currentDate1';
import currentTime from '../../../Utils/currentTime1';
import coreState from '../../GlobalState/coreState';
import d3ToPng from 'd3-svg-to-png';

const getDateTime = () => {
  const date = currentDate();
  const time = currentTime();
  return `${date}_${time}`;
};

const ForceGraph = ({
  title = '',
  subtitle = '',
  width = window.innerWidth - 170,
  height = window.innerHeight - 220,
  data = [],
  correlationThreshold = 0.5,
  factorIndices = [],
}) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const colorScaleRef = useRef(null);
  const { t } = useTranslation();
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [forceStrength, setForceStrength] = useState(-5);
  const showAutoFlags = structureState((state) => state.showAutoFlags);
  const updateShowAutoFlags = structureState((state) => state.updateShowAutoFlags);
  const projectName = coreState.getState().projectName;
  const date = currentDate();
  const time = currentTime();
  const dateTime = `${date}_${time}`;
  const completeFileName = `${projectName}-correlation_network_${getDateTime()}`;

  const minCorrelation = correlationThreshold * 100;

  let correlationData = data;

  const [currentFactorIndex, setCurrentFactorIndex] = useState(0);

  const shapeGenerators = {
    1: (r) => {
      return `M ${-r},0 A ${r},${r} 0 1,0 ${r},0 A ${r},${r} 0 1,0 ${-r},0 Z`;
    },
    2: (r) => {
      const h = r * 1.73;
      return `M 0,${-h} L ${r * 1.5},${h * 0.5} L ${-r * 1.5},${h * 0.5} Z`;
    },
    3: (r) => {
      return `M 0,${-r * 1.5} L ${r * 1.5},0 L 0,${r * 1.5} L ${-r * 1.5},0 Z`;
    },
    4: (r) => {
      const points = [];
      for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        points.push(`${r * 1.2 * Math.cos(angle)},${r * 1.2 * Math.sin(angle)}`);
      }
      return `M ${points.join(' L ')} Z`;
    },
    5: (r) => {
      // Parallelogram: skewed rectangle, offset top-right bottom-left
      const w = r * 1.0;
      const h = r * 1.0;
      const skew = r * 0.6;
      return `M ${-w + skew},${-h} L ${w + skew},${-h} L ${w - skew},${h} L ${-w - skew},${h} Z`;
    },
    6: (r) => `M ${-r},${-r} L ${r},${-r} L ${r},${r} L ${-r},${r} Z`,
    7: (r) => {
      // Trapezoid: wide base, narrow top
      const wTop = r * 0.9;
      const wBot = r * 1.6;
      const h = r * 1.1;
      return `M ${-wTop},${-h} L ${wTop},${-h} L ${wBot},${h} L ${-wBot},${h} Z`;
    },
    8: (r) => {
      const points = [];
      for (let i = 0; i < 8; i++) {
        const angle = (i * 2 * Math.PI) / 8;
        points.push(`${r * 1.2 * Math.cos(angle)},${r * 1.2 * Math.sin(angle)}`);
      }
      return `M ${points.join(' L ')} Z`;
    },
  };

  const grayscaleColors = [
    '#e5e5e5',
    '#cccccc',
    '#b3b3b3',
    '#999999',
    '#808080',
    '#666666',
    '#4d4d4d',
    '#333333',
  ];

  // draw.io shape style map for each factor number (1-8).
  // Use explicit shape= prefix (required for reliable rendering per draw.io docs).
  // Deliberately omit html= here — it is appended once at the end of each style string.
  const drawioShapeStyles = {
    1: 'ellipse;whiteSpace=wrap;', // Oval/Ellipse
    2: 'shape=triangle;direction=north;whiteSpace=wrap;', // Triangle (pointing up)
    3: 'rhombus;whiteSpace=wrap;', // Diamond
    4: 'shape=mxgraph.basic.pentagon;whiteSpace=wrap;', // Pentagon
    5: 'shape=parallelogram;whiteSpace=wrap;', // Parallelogram
    6: 'rounded=0;whiteSpace=wrap;', // Square/Rectangle
    7: 'shape=trapezoid;whiteSpace=wrap;', // Trapezoid
    8: 'shape=mxgraph.basic.octagon;whiteSpace=wrap;', // Octagon
  };

  // Color scale values (matching D3 colorScale domain 1-8)
  const factorColors = [
    '#d1d5db',
    '#7dd3fc',
    '#fdba74',
    '#86efac',
    '#fca5a5',
    '#67e8f9',
    '#f9a8d4',
    '#d8b4fe',
  ];

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth - 120,
    height: window.innerHeight - 220,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth - 190,
        height: window.innerHeight - 250,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const downloadSVG = async () => {
    if (!svgRef.current) return;
    const svgEl = document.querySelector('#forceGraph');
    svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    const svgData = svgEl.outerHTML;
    const preface = '<?xml version="1.0" standalone="no"?>\r\n';
    const svgContent = new Blob([preface, svgData], {
      type: 'image/svg+xml;charset=utf-8',
    });

    // to buffer
    const arrayBuffer = await new Response(svgContent).arrayBuffer();
    const defaultPath = `${completeFileName}.svg`;

    const filepath = await window.electronAPI.showSaveSvgDialog(defaultPath);
    if (!filepath) {
      alert('Save operation was canceled.');
      return;
    }

    try {
      const result = await window.electronAPI.saveSVG(arrayBuffer, filepath);
      console.log(result);
    } catch (error) {
      console.error('Failed to save file:', error);
    }
  };

  const downloadPngImage = async () => {
    if (!svgRef.current) return;
    const svgEl = document.querySelector('#forceGraph');
    const dateTime = `${currentDate()}__${currentTime()}`;
    const cleanFactorName = `correlation_network__`;

    const pngOptions = {
      customDownloadFileNames: [cleanFactorName],
    };

    let fileData;
    try {
      fileData = await d3ToPng(svgEl, completeFileName, {
        background: 'white',
        scale: 3,
        format: 'png',
        download: false,
        quality: 1,
      });
    } catch (error) {
      console.error('Failed to convert SVG to PNG:', error);
      return;
    }
    const buffer = fileData?.split(',')?.[1];
    if (!buffer) {
      console.error('PNG conversion returned no data.');
      return;
    }

    const defaultPath = `${completeFileName}.png`;
    const filepath = await window.electronAPI?.showSavePngDialog(defaultPath);
    if (!filepath) {
      alert('Save operation was canceled.');
      return;
    }

    try {
      const result = await window.electronAPI.savePNG(buffer, filepath);
      console.log(result);
    } catch (error) {
      console.error('Failed to save PNG file:', error);
    }
  };

  /**
   * Download the current graph state as a draw.io (.drawio) XML file.
   * Reads node positions directly from the live D3 simulation data bound to SVG elements.
   */
  const downloadDrawio = async () => {
    if (!svgRef.current || !correlationData || correlationData.length === 0) return;

    // ── 1. Collect live node positions from rendered SVG ──────────────────────
    const nodePositions = {};
    const shapeSelector = isGrayscale ? 'path.node-shape' : 'circle.node-shape';

    d3.select(svgRef.current)
      .select('.zoom-container')
      .selectAll(shapeSelector)
      .each(function (d) {
        if (d && d.id) {
          nodePositions[d.id] = {
            x: d.x || 0,
            y: d.y || 0,
            pca: d.pca || 1,
            flagged: showAutoFlags && d.allFlagData && d.allFlagData[currentFactorIndex] === true,
          };
        }
      });

    // ── 2. Rebuild links (same logic as useEffect) ────────────────────────────
    const links = [];
    correlationData.forEach((row) => {
      const source = row.respondent;
      Object.keys(row).forEach((col) => {
        if (col !== 'respondent' && col !== source && col !== 'pca') {
          const value = row[col];
          if (Math.abs(value) >= minCorrelation && source < col) {
            links.push({ source, target: col, value });
          }
        }
      });
    });

    // ── 3. Compute a bounding-box offset so all coords are positive ───────────
    const positions = Object.values(nodePositions);
    if (positions.length === 0) {
      alert('No node data found. Please wait for the simulation to settle and try again.');
      return;
    }
    const minX = Math.min(...positions.map((p) => p.x));
    const minY = Math.min(...positions.map((p) => p.y));
    const offsetX = minX < 40 ? 40 - minX : 0;
    const offsetY = minY < 40 ? 40 - minY : 0;

    // circle size constants (matching D3 node radius) hight and width
    const NODE_W = 40;
    const NODE_H = 40;

    // ── 4. Build XML ──────────────────────────────────────────────────────────
    // draw.io renders cells in document order — later = on top.
    // We collect edges and nodes separately, then emit edges first so nodes
    // always appear above links.
    let cellId = 2; // draw.io reserves 0 and 1
    const nodeCellIds = {};
    const nodeXmlCells = []; // rendered last  → on top
    const edgeXmlCells = []; // rendered first → underneath

    // Nodes
    Object.entries(nodePositions).forEach(([id, pos]) => {
      const cid = cellId++;
      nodeCellIds[id] = cid;

      const factorNum = Math.max(1, Math.min(8, Math.round(pos.pca) || 1));
      const fillColor = isGrayscale ? grayscaleColors[0] : factorColors[factorNum - 1];
      const strokeColor = isGrayscale ? '#000000' : pos.flagged ? '#000000' : '#ffffff';
      const dashed = pos.flagged ? 'dashed=1;dashPattern=5 5;' : '';
      const baseStyle = isGrayscale ? drawioShapeStyles[factorNum] : 'ellipse;whiteSpace=wrap;'; // color mode always uses ellipse (circle)

      // Ensure html=0 is the only html= declaration (strip any from baseStyle first)
      const labelAlign =
        isGrayscale && factorNum === 2
          ? 'verticalAlign=bottom;spacingBottom=2;'
          : 'verticalAlign=middle;';
      const cleanBase = baseStyle.replace(/html=\d;?/g, '');
      const style = `${cleanBase}fillColor=${fillColor};strokeColor=${strokeColor};fontStyle=1;fontSize=12;${labelAlign}${dashed}html=0;`;

      // set circle width and height to 70% of NODE_W/H in grayscale mode, otherwise use full size. Factor 6 (square) gets a wider bounding box in grayscale only; color mode uses uniform circles.
      // Factor 6 (oval) gets a wider bounding box in grayscale only; color mode uses uniform circles
      let nodeW = isGrayscale ? NODE_W * 0.7 : NODE_W * 0.9;
      let nodeH = isGrayscale ? NODE_H * 0.7 : NODE_H * 0.9;

      const cx = Math.round(pos.x + offsetX - nodeW / 2);
      const cy = Math.round(pos.y + offsetY - nodeH / 2);

      nodeXmlCells.push(
        `<mxCell id="${cid}" value="${escapeXml(id)}" style="${escapeXml(style)}" vertex="1" parent="1">` +
          `<mxGeometry x="${cx}" y="${cy}" width="${nodeW}" height="${nodeH}" as="geometry"/>` +
          `</mxCell>`
      );
    });

    // Edges
    links.forEach((l) => {
      const srcId = nodeCellIds[l.source] ?? nodeCellIds[l.source?.id];
      const tgtId = nodeCellIds[l.target] ?? nodeCellIds[l.target?.id];
      if (srcId == null || tgtId == null) return;

      const strokeWidth = Math.max(1, Math.round(Math.abs(l.value) / 15));
      let edgeColor, edgeDash;

      if (isGrayscale) {
        edgeColor = l.value < 0 ? '#555555' : '#222222';
        edgeDash = l.value < 0 ? 'dashed=1;dashPattern=4 4;' : '';
      } else {
        edgeColor = l.value < 0 ? '#dc2626' : '#78bc21';
        edgeDash = '';
      }

      const edgeStyle =
        `endArrow=none;strokeColor=${edgeColor};strokeWidth=${strokeWidth};` +
        `opacity=60;${edgeDash}`;

      const cid = cellId++;
      edgeXmlCells.push(
        `<mxCell id="${cid}" value="" style="${escapeXml(edgeStyle)}" edge="1" source="${srcId}" target="${tgtId}" parent="1">` +
          `<mxGeometry relative="1" as="geometry"/>` +
          `</mxCell>`
      );
    });

    // ── 5. Build legend cells ─────────────────────────────────────────────────
    // Place the legend in a box to the right of the graph content.
    const maxNodeX = Math.max(...positions.map((p) => p.x + offsetX)) + NODE_W;
    const legendBoxX = maxNodeX + 60;
    const legendBoxY = 20;
    const LEGEND_ITEM_H = 44; // vertical spacing between legend rows
    const LEGEND_SHAPE_SIZE = 30; // width & height of each factor swatch
    const LEGEND_COL_W = 150; // column width (2 columns)
    const LEGEND_COLS = 2;

    const legendXmlCells = [];

    // Legend container / title label
    const legendTitleCid = cellId++;
    legendXmlCells.push(
      `<mxCell id="${legendTitleCid}" value="Factors" ` +
        `style="text;html=0;align=left;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;fontSize=13;fontStyle=1;" ` +
        `vertex="1" parent="1">` +
        `<mxGeometry x="${legendBoxX}" y="${legendBoxY}" width="120" height="30" as="geometry"/>` +
        `</mxCell>`
    );

    // One row per factor (1–8), laid out in 2 columns
    for (let i = 1; i <= 8; i++) {
      const col = (i - 1) % LEGEND_COLS;
      const row = Math.floor((i - 1) / LEGEND_COLS);
      const itemX = legendBoxX + col * LEGEND_COL_W;
      const itemY = legendBoxY + 40 + row * LEGEND_ITEM_H;

      const fillColor = isGrayscale ? grayscaleColors[0] : factorColors[i - 1];
      const baseStyle = isGrayscale ? drawioShapeStyles[i] : 'ellipse;whiteSpace=wrap;';
      const labelAlign =
        isGrayscale && i === 2 ? 'verticalAlign=bottom;spacingBottom=4;' : 'verticalAlign=middle;';
      const cleanBase = baseStyle.replace(/html=\d;?/g, '');
      const swatchStyle = `${cleanBase}fillColor=${fillColor};strokeColor=#000000;fontSize=10;fontStyle=1;${labelAlign}html=0;`;

      // Factor 6 (oval) swatch uses a wider bounding box in grayscale only
      const swatchW = LEGEND_SHAPE_SIZE;
      const swatchH = LEGEND_SHAPE_SIZE;

      // Shape swatch
      const swatchCid = cellId++;
      legendXmlCells.push(
        `<mxCell id="${swatchCid}" value="${i}" style="${escapeXml(swatchStyle)}" vertex="1" parent="1">` +
          `<mxGeometry x="${itemX}" y="${itemY}" width="${swatchW}" height="${swatchH}" as="geometry"/>` +
          `</mxCell>`
      );

      // Label next to swatch (offset accounts for wider oval swatch)
      const labelCid = cellId++;
      legendXmlCells.push(
        `<mxCell id="${labelCid}" value="Factor ${i}" ` +
          `style="text;html=0;align=left;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;fontSize=11;" ` +
          `vertex="1" parent="1">` +
          `<mxGeometry x="${itemX + swatchW + 6}" y="${itemY}" width="90" height="${swatchH}" as="geometry"/>` +
          `</mxCell>`
      );
    }

    // Correlation key — positioned below the factor legend
    const corrKeyY = legendBoxY + 40 + Math.ceil(8 / LEGEND_COLS) * LEGEND_ITEM_H + 20;

    // Key title
    const corrTitleCid = cellId++;
    legendXmlCells.push(
      `<mxCell id="${corrTitleCid}" value="Correlation" ` +
        `style="text;html=0;align=left;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;fontSize=13;fontStyle=1;" ` +
        `vertex="1" parent="1">` +
        `<mxGeometry x="${legendBoxX}" y="${corrKeyY}" width="140" height="30" as="geometry"/>` +
        `</mxCell>`
    );

    // Positive correlation line swatch
    const posColor = isGrayscale ? '#222222' : '#dc2626';
    const posCid = cellId++;
    legendXmlCells.push(
      `<mxCell id="${posCid}" value="" ` +
        `style="endArrow=none;strokeColor=${posColor};strokeWidth=3;" ` +
        `edge="1" parent="1">` +
        `<mxGeometry relative="1" as="geometry">` +
        `<mxPoint x="${legendBoxX}" y="${corrKeyY + 50}" as="sourcePoint"/>` +
        `<mxPoint x="${legendBoxX + 36}" y="${corrKeyY + 50}" as="targetPoint"/>` +
        `</mxGeometry>` +
        `</mxCell>`
    );
    const posLabelCid = cellId++;
    legendXmlCells.push(
      `<mxCell id="${posLabelCid}" value="Positive" ` +
        `style="text;html=0;align=left;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;fontSize=11;" ` +
        `vertex="1" parent="1">` +
        `<mxGeometry x="${legendBoxX + 44}" y="${corrKeyY + 37}" width="80" height="26" as="geometry"/>` +
        `</mxCell>`
    );

    // Negative correlation line swatch (dashed in grayscale)
    const negColor = isGrayscale ? '#555555' : '#78bc21';
    const negDash = isGrayscale ? 'dashed=1;dashPattern=4 4;' : '';
    const negCid = cellId++;
    legendXmlCells.push(
      `<mxCell id="${negCid}" value="" ` +
        `style="endArrow=none;strokeColor=${negColor};strokeWidth=3;${negDash}" ` +
        `edge="1" parent="1">` +
        `<mxGeometry relative="1" as="geometry">` +
        `<mxPoint x="${legendBoxX}" y="${corrKeyY + 80}" as="sourcePoint"/>` +
        `<mxPoint x="${legendBoxX + 36}" y="${corrKeyY + 80}" as="targetPoint"/>` +
        `</mxGeometry>` +
        `</mxCell>`
    );
    const negLabelCid = cellId++;
    legendXmlCells.push(
      `<mxCell id="${negLabelCid}" value="Negative" ` +
        `style="text;html=0;align=left;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;fontSize=11;" ` +
        `vertex="1" parent="1">` +
        `<mxGeometry x="${legendBoxX + 44}" y="${corrKeyY + 67}" width="80" height="26" as="geometry"/>` +
        `</mxCell>`
    );

    // Auto-flag note (only when flags are visible)
    if (showAutoFlags) {
      const flagNoteCid = cellId++;
      legendXmlCells.push(
        `<mxCell id="${flagNoteCid}" value="Dashed border = auto-flagged factor loading" ` +
          `style="text;html=0;align=left;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;fontSize=10;fontStyle=2;" ` +
          `vertex="1" parent="1">` +
          `<mxGeometry x="${legendBoxX}" y="${corrKeyY + 100}" width="280" height="26" as="geometry"/>` +
          `</mxCell>`
      );
    }

    // Render order: edges first (bottom), then nodes (middle), then legend text (top)
    const allCells = [...edgeXmlCells, ...nodeXmlCells, ...legendXmlCells];

    const drawioXml =
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<mxfile host="app.diagrams.net" version="21.0.0">\n` +
      `  <diagram name="Correlation Network">\n` +
      `    <mxGraphModel dx="1422" dy="762" grid="0" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="0" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">\n` +
      `      <root>\n` +
      `        <mxCell id="0"/>\n` +
      `        <mxCell id="1" parent="0"/>\n` +
      allCells.join('\n') +
      `\n      </root>\n` +
      `    </mxGraphModel>\n` +
      `  </diagram>\n` +
      `</mxfile>`;

    const filename = `KADE_${projectName}_${t('Correlation Network')}_${getDateTime()}`;
    const defaultPath = `${filename}.drawio`;

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

  /** Escape characters that are special in XML attribute values */
  function escapeXml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  const toggleGrayscale = () => {
    setIsGrayscale(!isGrayscale);
    updateShowAutoFlags(false); // Auto-flags are only designed for color mode, so
  };

  useEffect(() => {
    if (!correlationData || correlationData.length === 0 || !svgRef.current) return;

    d3.select(svgRef.current).selectAll('*').remove();

    const nodes = correlationData.map((d) => ({
      id: d.respondent,
      pc: d.pc,
      flag: d.flag,
      pca: d.pc && d.pc[0] ? d.pc[0] : 1,
      allPcData: d.pc,
      allFlagData: d.flag,
    }));

    const links = [];
    correlationData.forEach((row) => {
      const source = row.respondent;
      Object.keys(row).forEach((col) => {
        if (col !== 'respondent' && col !== source && col !== 'pca') {
          const value = row[col];
          if (Math.abs(value) >= minCorrelation) {
            if (source < col) {
              links.push({ source, target: col, value });
            }
          }
        }
      });
    });

    const svg = d3
      .select(svgRef.current)
      .attr('width', windowSize.width)
      .attr('height', windowSize.height)
      .attr('viewBox', [0, 0, windowSize.width, windowSize.height]);

    svg
      .append('text')
      .attr('x', windowSize.width / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('class', 'text-xl font-semibold')
      .text(title);

    svg
      .append('text')
      .attr('x', windowSize.width / 2)
      .attr('y', 55)
      .attr('text-anchor', 'middle')
      .attr('class', 'text-sm text-gray-500')
      .text(subtitle);

    const colorScale = d3.scaleOrdinal().domain([1, 2, 3, 4, 5, 6, 7, 8]).range(factorColors);

    colorScaleRef.current = colorScale;

    const legendGroup = svg.append('g').attr('class', 'legend-group');
    const legendItemHeight = 35;
    const legendColumns = 8;
    const legendColumnWidth = 94;
    const legendTotalWidth = legendColumns * legendColumnWidth;
    const legendX = windowSize.width / 2 - legendTotalWidth / 2;
    const legendY = 10;

    legendGroup
      .append('text')
      .attr('x', windowSize.width / 2 - legendTotalWidth / 2 - 120)
      .attr('y', legendY)
      .attr('class', 'text-sm font-semibold')
      .attr('fill', '#000');

    for (let i = 1; i <= 8; i++) {
      const col = (i - 1) % 8;
      const row = Math.floor((i - 1) / 8);
      const x = legendX + col * legendColumnWidth;

      const y = legendY + 20 + row * legendItemHeight;
      const legendItem = legendGroup.append('g').attr('transform', `translate(${x}, ${y})`);

      if (isGrayscale) {
        // Use a smaller r for the oval so it fits the legend row height cleanly
        const legendR = 12;
        legendItem
          .append('path')
          .attr('d', shapeGenerators[i](legendR))
          .attr('fill', grayscaleColors[0])
          .attr('stroke', '#000')
          .attr('stroke-width', 1.5);
      } else {
        legendItem
          .append('circle')
          .attr('r', 12)
          .attr('fill', colorScale(i))
          .attr('stroke', '#fff')
          .attr('stroke-width', 1.5);
      }

      legendItem
        .append('text')
        .attr('x', isGrayscale && i === 6 ? 22 : 20)
        .attr('y', 0)
        .attr('dy', '0.35em')
        .attr('class', 'text-xs')
        .attr('fill', '#000')
        .text(`Factor ${i}`);
    }

    const zoomContainer = svg.append('g').attr('class', `zoom-container`);

    zoomContainer
      .append('rect')
      .attr('width', windowSize.width)
      .attr('height', windowSize.height - 150)
      .attr('transform', `translate(0, 150)`)
      .attr('fill', 'transparent')
      .style('cursor', 'grab');

    const g = zoomContainer.append('g').attr('transform', `translate(0, 150)`);

    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 10])
      .filter(function (event) {
        return event.type !== 'mousedown' || event.target.tagName !== 'circle';
      })
      .on('zoom', (event) => {
        g.attr('transform', `translate(0, 50) ${event.transform}`);
      });

    zoomContainer.call(zoom);

    zoomContainer
      .on('mousedown.cursor', function (event) {
        if (event.target.tagName !== 'circle') {
          d3.select(this).select('rect').style('cursor', 'grabbing');
        }
      })
      .on('mouseup.cursor', function () {
        d3.select(this).select('rect').style('cursor', 'grab');
      });

    const linkColorScale = d3
      .scaleLinear()
      .domain([-100, 0, 100])
      .range(isGrayscale ? ['#555555', '#cccccc', '#222222'] : ['#dc2626', '#e5e7eb', '#78bc21']);

    const linkWidthScale = d3.scaleLinear().domain([0, 100]).range([1, 8]);

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance((d) => 200 - Math.abs(d.value))
          .strength((d) => Math.abs(d.value) / 100)
      )
      .force('charge', d3.forceManyBody().strength(forceStrength))
      .force('center', d3.forceCenter(width / 2, (height - 250) / 2))
      .force('collision', d3.forceCollide().radius(30));

    const tooltip = d3.select(tooltipRef.current);

    const link = g
      .append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', (d) => linkColorScale(d.value))
      .attr('stroke-width', (d) => linkWidthScale(Math.abs(d.value)))
      .attr('stroke-opacity', 0.6)
      .style('stroke-dasharray', (d) => {
        if (isGrayscale && d.value < 0) return '8, 4';
        return 'none';
      });

    const node = g
      .append('g')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended));

    if (isGrayscale) {
      node
        .append('path')
        .attr('d', (d) => {
          const pcaValue = d.pca || 1;
          const shapeGen = shapeGenerators[pcaValue] || shapeGenerators[1];
          return shapeGen(15);
        })
        .attr('fill', grayscaleColors[0])
        .attr('stroke', '#000')
        .attr('stroke-width', 2)
        .style('stroke-dasharray', (d) => {
          if (!showAutoFlags) return 'none';
          return d.allFlagData && d.allFlagData[0] ? '5, 5' : 'none';
        })
        .style('cursor', 'pointer')
        .attr('class', 'node-shape');
    } else {
      node
        .append('circle')
        .attr('r', 20)
        .attr('fill', (d) => colorScale(d.pca || 1))
        .attr('stroke', (d) => {
          if (!showAutoFlags) return '#fff';
          return d.allFlagData && d.allFlagData[0] ? '#000' : '#fff';
        })
        .attr('stroke-width', 2)
        .style('stroke-dasharray', (d) => {
          if (!showAutoFlags) return 'none';
          return d.allFlagData && d.allFlagData[0] ? '5, 5' : 'none';
        })
        .style('cursor', 'pointer')
        .attr('class', 'node-shape');
    }

    // text labels on top of shapes
    node
      .append('text')
      .text((d) => d.id)
      .attr('text-anchor', 'middle')
      .attr('dy', (d) => {
        if (isGrayscale && (d.pca === 2 || d.allPcData?.[currentFactorIndex] === 2))
          return '0.45em';
        return '0.35em';
      })
      .attr('class', 'text-xs font-semibold cursor-default pointer-events-none')
      .attr('fill', '#000');

    node
      .on('mouseover', function (event, d) {
        link
          .style('stroke-opacity', (l) => (l.source.id === d.id || l.target.id === d.id ? 1 : 0.1))
          .style('stroke-width', (l) =>
            l.source.id === d.id || l.target.id === d.id
              ? linkWidthScale(Math.abs(l.value)) * 1.5
              : linkWidthScale(Math.abs(l.value))
          );

        const shapeSelector = isGrayscale ? 'path' : 'circle';
        node.select(shapeSelector).style('opacity', (n) => {
          if (n.id === d.id) return 1;
          const connected = links.some(
            (l) =>
              (l.source.id === d.id && l.target.id === n.id) ||
              (l.target.id === d.id && l.source.id === n.id)
          );
          return connected ? 1 : 0.3;
        });

        const connections = links
          .filter((l) => l.source.id === d.id || l.target.id === d.id)
          .map((l) => {
            const other = l.source.id === d.id ? l.target.id : l.source.id;
            return `${other}: ${l.value}`;
          })
          .join('<br>');

        tooltip
          .style('opacity', 1)
          .html(`<strong>${d.id}</strong><br>Connections:<br>${connections}`)
          .style('left', `${event.pageX - 130}px`)
          .style('top', `${event.pageY - 100}px`);
      })
      .on('mouseout', function () {
        link
          .style('stroke-opacity', 0.6)
          .style('stroke-width', (d) => linkWidthScale(Math.abs(d.value)));
        const shapeSelector = isGrayscale ? 'path' : 'circle';
        node.select(shapeSelector).style('opacity', 1);
        tooltip.style('opacity', 0);
      });

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);
      node.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event, d) {
      event.sourceEvent.stopPropagation();
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      event.sourceEvent.stopPropagation();
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      event.sourceEvent.stopPropagation();
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    const resetZoomFn = () => {
      zoomContainer.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
    };
    svg.node().resetZoom = resetZoomFn;

    return () => {
      simulation.stop();
    };
  }, [correlationData, width, height, title, subtitle, minCorrelation, isGrayscale, forceStrength]);

  const resetZoom = () => {
    if (svgRef.current && svgRef.current.resetZoom) {
      svgRef.current.resetZoom();
    }
  };

  useEffect(() => {
    if (!svgRef.current) return;
    const shapeSelector = isGrayscale ? 'path.node-shape' : 'circle.node-shape';
    d3.select(svgRef.current)
      .select('.zoom-container')
      .selectAll(shapeSelector)
      .attr('stroke', (d) => {
        if (!d || !d.id) return isGrayscale ? '#000' : '#fff';
        if (!showAutoFlags) return isGrayscale ? '#000' : '#fff';
        const hasFlag = d.allFlagData && d.allFlagData[currentFactorIndex] === true;
        if (isGrayscale) return '#000';
        return hasFlag ? '#000' : '#fff';
      })
      .style('stroke-dasharray', (d) => {
        if (!d || !d.id) return 'none';
        if (!showAutoFlags) return 'none';
        const hasFlag = d.allFlagData && d.allFlagData[currentFactorIndex] === true;
        return hasFlag ? '5, 5' : 'none';
      });
  }, [showAutoFlags, isGrayscale, currentFactorIndex]);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.select('.legend-explanation').remove();
    if (showAutoFlags) {
      svg
        .select('.legend-group')
        .append('text')
        .attr('class', 'legend-explanation')
        .attr('x', windowSize.width / 2 - 18)
        .attr('y', 76)
        .attr('text-anchor', 'middle')
        .attr('fill', '#666')
        .text('Dashed border indicates an auto-flagged factor loading.');
    }
  }, [showAutoFlags, width]);

  const handleSelectionChange = (id, value) => {
    if (!svgRef.current || !colorScaleRef.current) return;
    setCurrentFactorIndex(value);

    const shapeSelector = isGrayscale ? 'path.node-shape' : 'circle.node-shape';
    const shapes = d3.select(svgRef.current).select('.zoom-container').selectAll(shapeSelector);

    shapes.each(function (d) {
      if (d && d.allPcData && d.allPcData[value]) {
        d.pca = d.allPcData[value];
      }
    });

    shapes
      .attr('stroke', (d) => {
        if (!d || !d.id) return isGrayscale ? '#000' : '#fff';
        if (!showAutoFlags) return isGrayscale ? '#000' : '#fff';
        const hasFlag = d.allFlagData && d.allFlagData[value] === true;
        if (isGrayscale) return '#000';
        return hasFlag ? '#000' : '#fff';
      })
      .style('stroke-dasharray', (d) => {
        if (!d || !d.id) return 'none';
        if (!showAutoFlags) return 'none';
        const hasFlag = d.allFlagData && d.allFlagData[value] === true;
        return hasFlag ? '5, 5' : 'none';
      })
      .attr('stroke-width', 2)
      .attr('fill', (d) => {
        if (!d || !d.id) return isGrayscale ? '#e5e5e5' : '#d1d5db';
        if (!d.allPcData || d.allPcData[value] == null) return isGrayscale ? '#e5e5e5' : '#d1d5db';
        const factorNum = d.allPcData[value];
        if (isGrayscale) return grayscaleColors[0];
        return colorScaleRef.current(factorNum);
      });

    if (isGrayscale) {
      d3.select(svgRef.current)
        .select('.zoom-container')
        .selectAll('path.node-shape')
        .attr('d', (d) => {
          if (!d || !d.id) return shapeGenerators[1](15);
          if (d.allPcData && d.allPcData[value]) {
            const factorNum = d.allPcData[value];
            const shapeGen = shapeGenerators[factorNum] || shapeGenerators[1];
            return shapeGen(15);
          }
          return shapeGenerators[1](15);
        });
    }
  };

  return (
    <>
      <div className="text-4xl mb-2 mt-3">{t('Correlation Network Force-Directed Graph')}</div>

      <div className="h-[93%]">
        {/* Controls and legend */}
        <div className="flex w-full text-basis h-auto min-h-20 items-center flex-wrap">
          <div className="flex gap-5 items-center justify-left w-full  flex-wrap">
            <DebouncedNumberInput
              value={correlationThreshold}
              label={t('Cutoff')}
              min={0}
              max={1}
              step={0.01}
              debounceMs={500}
            />
            <ForceGraphDataSelectRadio />

            {/* Correlation legend */}
            <div className="flex flex-col gap-2 text-sm border-gray-200">
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-0.5 shrink-0 ${isGrayscale ? 'bg-gray-800' : 'bg-[#78bc21]'}`}
                  style={{ height: '4px' }}
                ></div>
                <span>Positive Correlation</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-6 shrink-0"
                  style={
                    isGrayscale
                      ? {
                          backgroundImage:
                            'repeating-linear-gradient(to right, #9ca3af 0px, #9ca3af 4px, transparent 4px, transparent 8px)',
                          height: '4px',
                        }
                      : { backgroundColor: '#dc2626', height: '4px' }
                  }
                ></div>
                <span>Negative Correlation</span>
              </div>
            </div>
            <PcaScenarios onSelectionChange={handleSelectionChange} isGrayscale={isGrayscale} />
            <div className="flex flex-col items-left">
              {/* Autoflag toggle */}
              <div className="flex flex-col items-center">
                <label className="text-sm font-medium mr-3">Attraction Strength</label>
                <div className="flex flex-row items-center gap-3">
                  <input
                    type="range"
                    min={-50}
                    max={-1}
                    step={1}
                    value={forceStrength}
                    onChange={(e) => setForceStrength(Number(e.target.value))}
                    className="w-32 h-5 mb-2"
                    style={{ accentColor: '#a5d6a7' }}
                  />
                  <span className="text-sm w-6 mb-2">{100 + forceStrength}</span>
                </div>
              </div>
              <button
                onClick={() => updateShowAutoFlags(!showAutoFlags)}
                className={`px-4 py-2 h-8 w-45 mb-2 rounded-md transition-colors flex items-center justify-center gap-2  ${
                  showAutoFlags
                    ? 'bg-primary-button text-black hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent]'
                    : 'bg-grey-button text-black hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent]'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
                  />
                </svg>
                Auto-Flag {showAutoFlags ? 'ON' : 'OFF'}
              </button>
            </div>
            {/* end autoflag toggle and strength slider */}
            {/* reset and grayscale buttons div */}
            <div className="flex flex-col gap-2 items-left">
              <button
                onClick={downloadPngImage}
                className="px-4 py-2 h-8 bg-grey-button text-black rounded-md hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent] transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download PNG
              </button>
              <button
                onClick={toggleGrayscale}
                className="px-4 py-2 h-8 w-45 rounded-md transition-colors flex items-center gap-2 bg-grey-button text-black hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent]"
              >
                <svg
                  className="w-5 h-5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
                {isGrayscale ? 'Color Mode' : 'Grayscale Mode'}
              </button>
            </div>
            {/* download buttons div */}
            <div className="flex flex-col gap-2 items-left gap-2">
              <button
                onClick={downloadSVG}
                className="px-4 py-2 h-8 bg-grey-button text-black rounded-md hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent] transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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
                onClick={downloadDrawio}
                className="px-4 py-2 h-8 bg-grey-button text-black rounded-md hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent] transition-colors flex items-center gap-2"
                title="Export the current graph layout as a draw.io diagram (.drawio)"
              >
                <svg
                  className="w-5 h-5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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
          </div>
        </div>
        {/* Graph canvas height and controls overlay */}
        <div className="h-[90%]" id="svgOuterContainer">
          {/* ── Graph canvas ── */}
          <div
            id="svgInnerContainer"
            className="relative bg-white h-full rounded-lg flex-1 overflow-hidden outline-2 outline-gray-100"
          >
            <svg id="forceGraph" ref={svgRef}></svg>
            <div
              ref={tooltipRef}
              className="absolute bg-white border-2 border-solid border-gray-800 rounded-md p-3 pointer-events-none shadow-lg text-sm max-w-xs"
            />
          </div>

          {/* ── Controls overlay ── */}
          <div className="absolute bottom-10 right-10 w-50 bg-white rounded-md shadow-md p-2 text-xs text-gray-600">
            <div className="mb-1 font-semibold">Controls:</div>
            <div>🖱️ {t('Scroll to zoom')}</div>
            <div>🖐️ {t('Drag background to pan')}</div>
            <div>👆 {t('Drag nodes to move')}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ForceGraph);
