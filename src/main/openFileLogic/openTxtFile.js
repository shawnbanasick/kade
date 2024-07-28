import { BrowserWindow, dialog } from 'electron';
import fs from 'fs';

async function openTxtFile() {
  const options = {
    //   // const files = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    title: 'Open Text File',
    filters: [
      {
        name: 'TXT',
        extensions: ['txt', 'TXT'],
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
          window.webContents.send('txtData', content);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export default openTxtFile;
