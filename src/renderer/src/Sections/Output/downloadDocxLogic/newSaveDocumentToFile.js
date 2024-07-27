// import currentDate from '../../../Utils/currentDate1';
// import currentTime from '../../../Utils/currentTime1';
// import coreState from '../../GlobalState/coreState';
// import docxTestFile from '../../Output/docxTestFile';
import calcState from '../../GlobalState/calcState';
// import cloneDeep from 'lodash/cloneDeep';
// import outputState from '../../GlobalState/outputState';

// get project name
// const date = currentDate();
// const time = currentTime();
// const dateTime = `${date}_${time}`;
// const completeFileName = `${projectName}-scree_plot_${dateTime}`;

const downloadSvgImage = async (docOptions, translatedTextObj) => {
  const data = calcState.getState().outputData;
  const conObj = {
    docOptions,
    translatedTextObj,
    data: [...data],
  };

  // console.log(JSON.stringify(conObj, null, 2));
  const newBlob = await new Blob([JSON.stringify(conObj)], { type: 'text/plain' });
  const arrayBuffer = await new Response(newBlob).arrayBuffer();

  // get element
  // const preface = '<?xml version="1.0" standalone="no"?>\r\n';
  // const svgContent = new Blob([preface, docxTestFile], {});
  // const docxContent = new TextEncoder().encode(docxTestFile);

  // to buffer
  //   const arrayBuffer = await new Response(svgContent).arrayBuffer();

  // const defaultPath = `${completeFileName}.docx`;

  // const filepath = await window.electronAPI.showSaveDocxDialog(defaultPath);
  // if (!filepath) {
  //   alert('Save operation was canceled.');
  //   return;
  // }

  try {
    // const buffer = new Uint8Array(data).buffer;
    window.bridge.sendLargeData('large-data', arrayBuffer, 'path');

    // const result = await window.electronAPI.saveDocx(docxContent.buffer, filepath);
    // console.log(result);
  } catch (error) {
    console.error('Failed to save file:', error);
  }
};
export default downloadSvgImage;
// saveSvg(svg, completeFileName);
