/**
 * Converts ReactFlow graph data to Draw.io (.drawio) XML format
 * Draw.io uses mxGraph XML with embedded compressed/encoded data
 */

const exportToDrawio = (nodes, edges) => {
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

    return `<mxCell id="${id}" value="${node.data.label}" style="rounded=0;whiteSpace=wrap;html=1;" vertex="1" parent="1">
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

    return `<mxCell id="${id}" value="${edge.label || ''}" style="${style}" edge="1" parent="1" source="${sourceId}" target="${targetId}">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>`;
  });

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
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

  return mxGraphModel;
};

export default exportToDrawio;
