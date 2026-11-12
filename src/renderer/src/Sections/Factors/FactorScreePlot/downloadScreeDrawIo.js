// buildScreePlotDrawio.js

const FONT_FAMILY = 'Arial';

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
  const WIDTH = 800;
  const HEIGHT = 600;
  const PAD = 80;

  const PLOT_LEFT = PAD;
  const PLOT_RIGHT = WIDTH - PAD * 2;
  const PLOT_TOP = PAD;
  const PLOT_BOTTOM = HEIGHT - PAD;
  const PLOT_W = PLOT_RIGHT - PLOT_LEFT;
  const PLOT_H = PLOT_BOTTOM - PLOT_TOP;

  let xMax = numFacs;
  if (xMax < 3) xMax = 3;
  if (xMax > 8) xMax = 8;

  const allData = [...data, ...(showMeans ? means : []), ...(showP95 ? p95 : [])];
  const yMax = Math.ceil(Math.max(...allData.map((d) => d[1])));

  const scaleX = (x) => PLOT_LEFT + (x / xMax) * PLOT_W;
  const scaleY = (y) => PLOT_BOTTOM - (y / yMax) * PLOT_H;

  let cellId = 2;
  const cells = [];

  // ── Helpers ────────────────────────────────────────────────────────────────

  // Single place where every text cell is built. Uses an HTML label with an
  // explicit <font face> wrapper AND fontFamily in the style, so the font
  // survives different renderers and exports.
  const addText = ({ label, x, y, w, h, style = '' }) => {
    // Escape the label text as HTML first, wrap it, then escape the whole
    // thing again so it is safe inside the XML attribute.
    // const html = `<font face="${FONT_FAMILY}">${escXml(label)}</font>`;
    cells.push(`
        <mxCell id="${cellId++}" value="${escXml(label)}" style="text;html=1;whiteSpace=nowrap;fontFamily=${FONT_FAMILY};fontColor=#000000;${style}" vertex="1" parent="1">
          <mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry" />
        </mxCell>`);
  };

  const addLine = (x1, y1, x2, y2, dashPattern) => {
    const dash = dashPattern ? `dashed=1;dashPattern=${dashPattern};` : 'dashed=0;';
    cells.push(`
        <mxCell id="${cellId++}" value="" style="endArrow=none;startArrow=none;html=1;${dash}strokeColor=#000000;strokeWidth=1.5;" edge="1" parent="1">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="${x1}" y="${y1}" as="sourcePoint" />
            <mxPoint x="${x2}" y="${y2}" as="targetPoint" />
          </mxGeometry>
        </mxCell>`);
  };

  const addPolyline = (points, dashPattern = '', label = '') => {
    if (!points.length) return;

    for (let i = 0; i < points.length - 1; i++) {
      addLine(
        scaleX(points[i][0]),
        scaleY(points[i][1]),
        scaleX(points[i + 1][0]),
        scaleY(points[i + 1][1]),
        dashPattern
      );
    }

    if (label) {
      const last = points[points.length - 1];
      addText({
        label,
        x: scaleX(last[0]) + 12,
        y: scaleY(last[1]) - 8,
        w: 160,
        h: 16,
        style: 'align=left;verticalAlign=middle;fontSize=11;fontStyle=1;',
      });
    }
  };

  // Real shapes instead of text glyphs (◆ ▲), so no font fallback is involved.
  const addMarkers = (points, shapeStyle) => {
    const S = 10;
    points.forEach(([x, y]) => {
      cells.push(`
        <mxCell id="${cellId++}" value="" style="${shapeStyle}fillColor=#000000;strokeColor=#000000;html=1;" vertex="1" parent="1">
          <mxGeometry x="${scaleX(x) - S / 2}" y="${scaleY(y) - S / 2}" width="${S}" height="${S}" as="geometry" />
        </mxCell>`);
    });
  };

  // ── 1. PLOT BORDER ─────────────────────────────────────────────────────────
  cells.push(`
        <mxCell id="${cellId++}" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="${PLOT_LEFT}" y="${PLOT_TOP}" width="${PLOT_W}" height="${PLOT_H}" as="geometry" />
        </mxCell>`);

  // ── 2. AXIS TITLES ─────────────────────────────────────────────────────────
  addText({
    label: 'Factor Number',
    x: PLOT_LEFT,
    y: PLOT_BOTTOM + 16,
    w: PLOT_W,
    h: 20,
    style: 'align=center;verticalAlign=top;fontSize=13;',
  });

  // Rotated label: draw.io rotates around the geometry's center, so position
  // the box by its desired center point.
  const eigCx = PLOT_LEFT - 55;
  const eigCy = PLOT_TOP + PLOT_H / 2;
  addText({
    label: 'Eigenvalue',
    x: eigCx - 50,
    y: eigCy - 10,
    w: 100,
    h: 20,
    style: 'align=center;verticalAlign=middle;fontSize=13;rotation=-90;',
  });

  // ── 3. Y-AXIS TICK LABELS ──────────────────────────────────────────────────
  for (let i = 0; i <= yMax; i++) {
    addText({
      label: String(i),
      x: PLOT_LEFT - 36,
      y: scaleY(i) - 8,
      w: 30,
      h: 16,
      style: 'align=right;verticalAlign=middle;fontSize=11;',
    });
  }

  // ── 4. X-AXIS TICK LABELS ──────────────────────────────────────────────────
  for (let i = 1; i <= xMax; i++) {
    addText({
      label: String(i),
      x: scaleX(i) - 12,
      y: PLOT_BOTTOM + 4,
      w: 24,
      h: 16,
      style: 'align=center;verticalAlign=top;fontSize=11;',
    });
  }

  // ── 5. PA REFERENCE LINES (drawn under main line) ─────────────────────────
  if (showMeans && means.length) {
    addPolyline(means, '6 4', 'PA Mean');
    addMarkers(means, 'rhombus;');
  }

  if (showP95 && p95.length) {
    addPolyline(p95, '2 3', 'PA 95th Percentile');
    addMarkers(p95, 'triangle;direction=north;');
  }

  // ── 6. MAIN EIGENVALUE LINE ────────────────────────────────────────────────
  const mainLabel = showMeans || showP95 ? 'Actual Eigenvalue' : '';
  addPolyline(data, '', mainLabel);

  // ── 7. DATA CIRCLES (white fill, black stroke) ────────────────────────────
  const R = 3.5;
  data.forEach(([x, y]) => {
    cells.push(`
        <mxCell id="${cellId++}" value="" style="ellipse;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="${scaleX(x) - R}" y="${scaleY(y) - R}" width="${R * 2}" height="${R * 2}" as="geometry" />
        </mxCell>`);
  });

  // ── canvas size ────────────────────────────────────────────────────────────
  const canvasW = WIDTH + 40;
  const canvasH = HEIGHT + 60;

  return `<mxfile host="app.diagrams.net" type="embed" version="26.0.0">
  <diagram id="diagram-1" name="Scree Plot">
    <mxGraphModel dx="1422" dy="762" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${canvasW}" pageHeight="${canvasH}" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        ${cells.join('\n')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
};

export default buildScreePlotDrawio;
