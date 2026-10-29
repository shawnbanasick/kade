import * as d3 from 'd3';
// rect-column-chart.js
//
// ES module for a D3-based "rectangle column chart": a header row of values
// from -6 to +13, with a column of small gray rectangles stacked beneath
// each header value. Only headers that have a value (count > 0) are shown.
// The chart fills the width of its container: the visible columns stretch
// to use all available space and the chart re-renders when the container
// is resized.

/**
 * Renders a simple inline error message inside the chart container.
 * @param {d3.Selection} container - d3-selected container element.
 * @param {string} message - Error message to display.
 */
export function renderError(container, message) {
  container
    .append('div')
    .attr(
      'class',
      'text-red-400 bg-red-950/40 border border-red-900 rounded-md px-3.5 py-2.5 text-[13px] max-w-xs'
    )
    .text(`⚠ ${message}`);
}

/**
 * Renders a header row plus a column of small gray rectangles beneath each
 * header value. Empty headers (0, null, undefined, NaN) are omitted, and the
 * remaining columns stretch to fill the container's width. A ResizeObserver
 * keeps the chart in sync when the container's width changes.
 *
 * @param {string} containerSelector - CSS selector for the container element.
 * @param {number[]} data - Array of up to 20 numbers, one per header value
 *                           (-6..13). Missing positions count as empty;
 *                           longer arrays trigger an in-component error.
 * @param {object} [options] - Optional configuration overrides.
 * @param {number} [options.cellSize=10] - Rectangle height (and width when
 *                           `squareCells` is true and space is limited).
 * @param {number} [options.cellGap=1.5] - Gap between stacked rectangles.
 * @param {number} [options.colGap=3] - Gap between columns.
 * @param {number} [options.headerHeight=22] - Space reserved for header labels.
 * @param {number} [options.fontSize=10] - Max header font size (shrinks if
 *                           columns get too narrow).
 * @param {number} [options.maxCellWidth=Infinity] - Cap on rectangle width.
 *                           Useful so a handful of columns don't become huge.
 * @param {boolean} [options.squareCells=false] - If true, rectangle height
 *                           follows the (stretched) width instead of `cellSize`.
 * @param {number} [options.maxWidth=290] - Maximum width of the entire chart
 *                           in px. The chart fills its container up to this limit.
 * @param {number} [options.fallbackWidth=290] - Width used if the container
 *                           has no measurable width.
 * @param {(count: number) => string} [options.colorScale] - Optional custom
 *                           color function (rect count -> color).
 * @returns {SVGSVGElement|null} The rendered <svg> node, or null on error
 *                           or when there is nothing to show.
 */
