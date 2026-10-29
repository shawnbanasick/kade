import { BrowserWindow, dialog } from 'electron';
import fs from 'fs';

async function openQuinceSortFile() {
  const options = {
    properties: ['openFile'],
    title: 'Open Quince Database File',
    filters: [
      {
        name: 'CSV',
        extensions: ['csv', 'csv'],
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
          const content = fs.readFileSync(paths[0], 'utf-8').replace(/^\uFEFF/, '');
          window.webContents.send('quinceData', content);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export default openQuinceSortFile;
