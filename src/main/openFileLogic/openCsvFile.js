import { BrowserWindow, dialog } from 'electron';
import fs from 'fs';

async function openCsvFile() {
  const options = {
    //   // const files = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    title: 'Open CSV File',
    filters: [
      {
        name: 'CSV',
        extensions: ['csv', 'CSV'],
      },
    ],
  };
  const window = BrowserWindow.getFocusedWindow();
  dialog
    .showOpenDialog(window, options)
    .then((result) => {
      if (!result.canceled) {
        let paths = result.filePaths;
        if (paths && paths.length > 0) {
          const content = fs.readFileSync(paths[0], 'utf-8').toString();
          window.webContents.send('csvData', content);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export default openCsvFile;
