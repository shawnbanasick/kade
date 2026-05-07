import React, { useEffect, useRef, memo, useState } from 'react';
import * as d3 from 'd3';
import { useTranslation } from 'react-i18next';
import PcaScenarios from './PcaScenarios';
import ForceGraphDataSelectRadio from './ForceGraphDataSelectRadio';
import DebouncedNumberInput from './ForceGraphCorrLimitInput';

const FACTOR_COLORS = [
  '#7dd3fc', // 1 - blue
  '#fdba74', // 2 - orange
  '#86efac', // 3 - green
  '#fca5a5', // 4 - red
  '#67e8f9', // 5 - cyan
  '#f9a8d4', // 6 - pink
  '#d8b4fe', // 7 - purple
  '#d1d5db', // 8 - gray (last resort)
];

const GRAY = '#d1d5db';

/**
 * Derive a node's factor index (0-based) from its boolean flag subarray.
 * Returns the index of the single `true` value, or -1 if none.
 */
const getFactorIndex = (flags) => {
  if (!Array.isArray(flags)) return -1;
  return flags.indexOf(true);
};

const getFactorColor = (flags) => {
  const idx = getFactorIndex(flags);
  return idx >= 0 ? (FACTOR_COLORS[idx] ?? GRAY) : GRAY;
};

