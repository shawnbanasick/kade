// drawioFromChart.js
const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export default function buildScreeDrawio({
  data,
  xScale,
  yScale,
  yTickValues,
  xTicks,
  width,
  height,
  padding,
}) {
  let id = 2;
  const cells = [];

  const line = (x1, y1, x2, y2, style = 'strokeColor=#000000;') =>
    cells.push(`
      <mxCell id="${id++}" value="" style="endArrow=none;html=1;${style}" edge="1" parent="1">
        <mxGeometry relative="1" as="geometry">
          <mxPoint x="${x1}" y="${y1}" as="sourcePoint"/>
          <mxPoint x="${x2}" y="${y2}" as="targetPoint"/>
        </mxGeometry>
      </mxCell>`);

  const text = (value, x, y, w = 40, h = 20, style = 'align=center;') =>
    cells.push(`
      <mxCell id="${id++}" value="${esc(value)}" style="text;html=1;verticalAlign=middle;fontSize=10;${style}" vertex="1" parent="1">
        <mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/>
      </mxCell>`);

  const circle = (cx, cy, r = 4) =>
    cells.push(`
      <mxCell id="${id++}" value="" style="ellipse;html=1;aspect=fixed;fillColor=#000000;strokeColor=#000000;" vertex="1" parent="1">
        <mxGeometry x="${cx - r}" y="${cy - r}" width="${r * 2}" height="${r * 2}" as="geometry"/>
      </mxCell>`);

  const x0 = xScale(0);
  const yBottom = height - padding;
  const xEnd = xScale.range()[1];
  const yTop = yScale.range()[1];

  // Axes
  line(x0, yBottom, xEnd, yBottom);
  line(padding, yBottom, padding, yTop);

  // X ticks + labels
  xTicks.forEach((t) => {
    const x = xScale(t);
    line(x, yBottom, x, yBottom + 6);
    text(t, x - 20, yBottom + 8);
  });

  // Y ticks + labels
  yTickValues.forEach((t) => {
    const y = yScale(t);
    line(padding - 6, y, padding, y);
    text(t, padding - 36, y - 10, 28, 20, 'align=right;');
  });

  // Data line segments + points (assumes data = [[x, y], ...])
  for (let i = 0; i < data.length - 1; i++) {
    line(
      xScale(data[i][0]),
      yScale(data[i][1]),
      xScale(data[i + 1][0]),
      yScale(data[i + 1][1]),
      'strokeColor=#1f77b4;strokeWidth=2;'
    );
  }
  data.forEach(([x, y]) => circle(xScale(x), yScale(y)));

  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net">
  <diagram name="Scree Plot" id="scree1">
    <mxGraphModel pageWidth="${width + 40}" pageHeight="${height + 40}" page="1" grid="1" gridSize="10">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>${cells.join('')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
