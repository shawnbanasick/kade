import React, { useEffect, useRef, memo, useState } from 'react';
import * as d3 from 'd3';
import { useTranslation } from 'react-i18next';
import PcaScenarios from './PcaScenarios';
import ForceGraphDataSelectRadio from './ForceGraphDataSelectRadio';
import DebouncedNumberInput from './ForceGraphCorrLimitInput';

const ForceGraph = ({
  title = '',
  subtitle = '',
  width = window.innerWidth - 170,
  height = window.innerHeight - 220,
  data = [],
  correlationThreshold = 0.5,
  factorIndices = [],
}) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const colorScaleRef = useRef(null);
  const [isGrayscale, setIsGrayscale] = useState(false);

  const { t } = useTranslation();

  const minCorrelation = correlationThreshold * 100;

  // Get data from Zustand store
  //   const correlationData = correlationState((state) => state.gridRowData);
  let correlationData = data;

  // Track which factor index is currently selected (0-based index into pc array)
  const [currentFactorIndex, setCurrentFactorIndex] = useState(0);

  // Track auto-flag toggle state
  const [showAutoFlags, setShowAutoFlags] = useState(true);
  const [resetAutoFlag, setResetAutoFlag] = useState(false);

  // Define shape paths for different factors (PCA values 1-8)
  const shapeGenerators = {
    1: (r) => `M ${-r},${-r} L ${r},${-r} L ${r},${r} L ${-r},${r} Z`, // Square (centered)
    2: (r) => {
      // Triangle (pointing up)
      const h = r * 1.73; // height for equilateral triangle
      return `M 0,${-h} L ${r * 1.5},${h * 0.5} L ${-r * 1.5},${h * 0.5} Z`;
    },
    3: (r) => {
      // Diamond
      return `M 0,${-r * 1.5} L ${r * 1.5},0 L 0,${r * 1.5} L ${-r * 1.5},0 Z`;
    },
    4: (r) => {
      // Pentagon
      const points = [];
      for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        points.push(`${r * 1.2 * Math.cos(angle)},${r * 1.2 * Math.sin(angle)}`);
      }
      return `M ${points.join(' L ')} Z`;
    },
    5: (r) => {
      // Hexagon
      const points = [];
      for (let i = 0; i < 6; i++) {
        const angle = (i * 2 * Math.PI) / 6;
        points.push(`${r * 1.2 * Math.cos(angle)},${r * 1.2 * Math.sin(angle)}`);
      }
      return `M ${points.join(' L ')} Z`;
    },
    6: (r) => {
      // Oval (ellipse)
      const rx = r * 1.5; // horizontal radius (wider)
      const ry = r * 1.0; // vertical radius (narrower)
      // Approximate ellipse with bezier curves
      const kappa = 0.5522848; // magic number for circular bezier approximation
      const ox = rx * kappa; // control point offset x
      const oy = ry * kappa; // control point offset y
      return `M ${-rx},0 C ${-rx},${-oy} ${-ox},${-ry} 0,${-ry} C ${ox},${-ry} ${rx},${-oy} ${rx},0 C ${rx},${oy} ${ox},${ry} 0,${ry} C ${-ox},${ry} ${-rx},${oy} ${-rx},0 Z`;
    },
    7: (r) => {
      // Cross/Plus
      const w = r * 0.6;
      return `M ${-w},${-r * 1.3} L ${w},${-r * 1.3} L ${w},${-w} L ${r * 1.3},${-w} L ${r * 1.3},${w} L ${w},${w} L ${w},${r * 1.3} L ${-w},${r * 1.3} L ${-w},${w} L ${-r * 1.3},${w} L ${-r * 1.3},${-w} L ${-w},${-w} Z`;
    },
    8: (r) => {
      // Octagon
      const points = [];
      for (let i = 0; i < 8; i++) {
        const angle = (i * 2 * Math.PI) / 8;
        points.push(`${r * 1.2 * Math.cos(angle)},${r * 1.2 * Math.sin(angle)}`);
      }
      return `M ${points.join(' L ')} Z`;
    },
  };

  // Grayscale color scale (8 shades from light to dark gray)
  const grayscaleColors = [
    '#e5e5e5', // Very light gray
    '#cccccc',
    '#b3b3b3',
    '#999999',
    '#808080',
    '#666666',
    '#4d4d4d',
    '#333333', // Dark gray
  ];

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

  const toggleGrayscale = () => {
    setIsGrayscale(!isGrayscale);
  };

  useEffect(() => {
    if (!correlationData || correlationData.length === 0 || !svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    // Create nodes from respondents
    // group: d.respondent.match(/[A-Z]+/)[0], // Extract country code (US, JP, CA, UK, FR)
    const nodes = correlationData.map((d) => ({
      id: d.respondent,
      pc: d.pc, // Keep the full array
      flag: d.flag,
      pca: d.pc && d.pc[0] ? d.pc[0] : 1, // Start with first factor (index 0)
      allPcData: d.pc, // Store all PC data for dynamic updates
      allFlagData: d.flag, // Store all flag data for dynamic updates
    }));

    // Create links from correlation data
    const links = [];
    correlationData.forEach((row) => {
      const source = row.respondent;
      Object.keys(row).forEach((col) => {
        if (col !== 'respondent' && col !== source && col !== 'pca') {
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

    // Color scale for factors (define early so legend can use it)
    const colorScale = d3
      .scaleOrdinal()
      .domain([1, 2, 3, 4, 5, 6, 7, 8])
      .range([
        '#d1d5db',
        '#7dd3fc',
        '#fdba74',
        '#86efac',
        '#fca5a5',
        '#67e8f9',
        '#f9a8d4',
        '#d8b4fe',
      ]);

    colorScaleRef.current = colorScale;

    // Add legend
    const legendGroup = svg.append('g').attr('class', 'legend-group');

    const legendItemHeight = 35;
    const legendColumns = 4; // Display in 4 columns
    const legendColumnWidth = 140;
    const legendTotalWidth = legendColumns * legendColumnWidth;
    const legendX = (width - legendTotalWidth) / 2; // Center the legend
    const legendY = 20; // Higher on the page (was 70)

    // Legend title
    legendGroup
      .append('text')
      .attr('x', legendX - 15)
      .attr('y', legendY)
      .attr('class', 'text-sm font-semibold')
      .attr('fill', '#000')
      .text('Factors:');

    // Create legend items for factors 1-8
    for (let i = 1; i <= 8; i++) {
      const col = (i - 1) % 4; // Which column (0-3): factors 1-4 in row 0, 5-8 in row 1
      const row = Math.floor((i - 1) / 4); // Which row (0 or 1)
      const x = legendX + col * legendColumnWidth;
      const y = legendY + 20 + row * legendItemHeight;

      const legendItem = legendGroup.append('g').attr('transform', `translate(${x}, ${y})`);

      if (isGrayscale) {
        // Show shapes in grayscale mode - all with same fill color as factor 1
        legendItem
          .append('path')
          .attr('d', shapeGenerators[i](12)) // Smaller size for legend
          .attr('fill', grayscaleColors[0]) // Use factor 1 color for all shapes
          .attr('stroke', '#000')
          .attr('stroke-width', 1.5);
      } else {
        // Show colored circles - use respective factor colors
        legendItem
          .append('circle')
          .attr('r', 12)
          .attr('fill', colorScale(i)) // Use each factor's color
          .attr('stroke', '#fff')
          .attr('stroke-width', 1.5);
      }

      // Label
      legendItem
        .append('text')
        .attr('x', 20)
        .attr('y', 0)
        .attr('dy', '0.35em')
        .attr('class', 'text-xs')
        .attr('fill', '#000')
        .text(`Factor ${i}`);
    }

    // Create a group for the graph (so title stays fixed, but graph can zoom/pan)
    // const container = svg.append('g').attr('transform', `translate(0, 80)`);
    const zoomContainer = svg.append('g').attr('class', `zoom-container`);

    // Create a group for the graph (so title stays fixed)
    // const g = svg.append('g').attr('transform', `translate(0, 80)`);
    // Add a transparent rectangle to capture zoom/pan events
    zoomContainer
      .append('rect')
      .attr('width', width)
      .attr('height', height - 150) // Adjusted for legend space
      .attr('transform', `translate(0, 150)`) // Adjusted for legend space
      .attr('fill', 'transparent')
      .style('cursor', 'grab');

    // Create the main graph group
    const g = zoomContainer.append('g').attr('transform', `translate(0, 150)`); // Adjusted for legend space

    // Add zoom and pan behavior
    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 10]) // Min and max zoom levels
      .filter(function (event) {
        return event.type !== 'mousedown' || event.target.tagName !== 'circle';
      }) // Disable zoom when shift key is pressed
      .on('zoom', (event) => {
        g.attr('transform', `translate(0, 50) ${event.transform}`); // Adjusted for legend space
      });

    // Apply zoom to the container
    zoomContainer.call(zoom);

    // Update cursor when dragging
    zoomContainer
      .on('mousedown.cursor', function (event) {
        if (event.target.tagName !== 'circle') {
          d3.select(this).select('rect').style('cursor', 'grabbing');
        }
      })
      .on('mouseup.cursor', function () {
        d3.select(this).select('rect').style('cursor', 'grab');
      });

    // Link color scale (diverging)
    const linkColorScale = d3
      .scaleLinear()
      .domain([-100, 0, 100])
      .range(isGrayscale ? ['#555555', '#cccccc', '#222222'] : ['#2563eb', '#e5e7eb', '#dc2626']);

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
      .force('charge', d3.forceManyBody().strength(-5))
      .force('center', d3.forceCenter(width / 2, (height - 150) / 2)) // Adjusted for legend space
      .force('collision', d3.forceCollide().radius(30));

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
      .attr('stroke-opacity', 0.6)
      .style('stroke-dasharray', (d) => {
        // In grayscale mode, use dashed lines for negative correlations
        if (isGrayscale && d.value < 0) {
          return '8, 4'; // Dashed pattern for negative correlations
        }
        return 'none'; // Solid line for positive correlations or color mode
      });

    // Create nodes
    const node = g
      .append('g')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended));

    // Add shapes to nodes based on mode
    if (isGrayscale) {
      // Use shapes in grayscale mode with uniform fill color
      node
        .append('path')
        .attr('d', (d) => {
          const pcaValue = d.pca || 1;
          const shapeGen = shapeGenerators[pcaValue] || shapeGenerators[1];
          return shapeGen(15); // radius of 15
        })
        .attr('fill', grayscaleColors[0]) // Uniform fill color - same as factor 1
        .attr('stroke', '#000')
        .attr('stroke-width', 2)
        .style('stroke-dasharray', (d) => {
          // Check if flag is true for current factor index AND auto-flags are enabled
          if (!showAutoFlags) return 'none';
          return d.allFlagData && d.allFlagData[0] ? '5, 5' : 'none'; // Start with index 0
        })
        .style('cursor', 'pointer')
        .attr('class', 'node-shape'); // Add class for easier selection
    } else {
      // Use circles in color mode with varying colors
      node
        .append('circle')
        .attr('r', 20)
        .attr('fill', (d) => colorScale(d.pca || 1)) // Use each factor's color
        .attr('stroke', (d) => {
          // Check if flag is true for current factor index AND auto-flags are enabled
          if (!showAutoFlags) return '#fff';
          return d.allFlagData && d.allFlagData[0] ? '#000' : '#fff'; // Start with index 0
        })
        .attr('stroke-width', 2)
        .style('stroke-dasharray', (d) => {
          // Check if flag is true for current factor index AND auto-flags are enabled
          if (!showAutoFlags) return 'none';
          return d.allFlagData && d.allFlagData[0] ? '5, 5' : 'none'; // Start with index 0
        })
        .style('cursor', 'pointer')
        .attr('class', 'node-shape'); // Add class for easier selection
    }

    // Add labels to nodes
    node
      .append('text')
      .text((d) => d.id)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em') // Standard centering works for all shapes now
      .attr('class', 'text-xs font-semibold cursor-default pointer-events-none')
      .attr('fill', '#000');

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
        const shapeSelector = isGrayscale ? 'path' : 'circle';
        node.select(shapeSelector).style('opacity', (n) => {
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

        const shapeSelector = isGrayscale ? 'path' : 'circle';
        node.select(shapeSelector).style('opacity', 1);

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

    // Add reset zoom button functionality
    const resetZoom = () => {
      zoomContainer.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
    };

    // Store reset function for button access
    svg.node().resetZoom = resetZoom;

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [correlationData, width, height, title, subtitle, minCorrelation, isGrayscale]);

  const resetZoom = () => {
    if (svgRef.current && svgRef.current.resetZoom) {
      svgRef.current.resetZoom();
    }
  };

  // Separate effect to handle auto-flag toggle without full re-render
  useEffect(() => {
    if (!svgRef.current) return;

    const shapeSelector = isGrayscale ? 'path.node-shape' : 'circle.node-shape';

    d3.select(svgRef.current)
      .select('.zoom-container')
      .selectAll(shapeSelector)
      .attr('stroke', (d) => {
        if (!d || !d.id) return isGrayscale ? '#000' : '#fff';

        if (!showAutoFlags) {
          return isGrayscale ? '#000' : '#fff';
        }

        const hasFlag = d.allFlagData && d.allFlagData[currentFactorIndex] === true;

        if (isGrayscale) {
          return '#000';
        } else {
          return hasFlag ? '#000' : '#fff';
        }
      })
      .style('stroke-dasharray', (d) => {
        if (!d || !d.id) return 'none';
        if (!showAutoFlags) return 'none';
        const hasFlag = d.allFlagData && d.allFlagData[currentFactorIndex] === true;
        return hasFlag ? '5, 5' : 'none';
      });
  }, [showAutoFlags, isGrayscale, currentFactorIndex]);

  // Separate effect to manage legend explanatory text
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    // Remove existing explanatory text
    svg.select('.legend-explanation').remove();

    // Add explanatory text if auto-flags are enabled
    if (showAutoFlags) {
      svg
        .select('.legend-group')
        .append('text')
        .attr('class', 'legend-explanation')
        .attr('x', width / 2 - 45)
        .attr('y', 120) // Position below the legend items (60 + 90)
        .attr('text-anchor', 'middle')
        .attr('class', 'text-xs legend-explanation')
        .attr('fill', '#666')
        .text('Dashed border indicates an auto-flagged factor loading.');
    }
  }, [showAutoFlags, width]);

  const handleSelectionChange = (id, value) => {
    if (!svgRef.current || !colorScaleRef.current) return;

    // Update the current factor index
    setCurrentFactorIndex(value);

    const shapeSelector = isGrayscale ? 'path.node-shape' : 'circle.node-shape';

    // Use D3 to select all node shape elements (not legend shapes)
    const shapes = d3.select(svgRef.current).select('.zoom-container').selectAll(shapeSelector);

    // Update the bound data for each node
    shapes.each(function (d) {
      if (d && d.allPcData && d.allPcData[value]) {
        d.pca = d.allPcData[value]; // Update pca with new factor
      }
    });

    // Update visual attributes
    shapes
      .attr('stroke', (d) => {
        if (!d || !d.id) return isGrayscale ? '#000' : '#fff'; // Safety check

        // If auto-flags are disabled, use default stroke colors
        if (!showAutoFlags) {
          return isGrayscale ? '#000' : '#fff';
        }

        const hasFlag = d.allFlagData && d.allFlagData[value] === true;

        if (isGrayscale) {
          return '#000'; // Always black in grayscale mode
        } else {
          return hasFlag ? '#000' : '#fff'; // Black if flag true, white if false
        }
      })
      .style('stroke-dasharray', (d) => {
        if (!d || !d.id) return 'none'; // Safety check

        // If auto-flags are disabled, no dashed borders
        if (!showAutoFlags) return 'none';

        const hasFlag = d.allFlagData && d.allFlagData[value] === true;
        return hasFlag ? '5, 5' : 'none';
      })
      .attr('stroke-width', 2)
      .attr('fill', (d) => {
        if (!d || !d.id) return isGrayscale ? '#e5e5e5' : '#d1d5db'; // Safety check

        if (!d.allPcData || d.allPcData[value] === null || d.allPcData[value] === undefined) {
          return isGrayscale ? '#e5e5e5' : '#d1d5db';
        }

        const factorNum = d.allPcData[value];
        if (isGrayscale) {
          return grayscaleColors[0]; // Uniform fill color for all grayscale shapes
        }
        return colorScaleRef.current(factorNum); // Different colors for color mode
      });

    // For grayscale mode, also update the shape based on the new factor
    if (isGrayscale) {
      d3.select(svgRef.current)
        .select('.zoom-container')
        .selectAll('path.node-shape') // Only select node shapes within zoom container
        .attr('d', (d) => {
          if (!d || !d.id) return shapeGenerators[1](15); // Safety check
          if (d.allPcData && d.allPcData[value]) {
            const factorNum = d.allPcData[value];
            const shapeGen = shapeGenerators[factorNum] || shapeGenerators[1];
            return shapeGen(15);
          }
          // Fallback
          return shapeGenerators[1](15);
        });
    }
  };

  // if (isGrayscale !== resetAutoFlag) {
  //   setShowAutoFlags(false);
  //   setResetAutoFlag(isGrayscale);
  // }

  return (
    <>
      <div className="flex w-[calc(85vw-30px)] text-basis h-[70px] items-center">
        <div className="flex items-center gap-2">
          <DebouncedNumberInput
            value={correlationThreshold}
            label="Cutoff"
            min={0}
            max={1}
            step={0.01}
            debounceMs={500}
          />
          <ForceGraphDataSelectRadio />
          <PcaScenarios onSelectionChange={handleSelectionChange} isGrayscale={isGrayscale} />
        </div>
        <div className="mt-6 ml-6">
          <button
            onClick={() => setShowAutoFlags(!showAutoFlags)}
            className={`px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2 ${
              showAutoFlags
                ? 'bg-primary-button text-black hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent]'
                : 'bg-grey-button text-black hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent]'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
              />
            </svg>
            Auto-Flag {showAutoFlags ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
      <div className="relative bg-white rounded-lg">
        <svg ref={svgRef}></svg>
        <div
          ref={tooltipRef}
          className="absolute opacity-0 bg-white border-2 border-solid border-gray-800 rounded-md p-3 pointer-events-none shadow-lg text-sm max-w-xs"
        />
        {/* Zoom controls overlay */}
        <div className="absolute top-4 right-4 bg-white rounded-md shadow-md p-2 text-xs text-gray-600">
          <div className="mb-1 font-semibold">Controls:</div>
          <div>🖱️ {t('Scroll to zoom')}</div>
          <div>🖐️ {t('Drag background to pan')}</div>
          <div>👆 {t('Drag nodes to move')}</div>
        </div>
      </div>
      <div className="mt-4 flex gap-4 items-center flex-wrap">
        <button
          onClick={downloadSVG}
          className="px-4 py-2 bg-grey-button text-black rounded-md hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] transition-colors flex items-center gap-2"
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
        <button
          onClick={resetZoom}
          className="px-4 py-2 bg-grey-button text-black rounded-md hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent] transition-colors flex items-center gap-2"
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
        <button
          onClick={toggleGrayscale}
          className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
            isGrayscale
              ? 'bg-primary-button text-black hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent]'
              : 'bg-grey-button text-black hover:shadow-[inset_0_0_0_4px_#666,_0_0_1px_transparent]'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          </svg>
          {isGrayscale ? 'Color Mode' : 'Grayscale Shapes'}
        </button>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className={`w-4 h-1 ${isGrayscale ? 'bg-gray-800' : 'bg-red-600'}`}></div>
            <span>Positive correlation</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`w-4 h-1 ${isGrayscale ? 'bg-gray-400' : 'bg-blue-600'}`}
              style={
                isGrayscale
                  ? {
                      backgroundImage:
                        'repeating-linear-gradient(to right, currentColor 0px, currentColor 4px, transparent 4px, transparent 8px)',
                      backgroundColor: 'transparent',
                      height: '2px',
                    }
                  : {}
              }
            ></div>
            <span>Negative correlation</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ForceGraph);
