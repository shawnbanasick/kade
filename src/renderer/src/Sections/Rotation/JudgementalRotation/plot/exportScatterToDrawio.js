const FONT = 'fontFamily=Arial;';
const PAD = 40; // margin around the plot in the .drawio canvas

const escapeXml = (str) =>
  String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

// 'rgb(1, 2, 3)' / 'rgba(...)' -> '#010203'; 'none' / transparent -> 'none'
const toHex = (css) => {
  if (!css || css === 'none') return 'none';
  const m = css.match(/rgba?\(([^)]+)\)/);
  if (!m) return css.startsWith('#') ? css : 'none';
  const [r, g, b, a = 1] = m[1].split(',').map((v) => parseFloat(v));
  if (a === 0) return 'none';
  return `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;
};

const rectIn = (el, origin) => {
  const r = el.getBoundingClientRect();
  return {
    x: r.left - origin.left,
    y: r.top - origin.top,
    w: r.width,
    h: r.height,
    cx: r.left - origin.left + r.width / 2,
    cy: r.top - origin.top + r.height / 2,
  };
};

/**
 * svgEl:   the live <svg> element of the scatter plot
 * options: { width, height, padding } - the same props given to <ScatterPlot>
 *          (the plot area is the box inset by `padding`, domain -1..1)
 */
const exportScatterToDrawio = (svgEl, { width, height, padding = 30 } = {}) => {
  const origin = svgEl.getBoundingClientRect();
  let id = 2;
  const cells = [];

  const vertex = (value, style, x, y, w, h) =>
    cells.push(
      `<mxCell id="${id++}" value="${escapeXml(value)}" style="${escapeXml(style)}" vertex="1" parent="1">` +
        `<mxGeometry x="${Math.round(x + PAD)}" y="${Math.round(y + PAD)}" width="${Math.max(
          1,
          Math.round(w)
        )}" height="${Math.max(1, Math.round(h))}" as="geometry"/></mxCell>`
    );

  const line = (x1, y1, x2, y2, color = '#000000', w = 1) =>
    cells.push(
      `<mxCell id="${id++}" value="" style="endArrow=none;strokeColor=${color};strokeWidth=${w};" edge="1" parent="1">` +
        `<mxGeometry relative="1" as="geometry">` +
        `<mxPoint x="${Math.round(x1 + PAD)}" y="${Math.round(y1 + PAD)}" as="sourcePoint"/>` +
        `<mxPoint x="${Math.round(x2 + PAD)}" y="${Math.round(y2 + PAD)}" as="targetPoint"/>` +
        `</mxGeometry></mxCell>`
    );

  // ── Plot frame and origin axes (domain is -1..1, so the origin is the centre) ──
  const left = padding;
  const right = width - padding;
  const top = padding;
  const bottom = height - padding;
  vertex(
    '',
    'rounded=0;fillColor=none;strokeColor=#cccccc;',
    left,
    top,
    right - left,
    bottom - top
  );
  line((left + right) / 2, top, (left + right) / 2, bottom, '#666666', 1); // y axis
  line(left, (top + bottom) / 2, right, (top + bottom) / 2, '#666666', 1); // x axis

  // ── Circles ──
  const circles = [...svgEl.querySelectorAll('circle')].map((el) => {
    const cs = getComputedStyle(el);
    return {
      rect: rectIn(el, origin),
      fill: toHex(cs.fill),
      stroke: toHex(cs.stroke),
      strokeWidth: parseFloat(cs.strokeWidth) || 1,
      fillOpacity: Math.round((parseFloat(cs.fillOpacity) || 1) * 100),
      label: null,
    };
  });

  // ── Texts: attach to a circle when centred on one, otherwise standalone ──
  const standalone = [];
  svgEl.querySelectorAll('text').forEach((el) => {
    const content = (el.textContent || '').trim();
    if (!content) return;
    const rect = rectIn(el, origin);
    const cs = getComputedStyle(el);
    const fontSize = Math.round(parseFloat(cs.fontSize) || 11);
    const owner = circles.find(
      (c) =>
        !c.label &&
        Math.hypot(c.rect.cx - rect.cx, c.rect.cy - rect.cy) <= Math.max(c.rect.w, c.rect.h) / 2
    );
    if (owner) {
      owner.label = { content, fontSize };
    } else {
      standalone.push({ content, rect, fontSize, color: toHex(cs.fill) });
    }
  });

  // Draw order: circles first, then loose text on top
  circles.forEach((c) => {
    const style =
      `ellipse;whiteSpace=wrap;html=0;${FONT}fontStyle=1;fontSize=${c.label?.fontSize ?? 10};` +
      `verticalAlign=middle;fillColor=${c.fill};strokeColor=${c.stroke};strokeWidth=${c.strokeWidth};` +
      `fillOpacity=${c.fillOpacity};fontColor=#000000;`;
    vertex(c.label?.content ?? '', style, c.rect.x, c.rect.y, c.rect.w, c.rect.h);
  });

  standalone.forEach((t) => {
    const w = t.rect.w + 8;
    const h = t.rect.h + 4;
    const fontColor = t.color === 'none' ? '#000000' : t.color;
    const style =
      `text;html=0;align=center;verticalAlign=middle;strokeColor=none;fillColor=none;${FONT}` +
      `fontSize=${t.fontSize};fontColor=${fontColor};`;
    vertex(t.content, style, t.rect.cx - w / 2, t.rect.cy - h / 2, w, h);
  });

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<mxfile host="app.diagrams.net" version="21.0.0">\n` +
    `  <diagram name="Rotation Scatter Plot">\n` +
    `    <mxGraphModel dx="1422" dy="762" grid="0" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="0" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">\n` +
    `      <root>\n        <mxCell id="0"/>\n        <mxCell id="1" parent="0"/>\n` +
    cells.join('\n') +
    `\n      </root>\n    </mxGraphModel>\n  </diagram>\n</mxfile>`
  );
};

export default exportScatterToDrawio;
