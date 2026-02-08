import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import correlationState from '../GlobalState/correlationState';

const ForceGraph = ({
  title = 'Correlation Network',
  subtitle = 'Node size represents influence, edge color shows correlation strength',
  width = window.innerWidth - 170,
  height = window.innerHeight - 180,
  minCorrelation = 30, // Only show edges with absolute correlation >= this value
}) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);

  // Get data from Zustand store
  const correlationData = correlationState((state) => state.gridRowData);
  //   console.log(JSON.stringify(correlationData, null, 2));

  // Function to download the graph as SVG
  const downloadSVG = () => {
    if (!svgRef.current) return;

    const svgElement = svgRef.current.cloneNode(true);
    svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgElement.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'correlation-network.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (!correlationData || correlationData.length === 0 || !svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    // Create nodes from respondents
    // group: d.respondent.match(/[A-Z]+/)[0], // Extract country code (US, JP, CA, UK, FR)
    const nodes = correlationData.map((d) => ({
      id: d.respondent,
    }));

    // Create links from correlation data
    const links = [];
    correlationData.forEach((row) => {
      const source = row.respondent;
      Object.keys(row).forEach((col) => {
        if (col !== 'respondent' && col !== source) {
          const value = row[col];
          // Only create links for significant correlations
          if (Math.abs(value) >= minCorrelation) {
            // Avoid duplicate links (only add if source < target alphabetically)
            if (source < col) {
              links.push({
                source: source,
                target: col,
                value: value,
              });
            }
          }
        }
      });
    });

    // Set up SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    // Add title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('class', 'text-xl font-semibold')
      .text(title);

    // Add subtitle
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 55)
      .attr('text-anchor', 'middle')
      .attr('class', 'text-sm text-gray-500')
      .text(subtitle);

    // Create a group for the graph (so title stays fixed)
    const g = svg.append('g').attr('transform', `translate(0, 80)`);

    // Color scale for countries
    const colorScale = d3
      .scaleOrdinal()
      .domain(['US', 'JP', 'CA', 'UK', 'FR'])
      .range(['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6']);

    // Link color scale (diverging)
    const linkColorScale = d3
      .scaleLinear()
      .domain([-100, 0, 100])
      .range(['#2563eb', '#e5e7eb', '#dc2626']);

    // Link width scale
    const linkWidthScale = d3.scaleLinear().domain([0, 100]).range([1, 8]);

    // Create force simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance((d) => {
            // Stronger correlations = shorter distance
            const absCorr = Math.abs(d.value);
            return 200 - absCorr;
          })
          .strength((d) => {
            // Stronger correlations = stronger force
            const absCorr = Math.abs(d.value);
            return absCorr / 100;
          })
      )
      .force('charge', d3.forceManyBody().strength(-25))
      .force('center', d3.forceCenter(width / 2, (height - 80) / 2))
      .force('collision', d3.forceCollide().radius(40));

    // Tooltip
    const tooltip = d3.select(tooltipRef.current);

    // Create links
    const link = g
      .append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', (d) => linkColorScale(d.value))
      .attr('stroke-width', (d) => linkWidthScale(Math.abs(d.value)))
      .attr('stroke-opacity', 0.6);

    // Create nodes
    const node = g
      .append('g')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended));

    // Add circles to nodes
    // .attr('fill', (d) => colorScale(d.group))
    node
      .append('circle')
      .attr('r', 20)
      .attr('fill', '#fff')
      .attr('stroke', '#fff')
      .attr('fill', (d) => colorScale(d.id))
      .attr('stroke-width', 2)
      .style('cursor', 'pointer');

    // Add labels to nodes
    node
      .append('text')
      .text((d) => d.id)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('class', 'text-xs font-semibold cursor-default pointer-events-none')
      .attr('fill', '#fff');

    // Hover effects for nodes
    node
      .on('mouseover', function (event, d) {
        // Highlight connected links
        link
          .style('stroke-opacity', (l) => (l.source.id === d.id || l.target.id === d.id ? 1 : 0.1))
          .style('stroke-width', (l) =>
            l.source.id === d.id || l.target.id === d.id
              ? linkWidthScale(Math.abs(l.value)) * 1.5
              : linkWidthScale(Math.abs(l.value))
          );

        // Highlight connected nodes
        node.select('circle').style('opacity', (n) => {
          if (n.id === d.id) return 1;
          const connected = links.some(
            (l) =>
              (l.source.id === d.id && l.target.id === n.id) ||
              (l.target.id === d.id && l.source.id === n.id)
          );
          return connected ? 1 : 0.3;
        });

        // Show tooltip
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
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 10}px`);
      })
      .on('mouseout', function () {
        link
          .style('stroke-opacity', 0.6)
          .style('stroke-width', (d) => linkWidthScale(Math.abs(d.value)));

        node.select('circle').style('opacity', 1);

        tooltip.style('opacity', 0);
      });

    // Update positions on each tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });
    // .attr('cx', (d) => (d.x = Math.max(radius, Math.min(width - radius, d.x))))
    // .attr('cy', (d) => (d.y = Math.max(radius, Math.min(height - radius, d.y))));

    // Drag functions
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [correlationData, width, height, title, subtitle, minCorrelation]);

  return (
    <>
      <div className="relative bg-white rounded-lg">
        <svg ref={svgRef}></svg>
        <div
          ref={tooltipRef}
          className="absolute opacity-0 bg-white border-2 border-solid border-gray-800 rounded-md p-3 pointer-events-none shadow-lg text-sm max-w-xs"
        />
      </div>
      <div className="mt-4 flex gap-4 items-center">
        <button
          onClick={downloadSVG}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download SVG
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
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-gray-300"></div>
            <span>Weak correlation</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForceGraph;
