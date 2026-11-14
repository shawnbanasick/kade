import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import * as d3 from 'd3';
import { useTranslation } from 'react-i18next';
// import d3ToPng from 'd3-svg-to-png';

import correlationState from '../GlobalState/correlationState';
import coreState from '../GlobalState/coreState';
import outputState from '../GlobalState/outputState';

import currentDate from '../../Utils/currentDate1';
import currentTime from '../../Utils/currentTime1';
import buildHeatmapDrawio from './buildHeatmapDrawio';
import serializeSVG from '../../Utils/serializeSVG';
import svgStringToPngBase64 from '../../Utils/svgStringToPngBytes';

const getDateTime = () => {
  const date = currentDate();
  const time = currentTime();
  return `${date}_${time}`;
};

const Heatmap = ({
  title = '',
  subtitle = '',
  width = 600,
  height = 600,
  onDownload, // Optional callback to expose download function to parent
}) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const initialSavedRef = useRef(false); // guards the one-time "save on load"
  const { t } = useTranslation();

  const notify = async () => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    await toast.success(<div>{t('Image added to KADE Zip')}</div>, {
      autoClose: true,
      position: 'bottom-right',
      closeOnClick: true,
      draggable: true,
      theme: 'light',
      style: {
        background: '#fff',
        color: 'dark-gray',
        outline: '1px solid #ccc',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    });
    // await updateNotifyDataUploadSuccess(false);
  };

  // Each range is [low/negative, midpoint (0), high/positive]
  const COLOR_SCHEMES = {
    blueRed: { label: `${t('Blue')} – ${t('Red')}`, range: ['#2563eb', '#f3f4f6', '#dc2626'] },
    redGreen: { label: `${t('Red')} – ${t('Green')}`, range: ['#dc2626', '#f3f4f6', '#16a34a'] },
    greenRed: { label: `${t('Green')} – ${t('Red')}`, range: ['#16a34a', '#f3f4f6', '#dc2626'] },
    purpleGreen: {
      label: `${t('Purple')} – ${t('Green')}`,
      range: ['#7c3aed', '#f3f4f6', '#16a34a'],
    },
    orangeBlue: {
      label: `${t('Orange')} – ${t('Blue')}`,
      range: ['#ea580c', '#f3f4f6', '#2563eb'],
    },
    brownTeal: { label: `${t('Brown')} – ${t('Teal')}`, range: ['#92400e', '#f5f5f4', '#0f766e'] },
    grayscale: { label: `${t('Grayscale')}`, range: ['#dbdbdb', '#9ca3af', '#111827'] },
  };

  const correlationData = correlationState((state) => state.gridRowData);
  const projectName = coreState((state) => state.projectName) ?? '';
  const updateSerializedSVGHeatmap = outputState((state) => state.updateSerializedSVGHeatmap);
  const updateSerializedPNGHeatmap = outputState((state) => state.updateSerializedPNGHeatmap);
  const updateDrawioHeatmapXml = outputState((state) => state.updateDrawioHeatmapXml);
  const serializedPNG = outputState((state) => state.serializedPNGHeatmap);
  // Append-only action; the store reads the latest array itself, so no stale closures.
  const addHeatmapSavedImage = outputState((state) => state.addHeatmapSavedImage);

  const [colorScheme, setColorScheme] = useState('blueRed');

  // Build one snapshot (svg + png + drawio) of the current heatmap
  const buildSnapshot = async () => {
    if (!svgRef.current) return null;

    const svg = serializeSVG(svgRef.current, { width, height });
    const png = await svgStringToPngBase64(svg, width, height);
    const drawio = buildHeatmapDrawio({
      correlationData,
      title,
      subtitle,
      width,
      height,
      colorRange: COLOR_SCHEMES[colorScheme].range,
    });

    if (!svg || !png || !drawio) return null;
    return { time: getDateTime(), svg, png, drawio };
  };

  // Function to download the heatmap as PNG
  const downloadPNG = async () => {
    const filename = `KADE_${projectName}_${t('heatmap')}_${getDateTime()}`;

    const filepath = await window.electronAPI?.showSavePngDialog(`${filename}.png`);
    if (!filepath) return;

    try {
      let b64 = serializedPNG; // from outputState
      if (!b64) {
        // Fallback: render now
        const svg = serializeSVG(svgRef.current, { width, height });
        b64 = await svgStringToPngBase64(svg, width, height);
      }
      await window.electronAPI.savePNG(b64, filepath);
    } catch (error) {
      console.error('Failed to save PNG file:', error);
    }
  };

  const downloadDrawio = async () => {
    const drawioXml = buildHeatmapDrawio({
      correlationData, // already in scope from correlationState
      title,
      subtitle,
      width,
      height,
      colorRange: COLOR_SCHEMES[colorScheme].range,
    });

    if (!drawioXml) return;

    const filename = `KADE_${projectName}_${t('heatmap')}_${getDateTime()}`;
    const defaultPath = `${filename}.drawio`;

    const encoder = new TextEncoder();
    const arrayBuffer = encoder.encode(drawioXml).buffer;

    const filepath = await window.electronAPI?.showSaveDrawioDialog?.(defaultPath);
    if (!filepath) {
      alert('Save operation was canceled.');
      return;
    }

    try {
      await window.electronAPI.saveSVG(arrayBuffer, filepath);
    } catch (error) {
      console.error('Failed to save .drawio file:', error);
    }
  };

  // Function to download the heatmap as SVG
  const downloadSVG = async () => {
    if (!svgRef.current) return;
    const filename = `KADE_${projectName}_${t('heatmap')}_${getDateTime()}`;
    // Clone the SVG element
    const svgElement = svgRef.current.cloneNode(true);
    // Add XML namespaces
    svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgElement.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    const svgData = svgElement.outerHTML;
    const preface = '<?xml version="1.0" standalone="no"?>\r\n';
    const svgBlob = new Blob([preface, svgData], { type: 'image/svg+xml;charset=utf-8' });
    const arrayBuffer = await new Response(svgBlob).arrayBuffer();
    const defaultPath = `${filename}.svg`;

    const filepath = await window.electronAPI?.showSaveSvgDialog(defaultPath);
    if (!filepath) {
      alert('Save operation was canceled.');
      return;
    }
    try {
      const result = await window.electronAPI.saveSVG(arrayBuffer, filepath);
      console.log(result);
    } catch (error) {
      console.error('Failed to save SVG file:', error);
    }
  };

  // Button handler: append a new snapshot to the saved images
  const saveToKADEZip = async () => {
    try {
      const snapshot = await buildSnapshot();
      if (!snapshot) {
        console.error('Failed to generate heatmap files for KADE Zip.');
        return;
      }
      addHeatmapSavedImage(snapshot);
      notify();
    } catch (err) {
      console.error('Failed to save heatmap snapshot:', err);
    }
  };

  // Expose download function to parent component via callback
  useEffect(() => {
    if (onDownload) {
      onDownload(downloadSVG);
    }
  }, [onDownload]);

  // DRAW THE HEATMAP
  useEffect(() => {
    if (!correlationData || correlationData.length === 0 || !svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    // Set heatmap dimensions and margins
    const margin = { top: 120, right: 25, bottom: 30, left: 150 };
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
    const reversedRespondents = [...allRespondents].reverse(); // Reverse for x-axis

    // Build X scale and axis (reversed order)
    const x = d3.scaleBand().range([0, chartWidth]).domain(allRespondents).padding(0.05);

    svg
      .append('g')
      .attr('class', 'text-sm')
      .attr('transform', `translate(0,0)`)
      .call(d3.axisTop(x).tickSize(0))
      .selectAll('text')
      .style('text-anchor', 'start')
      .attr('dx', '0.5em')
      .attr('dy', '-0.5em')
      .attr('transform', 'rotate(-45)');

    svg.select('.domain').remove();

    // Build Y scale and axis
    const y = d3.scaleBand().range([chartHeight, 0]).domain(reversedRespondents).padding(0.05);

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
    const myColor = d3
      .scaleLinear()
      .domain([minValue, 0, maxValue])
      .range(COLOR_SCHEMES[colorScheme].range);

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

    // Add text labels inside cells
    svg
      .selectAll()
      .data(flatData)
      .enter()
      .append('text')
      .attr('x', (d) => x(d.col) + x.bandwidth() / 2)
      .attr('y', (d) => y(d.row) + y.bandwidth() / 2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('class', 'text-xs font-medium pointer-events-none')
      .style('fill', (d) => (d3.lab(myColor(d.value)).l < 55 ? '#ffffff' : '#1f2937'))
      .text((d) => d.value);

    // Add title
    svg
      .append('text')
      .attr('x', 0)
      .attr('y', -90)
      .attr('text-anchor', 'start')
      .attr('class', 'text-4xl font-semibold')
      .text(title);

    // Add subtitle
    svg
      .append('text')
      .attr('x', 0)
      .attr('y', -40)
      .attr('text-anchor', 'start')
      .attr('class', 'text-sm text-gray-500')
      .text(subtitle);
  }, [correlationData, width, height, title, subtitle, colorScheme]);

  // SAVE THE INITIAL IMAGE ONCE.
  // Must stay AFTER the drawing effect so the SVG already exists when this runs.
  useEffect(() => {
    if (initialSavedRef.current) return;
    if (!correlationData || correlationData.length === 0 || !svgRef.current) return;

    // If the store already has images (e.g. component remounted), don't add another "initial" one.
    const existing = outputState.getState().heatmapSavedImages;
    if (existing && existing.length > 0) {
      initialSavedRef.current = true;
      return;
    }

    initialSavedRef.current = true; // set BEFORE the await to block StrictMode double-runs
    (async () => {
      try {
        const snapshot = await buildSnapshot();
        if (snapshot) {
          addHeatmapSavedImage(snapshot);
        } else {
          initialSavedRef.current = false; // allow a retry if it failed
        }
      } catch (err) {
        console.error('Failed to save initial heatmap snapshot:', err);
        initialSavedRef.current = false;
      }
    })();
    // Intentionally only depends on correlationData: this is a one-time save on load.
  }, [correlationData]);

  // OUTPUT IMAGE FOR DOWNLOAD - SERIALIZE SVG AND PNG
  useEffect(() => {
    const run = async () => {
      if (!correlationData || correlationData.length === 0 || !svgRef.current) return;

      try {
        // Serialize the SVG for saving
        const serializedSVG = serializeSVG(svgRef.current, { width, height });
        const pngBytes = await svgStringToPngBase64(serializedSVG, width, height);
        const drawioXml = buildHeatmapDrawio({
          correlationData,
          title,
          subtitle,
          width,
          height,
          colorRange: COLOR_SCHEMES[colorScheme].range,
        });
        updateSerializedSVGHeatmap(serializedSVG);
        updateSerializedPNGHeatmap(pngBytes);
        updateDrawioHeatmapXml(drawioXml);
      } catch (err) {
        console.error('Heatmap export serialization failed:', err);
      }
    };
    run();
  }, [
    correlationData,
    width,
    height,
    title,
    subtitle,
    colorScheme,
    updateSerializedSVGHeatmap,
    updateSerializedPNGHeatmap,
    updateDrawioHeatmapXml,
  ]);

  return (
    <div className="flex flex-col mt-10">
      <ToastContainer transition={Zoom} />
      <div className="relative">
        {/** Color scheme selector */}
        <div className="flex flex-row items-center gap-2 mb-4">
          <div className="flex items-center gap-2 mb-2 ml-18">
            <label htmlFor="heatmapColorScheme" className="text-sm font-medium">
              {t('Color scheme')}
            </label>
            <select
              id="heatmapColorScheme"
              value={colorScheme}
              onChange={(e) => setColorScheme(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white"
            >
              {Object.entries(COLOR_SCHEMES).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          {/** Download buttons */}
          <div className="flex flex-row gap-4 ml-18 mt-4">
            <button
              onClick={downloadPNG}
              className="mt-4 mb-12.5! px-4 py-2 cursor-pointer bg-grey-button text-black rounded-md hover:bg-grey-button-hover transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download PNG
            </button>
            <button
              onClick={downloadSVG}
              className="mt-4  mb-12.5! px-4 py-2 cursor-pointer bg-grey-button text-black rounded-md hover:bg-grey-button-hover transition-colors flex items-center gap-2"
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
              onClick={downloadDrawio}
              className="mt-4 mb-12.5! px-4 py-2 cursor-pointer bg-grey-button text-black rounded-md hover:bg-grey-button-hover transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Draw.io
            </button>
            <button
              onClick={saveToKADEZip}
              className="mt-4 mb-12.5! px-4 py-2 cursor-pointer bg-grey-button text-black rounded-md hover:bg-grey-button-hover transition-colors flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 20H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10l4 4v3" />
                <path d="M7 3v4h7V3" />
                <path d="M7 20v-6h4" />
                <path d="M18 14v7" />
                <path d="M14.5 17.5h7" />
              </svg>
              {t('Save to KADE Zip')}
            </button>
          </div>
        </div>
        <svg id="heatmapImage" ref={svgRef}></svg>
        <div
          ref={tooltipRef}
          className="absolute opacity-0 bg-white border-2 border-solid border-gray-800 rounded-md p-2 pointer-events-none shadow-lg"
        />
      </div>
    </div>
  );
};

export default Heatmap;
