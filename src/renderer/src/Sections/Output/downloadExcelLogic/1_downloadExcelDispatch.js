// import downloadExcelOutputFile from './2_downloadExcelOutputFile';
import calcState from '../../GlobalState/calcState';
import cloneDeep from 'lodash/cloneDeep';
import coreState from '../../GlobalState/coreState';

const downloadExcelDispatch = async () => {
  // initialize output cascade

  const dataXlsx = cloneDeep(calcState.getState().outputData);
  const colSizes = cloneDeep(calcState.getState().colSizes);
  const sheetNamesXlsx = cloneDeep(calcState.getState().sheetNamesXlsx);
  const projectName = coreState.getState().projectName;

  const dataContent = {
    projectName,
    type: 'xlsx',
    dataXlsx,
    colSizes,
    sheetNamesXlsx,
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

  // needs dataXlsx, sheetNamesXlsx, colSizes from store
  // console.log(JSON.stringify(dataXlsx));
  // downloadExcelOutputFile(dataXlsx, sheetNamesXlsx, colSizes);
};

export default downloadExcelDispatch;
