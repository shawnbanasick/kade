import currentDate from '../../../Utils/currentDate1';
import currentTime from '../../../Utils/currentTime1';
import coreState from '../../GlobalState/coreState';

// function saveSvg(svgEl, name) {
//   const svgUrl = URL.createObjectURL(svgBlob);
//   const downloadLink = document.createElement('a');
//   downloadLink.href = svgUrl;
//   downloadLink.download = name;
//   document.body.appendChild(downloadLink);
//   downloadLink.click();
//   document.body.removeChild(downloadLink);
// }

const projectName = coreState.getState().projectName;
const date = currentDate();
const time = currentTime();
const dateTime = `${date}_${time}`;
const completeFileName = `${projectName}-scree_plot_${dateTime}`;
console.log(completeFileName);

const downloadSvgImage = async () => {
  const svgEl = document.querySelector('#screePlot');
  svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  const svgData = svgEl.outerHTML;
  console.log(svgData);
  // const svgData = JSON.stringify(sv);
  const preface = '<?xml version="1.0" standalone="no"?>\r\n';
  const svgContent = new Blob([preface, svgData], {
    type: 'image/svg+xml;charset=utf-8',
  });

  // to buffer
  const arrayBuffer = await new Response(svgContent).arrayBuffer();

  const defaultPath = `${completeFileName}.svg`;
  console.log(defaultPath);

  const filepath = await window.electronAPI.showSaveDialog(defaultPath);
  console.log(filepath);
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
