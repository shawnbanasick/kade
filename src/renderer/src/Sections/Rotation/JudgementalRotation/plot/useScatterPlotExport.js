// useScatterPlotExport.js
import d3ToPng from 'd3-svg-to-png';
import coreState from '../../../GlobalState/coreState';
import outputState from '../../../GlobalState/outputState';
import currentDate from '../../../../Utils/currentDate1';
import currentTime from '../../../../Utils/currentTime1';
import exportScatterToDrawio from './exportScatterToDrawio';

const getDateTime = () => `${currentDate()}_${currentTime()}`;

const toArrayBuffer = (str) => {
  const bytes = new TextEncoder().encode(str);
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
};

const useScatterPlotExport = (svgRef, plotOptions) => {
  const addSavedImage = outputState((s) => s.addRotationScatterSavedImage); // new action, see below

  const getBaseName = () =>
    `${coreState.getState().projectName}-rotation_scatter_plot_${getDateTime()}`;

  const getSvgString = () => {
    const el = svgRef.current;
    if (!el) return null;
    const clone = el.cloneNode(true);
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    return `<?xml version="1.0" standalone="no"?>\r\n${clone.outerHTML}`;
  };

  const getPngBase64 = async () => {
    const el = svgRef.current;
    if (!el) return null;
    const dataUrl = await d3ToPng(el, getBaseName(), {
      background: 'white',
      scale: 3,
      format: 'png',
      download: false,
      quality: 1,
    });
    return dataUrl?.split(',')?.[1] ?? null;
  };

  const getDrawioString = () => {
    const el = svgRef.current;
    if (!el) return null;
    return exportScatterToDrawio(el, plotOptions);
  };

  const downloadDrawio = async () => {
    const xml = getDrawioString();
    if (!xml) return;
    const filepath = await window.electronAPI?.showSaveDrawioDialog?.(`${getBaseName()}.drawio`);
    if (!filepath) return;
    try {
      await window.electronAPI.saveSVG(toArrayBuffer(xml), filepath);
    } catch (e) {
      console.error('Failed to save .drawio file:', e);
    }
  };

  const downloadSvg = async () => {
    const svg = getSvgString();
    if (!svg) return;
    const filepath = await window.electronAPI?.showSaveSvgDialog?.(`${getBaseName()}.svg`);
    if (!filepath) return;
    try {
      await window.electronAPI.saveSVG(toArrayBuffer(svg), filepath);
    } catch (e) {
      console.error('Failed to save SVG:', e);
    }
  };

  const downloadPng = async () => {
    console.log('downloadPng called');
    const png = await getPngBase64();
    console.log('downloadPng result:', png.length);
    if (!png) return;
    const filepath = await window.electronAPI?.showSavePngDialog?.(`${getBaseName()}.png`);
    if (!filepath) return;
    try {
      await window.electronAPI.savePNG(png, filepath);
    } catch (e) {
      console.error('Failed to save PNG:', e);
    }
  };

  const saveToKade = async () => {
    const png = await getPngBase64();
    const svg = getSvgString();
    const drawio = getDrawioString();
    if (!png || !svg || !drawio) {
      console.error('Failed to generate scatter plot images', {
        png: !!png,
        svg: !!svg,
        drawio: !!drawio,
      });
      return false;
    }
    addSavedImage({ name: getBaseName(), png, svg, drawio, time: getDateTime() });
    return true;
  };

  return { downloadSvg, downloadPng, saveToKade, downloadDrawio };
};

export default useScatterPlotExport;
