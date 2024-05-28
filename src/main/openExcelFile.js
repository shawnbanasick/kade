import { BrowserWindow, dialog } from 'electron';
import XLSX from 'xlsx';

async function openExcelFile() {
  const options = {
    //   // const files = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    title: 'Open Excel File',
    filters: [
      {
        name: 'Excel',
        extensions: ['xls', 'XLS', 'xlsx', 'XLSX'],
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
          const content = XLSX.readFile(paths[0], { type: 'binary' });
          window.webContents.send('excelData', content);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export default openExcelFile;
