// buildScreePlotDrawio.js

const escXml = (str) =>
  String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * Converts scree plot data into a native draw.io mxfile XML.
 *
 * @param {object} params
 * @param {Array}   params.data          - screePlotData: array of [x, y] pairs
 * @param {Array}   params.means         - parallelMeans: array of [x, y] pairs (optional)
 * @param {Array}   params.p95           - parallel95: array of [x, y] pairs (optional)
 * @param {boolean} params.showMeans     - displayParallelMeans
 * @param {boolean} params.showP95       - displayParallel95
 * @param {number}  params.numFacs       - numCentroidFactors + 1
 */
const buildScreePlotDrawio = ({
  data = [],
  means = [],
  p95 = [],
  showMeans = false,
  showP95 = false,
  numFacs = 8,
}) => {
  if (!data.length) return null;

  // ── Canvas / scale constants ───────────────────────────────────────────────
  // Mirror ScreePlot: width=800, height=600, padding=80
  const WIDTH = 800;
  const HEIGHT = 600;
  const PAD = 80;

  const PLOT_LEFT = PAD;
  const PLOT_RIGHT = WIDTH - PAD * 2;
  const PLOT_TOP = PAD;
  const PLOT_BOTTOM = HEIGHT - PAD;
  const PLOT_W = PLOT_RIGHT - PLOT_LEFT;
  const PLOT_H = PLOT_BOTTOM - PLOT_TOP;

  // Mirror xMax logic from ScreePlot
  let xMax = numFacs;
  if (xMax < 3) xMax = 3;
  if (xMax > 8) xMax = 8;

  // Mirror yMax logic — ceiling of highest eigenvalue across all visible data
  const allData = [...data, ...(showMeans ? means : []), ...(showP95 ? p95 : [])];
  const yMax = Math.ceil(Math.max(...allData.map((d) => d[1])));

  // Scale functions matching d3.scaleLinear ranges in ScreePlot
  const scaleX = (x) => PLOT_LEFT + (x / xMax) * PLOT_W;
  const scaleY = (y) => PLOT_BOTTOM - (y / yMax) * PLOT_H;

  let cellId = 2;
  const cells = [];

  // ── 1. PLOT BORDER ─────────────────────────────────────────────────────────
  cells.push(`
        <mxCell id="${cellId++}" value="" style="shape=mxgraph.basic.rect;fillColor=#ffffff;strokeColor=#000000;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="${PLOT_LEFT}" y="${PLOT_TOP}" width="${PLOT_W}" height="${PLOT_H}" as="geometry" />
        </mxCell>`);

  // ── 2. AXIS TITLES ─────────────────────────────────────────────────────────
  // "Factor Number" — centered below the plot (mirrors x=300 y=590)
  cells.push(`
        <mxCell id="${cellId++}" value="Factor Number" style="text;html=0;align=center;verticalAlign=top;fontSize=13;fontFamily=Arial;fontColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${PLOT_LEFT}" y="${PLOT_BOTTOM + 16}" width="${PLOT_W}" height="20" as="geometry" />
        </mxCell>`);

  // "Eigenvalue" — rotated label on the left (draw.io rotation via style)
  cells.push(`
        <mxCell id="${cellId++}" value="Eigenvalue" style="text;html=0;align=center;verticalAlign=bottom;fontSize=13;fontFamily=Arial;fontColor=#000000;rotation=-90;" vertex="1" parent="1">
          <mxGeometry x="${PLOT_LEFT - 76}" y="${PLOT_TOP + PLOT_H / 2}" width="100" height="20" as="geometry" />
        </mxCell>`);

  // ── 3. Y-AXIS TICK LABELS ──────────────────────────────────────────────────
  // Integer ticks from 0 to yMax, mirroring AxisLeft.tickValues
  for (let i = 0; i <= yMax; i++) {
    const ty = scaleY(i);
    cells.push(`
        <mxCell id="${cellId++}" value="${i}" style="text;html=0;align=right;verticalAlign=middle;fontSize=11;fontFamily=Arial;fontColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${PLOT_LEFT - 36}" y="${ty - 8}" width="30" height="16" as="geometry" />
        </mxCell>`);
  }

  // ── 4. X-AXIS TICK LABELS ──────────────────────────────────────────────────
  // Integer ticks 1..xMax, mirroring AxisBottom
  for (let i = 1; i <= xMax; i++) {
    const tx = scaleX(i);
    cells.push(`
        <mxCell id="${cellId++}" value="${i}" style="text;html=0;align=center;verticalAlign=top;fontSize=11;fontFamily=Arial;fontColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${tx - 12}" y="${PLOT_BOTTOM + 4}" width="24" height="16" as="geometry" />
        </mxCell>`);
  }

  // ── helper: polyline from [x,y] data pairs ─────────────────────────────────
  const addPolyline = (points, strokeDasharray = '', label = '', labelStyle = '') => {
    if (!points.length) return;

    for (let i = 0; i < points.length - 1; i++) {
      const x1 = scaleX(points[i][0]);
      const y1 = scaleY(points[i][1]);
      const x2 = scaleX(points[i + 1][0]);
      const y2 = scaleY(points[i + 1][1]);

      const dash = strokeDasharray ? `dashed=1;dashPattern=${strokeDasharray};` : 'dashed=0;';

      cells.push(`
        <mxCell id="${cellId++}" value="" style="edgeStyle=none;${dash}strokeColor=#000000;strokeWidth=1.5;endArrow=none;startArrow=none;exitX=;exitY=;entryX=;entryY=;" edge="1" parent="1" source="" target="">
          <mxGeometry relative="1" as="geometry">
            <Array as="points"/>
            <mxPoint x="${x1}" y="${y1}" as="sourcePoint" />
            <mxPoint x="${x2}" y="${y2}" as="targetPoint" />
          </mxGeometry>
        </mxCell>`);
    }

    if (label) {
      const last = points[points.length - 1];
      const lx = scaleX(last[0]) + 12;
      const ly = scaleY(last[1]) - 8;
      cells.push(`
        <mxCell id="${cellId++}" value="${escXml(label)}" style="text;html=0;align=left;verticalAlign=middle;fontSize=11;fontWeight=600;fontFamily=Arial;fontColor=#000000;${labelStyle}" vertex="1" parent="1">
          <mxGeometry x="${lx}" y="${ly}" width="160" height="16" as="geometry" />
        </mxCell>`);
    }
  };

  // ── helper: marker symbols at each data point ──────────────────────────────
  const addMarkers = (points, symbol) => {
    points.forEach(([x, y]) => {
      const cx = scaleX(x);
      const cy = scaleY(y);
      cells.push(`
        <mxCell id="${cellId++}" value="${escXml(symbol)}" style="text;html=0;align=center;verticalAlign=middle;fontSize=14;fontFamily=Arial;fontColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${cx - 8}" y="${cy - 8}" width="16" height="16" as="geometry" />
        </mxCell>`);
    });
  };

  // ── 5. PA REFERENCE LINES (drawn under main line) ─────────────────────────
  // means: dashed (6,4), diamond marker ◆
  if (showMeans && means.length) {
    addPolyline(means, '6 4', 'PA Mean');
    addMarkers(means, '◆');
  }

  // p95: dotted (2,3), triangle marker ▲
  if (showP95 && p95.length) {
    addPolyline(p95, '2 3', 'PA 95th Percentile');
    addMarkers(p95, '▲');
  }

  // ── 6. MAIN EIGENVALUE LINE ────────────────────────────────────────────────
  const mainLabel = showMeans || showP95 ? 'Actual Eigenvalue' : '';
  addPolyline(data, '', mainLabel);

  // ── 7. DATA CIRCLES (white fill, black stroke) ────────────────────────────
  data.forEach(([x, y]) => {
    const cx = scaleX(x);
    const cy = scaleY(y);
    const R = 3.5;
    cells.push(`
        <mxCell id="${cellId++}" value="" style="ellipse;fillColor=#ffffff;strokeColor=#000000;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="${cx - R}" y="${cy - R}" width="${R * 2}" height="${R * 2}" as="geometry" />
        </mxCell>`);
  });

  // ── canvas size ────────────────────────────────────────────────────────────
  const canvasW = WIDTH + 40;
  const canvasH = HEIGHT + 60;

  return `<mxfile host="app.diagrams.net" type="embed" version="26.0.0">
  <diagram id="diagram-1" name="Scree Plot">
    <mxGraphModel dx="1422" dy="762" grid="1" gridSize="10" guides="1"
      tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1"
      pageWidth="${canvasW}" pageHeight="${canvasH}"
      math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        ${cells.join('')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
};

export default buildScreePlotDrawio;
