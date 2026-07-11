import currentDate from '../../../Utils/currentDate1';
import currentTime from '../../../Utils/currentTime1';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import vizState from '../../GlobalState/vizState';
import coreState from '../../GlobalState/coreState';
import d3ToPng from 'd3-svg-to-png';
import buildDrawioXmlFunction from './buildDrawioXml'; // Import the new helper function

const DownloadIcon = () => (
  <div className="flex justify-center items-center mr-2.5">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className="h-4.25 w-4.25 fill-current mb-1"
    >
      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
    </svg>
  </div>
);

const buildFileName = (
  factorVizOptions = {},
  projectName = '',
  cleanFactorName = '',
  dateTime = ''
) => {
  const {
    willAddCustomNameToDownload,
    customDownloadFileNames = [],
    customFileNameLocation = '',
  } = factorVizOptions;

  const customName = customDownloadFileNames[0] ?? '';
  const location = customFileNameLocation.trim();
  const fallback = `${projectName}_${cleanFactorName}_${dateTime}`;

  if (willAddCustomNameToDownload !== true) return fallback;

  switch (location) {
    case 'prepend':
      return `${customName}_${projectName}_${cleanFactorName}_${dateTime}`;
    case 'append':
      return `${projectName}_${cleanFactorName}_${dateTime}_${customName}`;
    case 'replace':
      return customName;
    default:
      return fallback;
  }
};

const getDateTime = () => {
  const date = currentDate();
  const time = currentTime();
  return `${date}_${time}`;
};

const DownloadFactorVizButtons = ({ id, data, positionData } = {}) => {
  const { t } = useTranslation();
  const factorVizOptions = vizState((state) => state.factorVizOptions) ?? {};
  const projectName = coreState((state) => state.projectName) ?? '';

  if (!id) return null;

  const downloadSvgImage = async () => {
    const imageName = `#image${id}`;
    const svg = document.querySelector(imageName);

    if (!svg) {
      console.error(`SVG element not found: ${imageName}`);
      return;
    }

    const filename = buildFileName(factorVizOptions, projectName, `${id}`, getDateTime());

    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    const svgData = svg.outerHTML;
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

  const downloadFacVizAsPng = async () => {
    const imageEl = document.getElementById(`image${id}`);

    if (!imageEl) {
      console.error(`Image element not found: image${id}`);
      return;
    }

    const dateTime = `${currentDate()}__${currentTime()}`;
    const cleanFactorName = `${id}__`;
    const pngOptions = {
      ...factorVizOptions,
      customDownloadFileNames: [factorVizOptions.customDownloadFileNames ?? ''],
    };
    const nameConfig = buildFileName(pngOptions, projectName, cleanFactorName, dateTime);

    let fileData;
    try {
      fileData = await d3ToPng(imageEl, nameConfig, {
        backgroundColor: 'white',
        scale: 3,
        format: 'png',
        download: false,
        quality: 1,
      });
    } catch (error) {
      console.error('Failed to convert to PNG:', error);
      return;
    }

    const buffer = fileData?.split(',')?.[1];
    if (!buffer) {
      console.error('PNG conversion returned no data.');
      return;
    }

    const defaultPath = `${nameConfig}.png`;
    const filepath = await window.electronAPI?.showSavePngDialog(defaultPath);
    if (!filepath) {
      alert('Save operation was canceled.');
      return;
    }

    try {
      const result = await window.electronAPI.savePNG(buffer, filepath);
      console.log(result);
    } catch (error) {
      console.error('Failed to save PNG file:', error);
    }
  };

  // ─── NEW HANDLER ────────────────────────────────────────────────────────────
  const downloadAsDrawio = async () => {
    const titleHeight = vizState.getState().titleHeight ?? 0;

    const drawioXml = buildDrawioXmlFunction(
      data, // same `data` array you pass to RectangleText / BaseRectangles
      positionData, // same positionData
      factorVizOptions,
      titleHeight
    );

    const filename = buildFileName(factorVizOptions, projectName, `${id}`, getDateTime());
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

  return (
    <div className="flex flex-row items-center justify-left pl-48">
      <GeneralButton
        id={`downloadSvgButtonFacViz${id}`}
        onClick={downloadSvgImage}
        className="mr-1.5 ml-5 bg-grey-button h-[30px] p-1 w-fit min-w-[270px]"
      >
        <div className="flex flex-row justify-center items-center h-full w-full">
          <DownloadIcon />
          {t('Download Vector Image')}
        </div>
      </GeneralButton>
      <GeneralButton
        id={`downloadPngButtonFacViz${id}`}
        onClick={downloadFacVizAsPng}
        className="mr-1.5 ml-5 bg-grey-button h-[30px] p-1 w-fit min-w-[270px]"
      >
        <div className="flex flex-row justify-center items-center h-full w-full">
          <DownloadIcon />
          {t('Download Raster Image')}
        </div>
      </GeneralButton>

      {/* ── NEW BUTTON ── */}
      <GeneralButton
        id={`downloadDrawioButtonFacViz${id}`}
        onClick={downloadAsDrawio}
        className="mr-1.5 ml-5 bg-grey-button h-[30px] p-1 w-fit min-w-[270px]"
      >
        <div className="flex flex-row justify-center items-center h-full w-full">
          <DownloadIcon />
          {t('Download diagrams.net File')}
        </div>
      </GeneralButton>
    </div>
  );
};

export default DownloadFactorVizButtons;
