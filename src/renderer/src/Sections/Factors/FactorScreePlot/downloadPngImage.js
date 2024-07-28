import currentDate from '../../../Utils/currentDate1';
import currentTime from '../../../Utils/currentTime1';
import coreState from '../../GlobalState/coreState';
import d3ToPng from 'd3-svg-to-png';

const downloadPngImage = () => {
  // getState
  const projectName = coreState.getState().projectName;
  const date = currentDate();
  const time = currentTime();
  const dateTime = `${date} ${time}`;
  const filename = `${projectName}-scree_plot_${dateTime}`;

  const svg = document.getElementById('screePlot');
  d3ToPng(svg, filename, {
    backgroundColor: 'white',
    scale: 3,
    format: 'png',
    download: false,
    quality: 1,
  }).then(async (fileData) => {
    const buffer = fileData.split(',')[1];
    const defaultPath = `${filename}.png`;
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

export default downloadPngImage;
