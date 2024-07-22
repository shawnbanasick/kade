import currentDate from '../../../Utils/currentDate1';
import currentTime from '../../../Utils/currentTime1';
import coreState from '../../GlobalState/coreState';
import docxTestFile from '../../Output/docxTestFile';

// get project name
const projectName = coreState.getState().projectName;
const date = currentDate();
const time = currentTime();
const dateTime = `${date}_${time}`;
const completeFileName = `${projectName}-scree_plot_${dateTime}`;

const downloadSvgImage = async () => {
  // get element
  const preface = '<?xml version="1.0" standalone="no"?>\r\n';
  const svgContent = new Blob([preface, docxTestFile], {});
  const docxContent = new TextEncoder().encode(docxTestFile);

  // to buffer
  //   const arrayBuffer = await new Response(svgContent).arrayBuffer();

  const defaultPath = `${completeFileName}.docx`;

  const filepath = await window.electronAPI.showSaveDocxDialog(defaultPath);
  if (!filepath) {
    alert('Save operation was canceled.');
    return;
  }

  try {
    const result = await window.electronAPI.saveDocx(docxContent.buffer, filepath);
    console.log(result);
  } catch (error) {
    console.error('Failed to save file:', error);
  }
};
export default downloadSvgImage;
// saveSvg(svg, completeFileName);
