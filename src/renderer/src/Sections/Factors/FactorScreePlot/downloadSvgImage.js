import currentDate from '../../../Utils/currentDate1';
import currentTime from '../../../Utils/currentTime1';
import coreState from '../../GlobalState/coreState';

// get project name
const projectName = coreState.getState().projectName;
const date = currentDate();
const time = currentTime();
const dateTime = `${date}_${time}`;
const completeFileName = `${projectName}-scree_plot_${dateTime}`;

const downloadSvgImage = async () => {
  // get element
  const svgEl = document.querySelector('#screePlot');
  svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  const svgData = svgEl.outerHTML;
  const preface = '<?xml version="1.0" standalone="no"?>\r\n';
  const svgContent = new Blob([preface, svgData], {
    type: 'image/svg+xml;charset=utf-8',
  });

  // to buffer
  const arrayBuffer = await new Response(svgContent).arrayBuffer();

  const defaultPath = `${completeFileName}.svg`;

  const filepath = await window.electronAPI.showSaveDialog(defaultPath);
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
export default downloadSvgImage;
// saveSvg(svg, completeFileName);
