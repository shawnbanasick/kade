import { BrowserWindow, dialog } from 'electron';
import fs from 'fs';

async function openXmlFile() {
  const options = {
    //   // const files = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    title: 'Open XML File',
    filters: [
      {
        name: 'XML',
        extensions: ['xml', 'XML'],
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
          //   console.log('content', content);
          window.webContents.send('xmlData', content);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export default openXmlFile;
