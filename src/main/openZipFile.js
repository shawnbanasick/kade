import { BrowserWindow, dialog } from 'electron';
import fs from 'fs';

async function openDatFile() {
  const options = {
    //   // const files = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    title: 'Open ZIP File',
    filters: [
      {
        name: 'Zip',
        extensions: ['zip', 'ZIP'],
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
          const content = fs.readFileSync(paths[0]);
          window.webContents.send('zipData', content);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export default openDatFile;
