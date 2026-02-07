import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import correlationState from '../GlobalState/correlationState';

const Heatmap = ({
  title = 'Correlation Matrix',
  subtitle = 'Hover over cells to see correlation values',
  width = 600,
  height = 600,
}) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);

  // Get data from Zustand store
  // Expects: [{"respondent":"US1","US1":100,"US2":54,...}, {...}, ...]
  const correlationData = correlationState((state) => state.gridRowData);

  useEffect(() => {
    if (!correlationData || correlationData.length === 0 || !svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    // Set dimensions and margins
    const margin = { top: 100, right: 25, bottom: 30, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Extract respondent labels (they are the keys, excluding 'respondent' field)
    const firstRow = correlationData[0];
    const respondentLabels = Object.keys(firstRow).filter((key) => key !== 'respondent');

    // Transform correlation data into flat data structure
    const flatData = [];
    correlationData.forEach((row) => {
      const rowLabel = row.respondent;
      respondentLabels.forEach((colLabel) => {
        flatData.push({
          row: rowLabel,
          col: colLabel,
          value: row[colLabel],
        });
      });
    });

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Get all respondent labels in order
    const allRespondents = correlationData.map((d) => d.respondent);

    // Build X scale and axis
    const x = d3.scaleBand().range([0, chartWidth]).domain(allRespondents).padding(0.05);

    svg
      .append('g')
      .attr('class', 'text-sm')
      .attr('transform', `translate(0,0)`)
      .call(d3.axisTop(x).tickSize(0))
      .select('.domain')
      .remove();

    // Build Y scale and axis
    const y = d3.scaleBand().range([chartHeight, 0]).domain(allRespondents).padding(0.05);

    svg
      .append('g')
      .attr('class', 'text-sm')
      .call(d3.axisLeft(y).tickSize(0))
      .select('.domain')
      .remove();

    // Build color scale - for correlation data, range is typically -100 to 100
    const allValues = flatData.map((d) => d.value);
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);

    // Use a diverging color scale for correlation data
    // Negative correlations = blue, Positive correlations = red
    const myColor = d3
      .scaleLinear()
      .domain([minValue, 0, maxValue])
      .range(['#2563eb', '#f3f4f6', '#dc2626']);

    // Tooltip functions
    const tooltip = d3.select(tooltipRef.current);

    const mouseover = function (event, d) {
      tooltip.style('opacity', 1);
      d3.select(this).style('stroke', 'black').style('opacity', 1);
    };

    const mousemove = function (event, d) {
      tooltip
        .html(`<strong>${d.row} × ${d.col}</strong><br>Correlation: ${d.value}`)
        .style('left', `${event.pageX + 10}px`)
        .style('top', `${event.pageY - 10}px`);
    };

    const mouseleave = function (event, d) {
      tooltip.style('opacity', 0);
      d3.select(this).style('stroke', 'none').style('opacity', 0.8);
    };

    // Add rectangles (heatmap cells)
    svg
      .selectAll()
      .data(flatData)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.col))
      .attr('y', (d) => y(d.row))
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', (d) => myColor(d.value))
      .style('stroke-width', 4)
      .style('stroke', 'none')
      .style('opacity', 0.8)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave);

    // Add title
    svg
      .append('text')
      .attr('x', 0)
      .attr('y', -50)
      .attr('text-anchor', 'left')
      .attr('class', 'text-xl font-semibold')
      .text(title);

    // Add subtitle
    svg
      .append('text')
      .attr('x', 0)
      .attr('y', -20)
      .attr('text-anchor', 'left')
      .attr('class', 'text-sm text-gray-500')
      .text(subtitle);
  }, [correlationData, width, height, title, subtitle]);

  return (
    <div className="relative">
      <svg ref={svgRef}></svg>
      <div
        ref={tooltipRef}
        className="absolute opacity-0 bg-white border-2 border-solid border-gray-800 rounded-md p-2 pointer-events-none shadow-lg"
      />
    </div>
  );
};

export default Heatmap;