export function renderRectColumnChart(containerSelector, data, options = {}) {
  const headerValues = d3.range(-6, 14); // -6 to +13 inclusive => 20 values

  const container = d3.select(containerSelector);
  const node = container.node();

  // Tear down any previous observer before re-rendering
  if (node && node.__rectChartObserver) {
    node.__rectChartObserver.disconnect();
    node.__rectChartObserver = null;
  }
  container.selectAll('*').remove();

  if (!Array.isArray(data)) {
    renderError(container, `Expected an array of numbers, got ${typeof data}.`);
    return null;
  }
  if (data.length > headerValues.length) {
    renderError(container, `Array too long: expected at most 20 numbers.`);
    return null;
  }

  // Pair each header with its value, keeping only headers that have one.
  const visible = headerValues
    .map((header, i) => ({ header, count: Math.floor(Number(data[i])) }))
    .filter((d) => Number.isFinite(d.count) && d.count > 0);

  if (visible.length === 0) {
    renderError(container, 'No values to display.');
    return null;
  }

  const opts = Object.assign(
    {
      cellSize: 10,
      cellGap: 1.5,
      colGap: 3,
      headerHeight: 22,
      sidePad: 4, // keeps edge header labels from clipping
      fontSize: 10,
      maxCellWidth: Infinity,
      squareCells: false,
      maxWidth: 290, // hard cap on the total chart width in px
      fallbackWidth: 290,
      colorScale: null,
    },
    options
  );
  const colorScale = opts.colorScale || (() => '#6e6e6e');

  // Cap the container itself so the element's footprint matches the chart
  // (otherwise the SVG is 290px but the surrounding box stays full width).
  container.style('width', '100%').style('max-width', `${opts.maxWidth}px`);

  const maxCount = d3.max(visible, (d) => d.count);

  function draw(totalWidth) {
    container.selectAll('svg').remove();

    const n = visible.length;
    const available = Math.max(0, totalWidth - opts.sidePad * 2);

    // Columns stretch to fill the available width
    const stretched = (available - opts.colGap * (n - 1)) / n;
    const cellWidth = Math.max(2, Math.min(stretched, opts.maxCellWidth));
    const cellHeight = opts.squareCells ? cellWidth : opts.cellSize;
    const colWidth = cellWidth + opts.colGap;
    const innerWidth = colWidth * n - opts.colGap;

    // Center the columns if maxCellWidth leaves spare room
    const offsetX = Math.max(opts.sidePad, (totalWidth - innerWidth) / 2);

    // Shrink header text if columns get too narrow for it
    const fontSize = Math.max(6, Math.min(opts.fontSize, colWidth / 1.4));

    const height = opts.headerHeight + maxCount * (cellHeight + opts.cellGap);

    const svg = container
      .append('svg')
      .attr('width', totalWidth)
      .attr('height', height)
      .attr('viewBox', `0 0 ${totalWidth} ${height}`)
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .style('display', 'block')
      .style('max-width', '100%');

    const root = svg.append('g').attr('transform', `translate(${offsetX}, 0)`);

    // --- Header row ---
    const header = root.append('g');

    header
      .selectAll('text.header-label')
      .data(visible)
      .join('text')
      .attr('class', (d) =>
        d.header === 0
          ? 'header-label fill-red-600 font-bold'
          : 'header-label fill-gray-800 font-bold'
      )
      .attr('font-size', fontSize)
      .attr('text-anchor', 'middle')
      .attr('x', (d, i) => i * colWidth + cellWidth / 2)
      .attr('y', opts.headerHeight - 8)
      .text((d) => d.header);

    header
      .append('line')
      .attr('class', 'stroke-gray-800')
      .attr('stroke-width', 1)
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', opts.headerHeight - 4)
      .attr('y2', opts.headerHeight - 4);

    // --- Rectangle columns ---
    const columns = root
      .append('g')
      .selectAll('g.column')
      .data(visible)
      .join('g')
      .attr('class', 'column')
      .attr('transform', (d, i) => `translate(${i * colWidth}, 0)`);

    columns.each(function ({ count }) {
      d3.select(this)
        .selectAll('rect.cell-rect')
        .data(d3.range(count))
        .join('rect')
        .attr('class', 'cell-rect stroke-gray-650')
        .attr('stroke-width', 1)
        .attr('rx', 2)
        .attr('width', cellWidth)
        .attr('height', cellHeight)
        .attr('x', 0)
        .attr('y', (d, i) => opts.headerHeight + (count - 1 - i) * (cellHeight + opts.cellGap))
        .attr('fill', colorScale(count));
    });

    return svg.node();
  }

  const measure = () => Math.min(node.clientWidth || opts.fallbackWidth, opts.maxWidth);
  let lastWidth = measure();
  const svgNode = draw(lastWidth);

  // Re-render when the container's width changes
  if (typeof ResizeObserver !== 'undefined') {
    const observer = new ResizeObserver(() => {
      const w = Math.round(measure());
      if (w !== Math.round(lastWidth)) {
        lastWidth = w;
        draw(w);
      }
    });
    observer.observe(node);
    node.__rectChartObserver = observer;
  }

  return svgNode;
}
