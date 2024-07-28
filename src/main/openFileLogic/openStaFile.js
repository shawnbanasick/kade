import { BrowserWindow, dialog } from 'electron';
import fs from 'fs';

async function openStaFile() {
  const options = {
    //   // const files = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    title: 'Open STA File',
    filters: [
      {
        name: 'STA',
        extensions: ['sta', 'STA'],
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
          window.webContents.send('staData', content);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export default openStaFile;
