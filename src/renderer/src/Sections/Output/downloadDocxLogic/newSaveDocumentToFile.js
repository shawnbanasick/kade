import calcState from '../../GlobalState/calcState';

const saveDocumentToFile = async (docOptions, translatedTextObj) => {
  const data = calcState.getState().outputData;

  // console.log('data', JSON.stringify(data));

  const dataContent = {
    type: 'docx',
    docOptions,
    translatedTextObj,
    data: [...data],
  };

  const newBlob = new Blob([JSON.stringify(dataContent)], { type: 'text/plain' });
  const arrayBuffer = await new Response(newBlob).arrayBuffer();

  try {
    // const buffer = new Uint8Array(data).buffer;
    window.bridge.sendLargeData('large-data', arrayBuffer, 'path');

    // const result = await window.electronAPI.saveDocx(docxContent.buffer, filepath);
    // console.log(result);
  } catch (error) {
    console.error('Failed to save file:', error);
  }
};
export default saveDocumentToFile;
// saveSvg(svg, completeFileName);
