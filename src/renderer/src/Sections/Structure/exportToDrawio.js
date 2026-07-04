/**
 * Converts ReactFlow graph data to Draw.io (.drawio) XML format
 * Draw.io uses mxGraph XML with embedded compressed/encoded data
 */

// Escapes characters that aren't allowed to appear literally inside an XML
// attribute value. Without this, a label containing '<', '>', '&', or '"'
// (e.g. "Negative (r < 0)") produces invalid XML that draw.io will refuse
// to open ("not a diagram file").
const escapeXml = (str) => {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

// Builds the legend as native, editable mxCells (a background rectangle,
// a title text cell, and one line+label pair per legend item) instead of
// an embedded image, so it always renders and can be moved/edited in draw.io.
const buildLegendCells = (legendX, legendY, startCellId) => {
  const items = [
    { label: 'Strong (r > .9)', strokeWidth: 3, dashed: false },
    { label: 'Weak (r \u2264 .9)', strokeWidth: 1.5, dashed: false },
    { label: 'Negative (r < 0)', strokeWidth: 1.5, dashed: true },
  ];

  const lineLength = 36;
  const rowHeight = 22;
  const paddingX = 12;
  const paddingY = 10;
  const textOffset = lineLength + 10;
  const width = 155;
  const height = items.length * rowHeight + paddingY * 2 + 12;

  let id = startCellId;
  const cells = [];

  // Background rectangle
  const bgId = id++;
  cells.push(`<mxCell id="${bgId}" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#cccccc;" vertex="1" parent="1">
          <mxGeometry x="${legendX}" y="${legendY}" width="${width}" height="${height}" as="geometry"/>
        </mxCell>`);

  // Title
  const titleId = id++;
  cells.push(`<mxCell id="${titleId}" value="Correlation Links" style="text;html=1;align=left;verticalAlign=middle;fontSize=11;fontStyle=1;fontColor=#333333;" vertex="1" parent="1">
          <mxGeometry x="${legendX + paddingX}" y="${legendY + paddingY}" width="${width - paddingX * 2}" height="16" as="geometry"/>
        </mxCell>`);

  // One floating line (edge with explicit points, no source/target vertex)
  // plus a label per legend item.
  items.forEach((item, i) => {
    const rowY = legendY + paddingY + 32 + i * rowHeight;
    const x1 = legendX + paddingX;
    const x2 = x1 + lineLength;

    const lineId = id++;
    const dashStyle = item.dashed ? 'dashed=1;dashPattern=6 3;' : 'dashed=0;';
    cells.push(`<mxCell id="${lineId}" value="" style="endArrow=classic;html=1;strokeWidth=${item.strokeWidth};${dashStyle}strokeColor=#000000;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="${x1}" y="${rowY}" as="sourcePoint"/>
            <mxPoint x="${x2}" y="${rowY}" as="targetPoint"/>
          </mxGeometry>
        </mxCell>`);

    const labelId = id++;
    cells.push(`<mxCell id="${labelId}" value="${escapeXml(item.label)}" style="text;html=1;align=left;verticalAlign=middle;fontSize=10;fontColor=#333333;" vertex="1" parent="1">
          <mxGeometry x="${legendX + paddingX + textOffset}" y="${rowY - 8}" width="120" height="16" as="geometry"/>
        </mxCell>`);
  });

  return { cells, width, height, nextCellId: id };
};

const exportToDrawio = (nodes, edges, options = {}) => {
  const { includeLegend = true } = options;

  // Draw.io stores coordinates differently - need to scale and offset
  const scale = 1;
  const offsetX = 50;
  const offsetY = 50;

  // Build mxGraph cells - nodes become mxCell rectangles, edges become connectors
  let cellId = 2; // 0 and 1 are reserved for root and default parent

  const nodeCells = nodes.map((node) => {
    const id = cellId++;
    const x = node.position.x * scale + offsetX;
    const y = node.position.y * scale + offsetY;
    const width = node.style?.width || 100;
    const height = node.style?.height || 40;

    return `<mxCell id="${id}" value="${escapeXml(node.data.label)}" style="rounded=0;whiteSpace=wrap;html=1;" vertex="1" parent="1">
          <mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/>
        </mxCell>`;
  });

  // Create a lookup from node id to mxCell id
  const nodeIdToMxId = {};
  nodes.forEach((node, idx) => {
    nodeIdToMxId[node.id] = idx + 2; // cellId starts at 2
  });

  const edgeCells = edges.map((edge) => {
    const id = cellId++;
    const sourceId = nodeIdToMxId[edge.source];
    const targetId = nodeIdToMxId[edge.target];

    // Determine style based on edge properties
    let strokeWidth = 1;
    let dashed = 0;

    if (edge.style?.strokeWidth) {
      strokeWidth = edge.style.strokeWidth;
    }
    if (edge.style?.strokeDasharray) {
      dashed = 1;
    }

    const style = `rounded=0;html=1;strokeWidth=${strokeWidth};dashed=${dashed};endArrow=classic;`;

    return `<mxCell id="${id}" value="${escapeXml(edge.label || '')}" style="${style}" edge="1" parent="1" source="${sourceId}" target="${targetId}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>`;
  });

  // Optionally build the legend as native, editable mxCells, positioned
  // just to the right of the rightmost node.
  let legendCells = [];
  if (includeLegend && nodes.length > 0) {
    const maxX = Math.max(
      ...nodes.map((node) => node.position.x * scale + offsetX + (node.style?.width || 100))
    );

    const legendX = maxX + 40;
    const legendY = offsetY;

    const result = buildLegendCells(legendX, legendY, cellId);
    legendCells = result.cells;
    cellId = result.nextCellId;
  }

  // Construct the full Draw.io XML structure
  const mxGraphModel = `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="${new Date().toISOString()}" agent="ReactFlow Export" version="21.6.5" etag="export" type="device">
  <diagram name="Structure Model" id="structure-model">
    <mxGraphModel dx="1422" dy="794" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="2000" pageHeight="2000" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${nodeCells.join('\n        ')}
        ${edgeCells.join('\n        ')}
        ${legendCells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

  return mxGraphModel;
};

export default exportToDrawio;
