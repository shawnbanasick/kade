import currentDate from '../../../Utils/currentDate1';
import currentTime from '../../../Utils/currentTime1';
import GeneralButton from '../../../Utils/GeneralButton';
import { useTranslation } from 'react-i18next';
import SvgIcon from '../../images/SVG_Icon2.svg';
import PngIcon from '../../images/PNG_Icon2.svg';
import vizState from '../../GlobalState/vizState';
import coreState from '../../GlobalState/coreState';
import d3ToPng from 'd3-svg-to-png';

const DownloadFactorVizButtons = (props) => {
  const { t } = useTranslation();
  const factorVizOptions = vizState((state) => state.factorVizOptions);
  const projectName = coreState((state) => state.projectName);

  const downloadSvgImage = (imageId) => {
    const shouldAddName = factorVizOptions.willAddCustomNameToDownload;
    const imageName = `#image${imageId}`;
    const date = currentDate();
    const time = currentTime();
    const dateTime = `${date}_${time}`;
    const cleanFactorName = `${imageId}`;
    let config;
    const customName = factorVizOptions.customDownloadFileNames;
    const customNameLocation = factorVizOptions.customFileNameLocation;
    if (shouldAddName === true) {
      if (customNameLocation === 'prepend') {
        config = { filename: `${customName}_${projectName}_${cleanFactorName}_${dateTime}` };
      } else if (customNameLocation === 'append') {
        config = { filename: `${projectName}_${cleanFactorName}_${dateTime}_${customName}` };
      } else if (customNameLocation === 'replace') {
        config = { filename: customName };
      } else {
        config = { filename: `${projectName}_${cleanFactorName}_${dateTime}` };
      }
    } else {
      config = { filename: `${projectName}_${cleanFactorName}_${dateTime}` };
    }

    const svg = document.querySelector(imageName);

    const saveSvg = async (svgEl, name) => {
      svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      const svgData = svgEl.outerHTML;
      const preface = '<?xml version="1.0" standalone="no"?>\r\n';
      const svgBlob = new Blob([preface, svgData], { type: 'image/svg+xml;charset=utf-8' });
      const arrayBuffer = await new Response(svgBlob).arrayBuffer();
      const defaultPath = `${name}.svg`;
      const filepath = await window.electronAPI.showSaveSvgDialog(defaultPath);
      if (!filepath) {
        alert('Save operation was canceled.');
        return;
      }
      try {
        const result = await window.electronAPI.saveSVG(arrayBuffer, filepath);
        console.log(result);
      } catch (error) {
        console.error('Failed to save file:', error);
      }
    };
    saveSvg(svg, config.filename);
  };

  const downloadFacVizAsPng = (imageId) => {
    const shouldAddName = factorVizOptions.willAddCustomNameToDownload;
    const imageName = `image${imageId}`;
    const date = currentDate();
    const time = currentTime();
    const dateTime = `${date}__${time}`;
    const customName = factorVizOptions.customDownloadFileNames;
    const customNameLocation = factorVizOptions.customFileNameLocation;
    const cleanFactorName = `${imageId}__`;
    let nameConfig;

    if (shouldAddName === true) {
      if (customNameLocation === 'prepend') {
        nameConfig = `${customName}_${projectName}_${cleanFactorName}${dateTime}`;
      } else if (customNameLocation === 'append') {
        nameConfig = `${projectName}__${cleanFactorName}${dateTime}_${customName}`;
      } else if (customNameLocation === 'replace') {
        nameConfig = customName;
      } else {
        nameConfig = `${projectName}__${cleanFactorName}${dateTime}`;
      }
    } else {
      nameConfig = `${projectName}__${cleanFactorName}${dateTime}`;
    }

    d3ToPng(document.getElementById(imageName), nameConfig, {
      backgroundColor: 'white',
      scale: 3,
      format: 'png',
      download: false,
      quality: 1,
    }).then(async (fileData) => {
      const buffer = fileData.split(',')[1];
      const defaultPath = `${nameConfig}.png`;
      const filepath = await window.electronAPI.showSavePngDialog(defaultPath);
      if (!filepath) {
        alert('Save operation was canceled.');
        return;
      }
      try {
        const result = await window.electronAPI.savePNG(buffer, filepath);
        console.log(result);
      } catch (error) {
        console.error('Failed to save file:', error);
      }
    });
  };

  return (
    <div className="flex">
      <GeneralButton
        id={`downloadSvgButtonFacViz${props.id}`}
        onClick={() => downloadSvgImage(props.id)}
        className="mr-1.5 ml-5"
      >
        <div className="flex flex-row justify-center items-center h-full w-full">
          <div className="flex justify-center items-center mr-2.5">
            <img src={SvgIcon} height="50px" alt="svg Icon" />
          </div>
          {t('Download Vector Image')}
        </div>
      </GeneralButton>
      <GeneralButton
        id={`downloadPngButtonFacViz${props.id}`}
        onClick={() => downloadFacVizAsPng(props.id)}
      >
        <div className="flex flex-row justify-center items-center h-full w-full">
          <div className="flex justify-center items-center mr-2.5">
            <img src={PngIcon} height="50px" alt="png Icon" />
          </div>
          {t('Download Raster Image')}
        </div>
      </GeneralButton>
    </div>
  );
};

export default DownloadFactorVizButtons;
