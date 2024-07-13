import { BrowserWindow, dialog } from 'electron';
import fs from 'fs';

async function saveSvgFile(blob) {
  const options = {
    //   // const files = await dialog.showOpenDialog(mainWindow, {
    properties: ['saveSvgFile'],
    title: 'Export Svg File',
    filters: [
      {
        name: 'svg',
        extensions: ['svg', 'SVG'],
      },
    ],
  };
  const window = BrowserWindow.getFocusedWindow();
  dialog.showSaveDialog(window, blob);
  //     .then((result) => {
  //       if (!result.canceled) {
  //         let paths = result.filePaths;
  //         if (paths && paths.length > 0) {
  //             // write file to local storage
  //            (blob) => {
  //           fs.writeFile(paths[0], blob, err => {
  //             if (err) {
  //               console.error(err)
  //               return
  //             }
  //             console.log('File has been created')
  //           })
  //         }
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
}

export default saveSvgFile;
