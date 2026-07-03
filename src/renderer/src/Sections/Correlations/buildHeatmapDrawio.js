// buildHeatmapDrawio.js

const escXml = (str) =>
  String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * Converts heatmap correlation data into a native draw.io mxfile XML.
 *
 * @param {object} params
 * @param {Array}   params.correlationData  - gridRowData from correlationState
 * @param {string}  params.title            - chart title
 * @param {string}  params.subtitle         - chart subtitle
 * @param {number}  params.width            - SVG width (default 600)
 * @param {number}  params.height           - SVG height (default 600)
 */
const buildHeatmapDrawio = ({
  correlationData = [],
  title = '',
  subtitle = '',
  width = 600,
  height = 600,
}) => {
  if (!correlationData.length) return null;

  // ── Mirrors Heatmap.jsx layout constants ───────────────────────────────────
  const margin = { top: 120, right: 25, bottom: 30, left: 150 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Extract labels — mirrors Heatmap.jsx
  const firstRow = correlationData[0];
  const respondentLabels = Object.keys(firstRow).filter((key) => key !== 'respondent');
  const allRespondents = correlationData.map((d) => d.respondent);
  const reversedRespondents = [...allRespondents].reverse();

  const n = allRespondents.length;

  // Band scale mirrors d3.scaleBand with padding=0.05
  const padding = 0.05;
  const bandWidth = (chartWidth / n) * (1 - padding);
  const bandHeight = (chartHeight / n) * (1 - padding);
  const stepX = chartWidth / n;
  const stepY = chartHeight / n;

  // x(label) mirrors d3.scaleBand().domain(allRespondents)
  const xBand = (label) => {
    const i = allRespondents.indexOf(label);
    return margin.left + i * stepX + stepX * (padding / 2);
  };

  // y(label) mirrors d3.scaleBand().domain(reversedRespondents)
  const yBand = (label) => {
    const i = allRespondents.indexOf(label);
    return margin.top + i * stepY + stepY * (padding / 2);
  };

  // ── Color scale — mirrors d3.scaleLinear diverging ─────────────────────────
  const flatData = [];
  correlationData.forEach((row) => {
    respondentLabels.forEach((colLabel) => {
      flatData.push({ row: row.respondent, col: colLabel, value: row[colLabel] });
    });
  });

  const allValues = flatData.map((d) => d.value);
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);

  // Interpolate between blue (#2563eb) → light (#f3f4f6) → red (#dc2626)
  const hexToRgb = (hex) => ({
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  });
  const rgbToHex = ({ r, g, b }) =>
    '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
  const lerp = (a, b, t) => a + (b - a) * t;
  const lerpColor = (c1, c2, t) => ({
    r: lerp(c1.r, c2.r, t),
    g: lerp(c1.g, c2.g, t),
    b: lerp(c1.b, c2.b, t),
  });

  const blue = hexToRgb('#2563eb');
  const light = hexToRgb('#f3f4f6');
  const red = hexToRgb('#dc2626');

  const colorScale = (value) => {
    if (value <= 0) {
      const t = minValue === 0 ? 0 : value / minValue; // 0→light, minValue→blue
      return rgbToHex(lerpColor(light, blue, t));
    } else {
      const t = maxValue === 0 ? 0 : value / maxValue; // 0→light, maxValue→red
      return rgbToHex(lerpColor(light, red, t));
    }
  };

  // Text color mirrors Heatmap.jsx: white if absValue > 50, dark otherwise
  const textColor = (value) => (Math.abs(value) > 50 ? '#ffffff' : '#1f2937');

  let cellId = 2;
  const cells = [];

  // ── 1. TITLE ───────────────────────────────────────────────────────────────
  if (title) {
    cells.push(`
        <mxCell id="${cellId++}" value="${escXml(title)}" style="text;html=0;align=left;verticalAlign=middle;fontSize=22;fontStyle=1;fontFamily=Arial;fontColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${margin.left}" y="${margin.top - 90}" width="${chartWidth}" height="30" as="geometry" />
        </mxCell>`);
  }

  // ── 2. SUBTITLE ────────────────────────────────────────────────────────────
  if (subtitle) {
    cells.push(`
        <mxCell id="${cellId++}" value="${escXml(subtitle)}" style="text;html=0;align=left;verticalAlign=middle;fontSize=12;fontFamily=Arial;fontColor=#6b7280;" vertex="1" parent="1">
          <mxGeometry x="${margin.left}" y="${margin.top - 50}" width="${chartWidth}" height="20" as="geometry" />
        </mxCell>`);
  }

  // ── 3. X-AXIS LABELS (top, rotated -45°) ──────────────────────────────────
  // Mirrors: axisTop(x), text rotated -45, anchor=start
  allRespondents.forEach((label) => {
    const cx = xBand(label) + bandWidth / 2;
    cells.push(`
        <mxCell id="${cellId++}" value="${escXml(label)}" style="text;html=0;align=left;verticalAlign=bottom;fontSize=11;fontFamily=Arial;fontColor=#000000;rotation=-45;" vertex="1" parent="1">
          <mxGeometry x="${cx - 16}" y="${margin.top - 40}" width="80" height="16" as="geometry" />
        </mxCell>`);
  });

  // ── 4. Y-AXIS LABELS (left, right-aligned) ─────────────────────────────────
  // Mirrors: axisLeft(y), domain(reversedRespondents)
  allRespondents.forEach((label) => {
    const cy = yBand(label) + bandHeight / 2;
    cells.push(`
        <mxCell id="${cellId++}" value="${escXml(label)}" style="text;html=0;align=right;verticalAlign=middle;fontSize=11;fontFamily=Arial;fontColor=#000000;" vertex="1" parent="1">
          <mxGeometry x="${margin.left - 140}" y="${cy - 8}" width="130" height="16" as="geometry" />
        </mxCell>`);
  });

  // ── 5. HEATMAP CELLS + VALUE LABELS ───────────────────────────────────────
  flatData.forEach(({ row, col, value }) => {
    const x = xBand(col);
    const y = yBand(row);
    const bg = colorScale(value);
    const fg = textColor(value);

    // Colored rectangle (rx/ry=4 → rounded=4 in draw.io)
    cells.push(`
        <mxCell id="${cellId++}" value="" style="rounded=1;arcSize=6;fillColor=${bg};strokeColor=none;opacity=80;" vertex="1" parent="1">
          <mxGeometry x="${x}" y="${y}" width="${bandWidth}" height="${bandHeight}" as="geometry" />
        </mxCell>`);

    // Value label centered in cell
    cells.push(`
        <mxCell id="${cellId++}" value="${escXml(value)}" style="text;html=0;align=center;verticalAlign=middle;fontSize=10;fontFamily=Arial;fontColor=${fg};" vertex="1" parent="1">
          <mxGeometry x="${x}" y="${y}" width="${bandWidth}" height="${bandHeight}" as="geometry" />
        </mxCell>`);
  });

  // ── Canvas bounds ──────────────────────────────────────────────────────────
  const canvasW = width + 40;
  const canvasH = height + 40;

  return `<mxfile host="app.diagrams.net" type="embed" version="26.0.0">
  <diagram id="diagram-1" name="Heatmap">
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

export default buildHeatmapDrawio;
