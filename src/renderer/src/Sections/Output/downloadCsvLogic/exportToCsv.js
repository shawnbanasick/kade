// const fs = require('fs');
// const { dialog } = require('electron').remote;
// const { remote } = require('electron');
// const mainWindow = remote.getCurrentWindow();
import coreState from '../../GlobalState/coreState';

const exportToCsv = async (fileName, rows) => {
  const processRow = (row) => {
    let finalVal = '';
    for (let j = 0, jLen = row.length; j < jLen; j += 1) {
      let value = row[j];
      if (value === null || value === undefined) {
        value = '';
      }
      const innerValue = value.toString();
      let result = innerValue.replace(/"/g, '""');
      if (result.search(/("|,|\n)/g) >= 0) {
        result = `"${result}"`;
      }
      if (j > 0) {
        finalVal += ',';
      }
      finalVal += result;
    }
    return `${finalVal}\n`;
  };

  let csvFile = '';
  for (let i = 0, iLen = rows.length; i < iLen; i += 1) {
    csvFile += processRow(rows[i]);
  }

  // get project name
  const projectName = coreState.getState().projectName;

  const dataContent = {
    projectName,
    type: 'csv',
    data: csvFile,
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

  // const files = await dialog.showSaveDialog(mainWindow, {
  //   title: 'Save file as',
  //   defaultPath: `*/${fileName}`,
  //   filters: [
  //     {
  //       name: 'csv',
  //       extensions: ['csv'],
  //     },
  //   ],
  // });

  // const filePath = files.filePath;

  // // catch dialog box cancel error
  // if (filePath) {
  //   fs.writeFile(filePath, csvFile, (err) => {
  //     if (err === undefined || err === null) {
  //       dialog.showMessageBoxSync(mainWindow, {
  //         message: `The file has been saved to ${filePath}.`,
  //         buttons: ['OK'],
  //       });
  //     } else {
  //       console.log(err);
  //       dialog.showErrorBox('File Save Error', err.message);
  //     }
  //   });
  // }
};

export default exportToCsv;