const ForceGraph = ({
  title = '',
  subtitle = '',
  width = window.innerWidth - 170,
  height = window.innerHeight - 220,
  data = [],
  correlationThreshold = 0.5,
}) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const [forceStrength, setForceStrength] = useState(-5);
  const [currentFactorIndex, setCurrentFactorIndex] = useState(0);

  const { t } = useTranslation();
  const minCorrelation = correlationThreshold * 100;

  // Derive number of factors from the first node's flag array
  const numFactors = data.length > 0 && Array.isArray(data[0]?.flag) ? data[0].flag.length : 0;

  const visibleColors = FACTOR_COLORS.slice(0, numFactors);

  useEffect(() => {
    if (!data || data.length === 0 || !svgRef.current) return;

    d3.select(svgRef.current).selectAll('*').remove();

    const nodes = data.map((d) => ({
      id: d.respondent,
      allFlagData: d.flag, // boolean[][]  — one subarray per scenario
      flags: Array.isArray(d.flag) ? (d.flag[currentFactorIndex] ?? []) : [],
    }));

    const links = [];
    data.forEach((row) => {
      const source = row.respondent;
      Object.keys(row).forEach((col) => {
        if (
          col !== 'respondent' &&
          col !== source &&
          col !== 'flag' &&
          col !== 'pc' &&
          col !== 'pca'
        ) {
          const value = row[col];
          if (Math.abs(value) >= minCorrelation && source < col) {
            links.push({ source, target: col, value });
          }
        }
      });
    });

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    // Title / subtitle
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('class', 'text-xl font-semibold')
      .text(title);

    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 55)
      .attr('text-anchor', 'middle')
      .attr('class', 'text-sm text-gray-500')
      .text(subtitle);

    // Legend
    const legendGroup = svg.append('g').attr('class', 'legend-group');
    const legendColumnWidth = 140;
    const legendColumns = 4;
    const legendTotalWidth = legendColumns * legendColumnWidth;
    const legendX = (width - legendTotalWidth) / 2;
    const legendY = 20;
    const legendItemHeight = 35;

    legendGroup
      .append('text')
      .attr('x', legendX - 15)
      .attr('y', legendY)
      .attr('class', 'text-sm font-semibold')
      .attr('fill', '#000')
      .text('Factors:');

    visibleColors.forEach((color, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const x = legendX + col * legendColumnWidth;
      const y = legendY + 20 + row * legendItemHeight;
      const legendItem = legendGroup.append('g').attr('transform', `translate(${x}, ${y})`);

      legendItem
        .append('circle')
        .attr('r', 12)
        .attr('fill', color)
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5);

      legendItem
        .append('text')
        .attr('x', 20)
        .attr('y', 0)
        .attr('dy', '0.35em')
        .attr('class', 'text-xs')
        .attr('fill', '#000')
        .text(`Factor ${i + 1}`);
    });

    // Zoom container
    const zoomContainer = svg.append('g').attr('class', 'zoom-container');
    zoomContainer
      .append('rect')
      .attr('width', width)
      .attr('height', height - 150)
      .attr('transform', 'translate(0, 150)')
      .attr('fill', 'transparent')
      .style('cursor', 'grab');

    const g = zoomContainer.append('g').attr('transform', 'translate(0, 150)');

    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 10])
      .filter((event) => event.type !== 'mousedown' || event.target.tagName !== 'circle')
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

    // Link color / width
    const linkColorScale = d3
      .scaleLinear()
      .domain([-100, 0, 100])
      .range(['#2563eb', '#e5e7eb', '#dc2626']);

    const linkWidthScale = d3.scaleLinear().domain([0, 100]).range([1, 8]);

    // Simulation
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
      .force('center', d3.forceCenter(width / 2, (height - 150) / 2))
      .force('collision', d3.forceCollide().radius(30));

    const tooltip = d3.select(tooltipRef.current);

    // Links
    const link = g
      .append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', (d) => linkColorScale(d.value))
      .attr('stroke-width', (d) => linkWidthScale(Math.abs(d.value)))
      .attr('stroke-opacity', 0.6);

    // Nodes
    const node = g
      .append('g')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended));

    node
      .append('circle')
      .attr('r', 20)
      .attr('fill', (d) => getFactorColor(d.flags))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .attr('class', 'node-shape');

    node
      .append('text')
      .text((d) => d.id)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('class', 'text-xs font-semibold cursor-default pointer-events-none')
      .attr('fill', '#000');

    // Hover interactions
    node
      .on('mouseover', function (event, d) {
        link
          .style('stroke-opacity', (l) => (l.source.id === d.id || l.target.id === d.id ? 1 : 0.1))
          .style('stroke-width', (l) =>
            l.source.id === d.id || l.target.id === d.id
              ? linkWidthScale(Math.abs(l.value)) * 1.5
              : linkWidthScale(Math.abs(l.value))
          );

        node.select('circle').style('opacity', (n) => {
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
        node.select('circle').style('opacity', 1);
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

    return () => simulation.stop();
  }, [data, width, height, title, subtitle, minCorrelation, forceStrength, currentFactorIndex]);

  // When scenario changes, recolor circles without re-running simulation
  const handleSelectionChange = (id, value) => {
    setCurrentFactorIndex(value);

    d3.select(svgRef.current)
      .select('.zoom-container')
      .selectAll('circle.node-shape')
      .attr('fill', (d) => {
        if (!d?.allFlagData) return GRAY;
        const flags = d.allFlagData[value] ?? [];
        return getFactorColor(flags);
      });
  };

  const resetZoom = () => {
    if (svgRef.current?.resetZoom) svgRef.current.resetZoom();
  };

  return (
    <div className="h-[calc(100vh-130px)]">
      <div className="flex w-[calc(85vw-30px)] text-basis h-[80px] items-center">
        <div className="flex gap-2">
          <DebouncedNumberInput
            value={correlationThreshold}
            label={t('Cutoff')}
            min={0}
            max={1}
            step={0.01}
            debounceMs={500}
          />
          <ForceGraphDataSelectRadio />
          <PcaScenarios onSelectionChange={handleSelectionChange} />
        </div>

        <div className="flex flex-row mt-8 ml-6 items-center gap-6">
          <div className="flex flex-col items-left">
            <label className="text-md font-medium">Attraction Strength</label>
            <div className="flex flex-row items-center gap-2">
              <input
                type="range"
                min={-50}
                max={-1}
                step={1}
                value={forceStrength}
                onChange={(e) => setForceStrength(Number(e.target.value))}
                className="w-32"
                style={{ accentColor: '#a5d6a7' }}
              />
              <span className="text-sm w-8">{100 + forceStrength}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-white rounded-lg">
        <svg ref={svgRef}></svg>
        <div
          ref={tooltipRef}
          className="absolute opacity-0 bg-white border-2 border-solid border-gray-800 rounded-md p-3 pointer-events-none shadow-lg text-sm max-w-xs"
        />
        <div className="absolute top-4 right-4 bg-white rounded-md shadow-md p-2 text-xs text-gray-600">
          <div className="mb-1 font-semibold">Controls:</div>
          <div>🖱️ {t('Scroll to zoom')}</div>
          <div>🖐️ {t('Drag background to pan')}</div>
          <div>👆 {t('Drag nodes to move')}</div>
        </div>
      </div>

      <div className="mt-4 flex gap-4 items-center flex-wrap">
        <button
          onClick={resetZoom}
          className="px-4 py-2 bg-grey-button text-black rounded-md hover:shadow-[inset_0_0_0_4px_#666,0_0_1px_transparent] transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Reset View
        </button>

        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-red-600"></div>
            <span>Positive correlation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-blue-600"></div>
            <span>Negative correlation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ForceGraph);
