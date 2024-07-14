import { electronAPI } from '@electron-toolkit/preload';
import { contextBridge, ipcRenderer } from 'electron';

if (process.contextIsolated) {
  try {
    console.log('contextIsolated');
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('electronAPI', {
      openStaFile: () => ipcRenderer.send('dialog:openStaFile'),
      openDatFile: () => ipcRenderer.send('dialog:openDatFile'),
      openExcelFile: () => ipcRenderer.send('dialog:openExcelFile'),
      openZipFile: () => ipcRenderer.send('dialog:openZipFile'),
      openTxtFile: () => ipcRenderer.send('dialog:openTxtFile'),
      openJsonFile: () => ipcRenderer.send('dialog:openJsonFile'),
      saveSvgFile: () => ipcRenderer.send('showSaveDialogSync'),
      saveSVG: (svgContent, filePath) => ipcRenderer.invoke('save-svg', svgContent, filePath),
      showSaveDialog: (defaultPath) => ipcRenderer.invoke('show-save-dialog', defaultPath),
    });

    contextBridge.exposeInMainWorld('nodeAPI', {
      createBuffer: (data) => Buffer.from(data),
    });

    contextBridge.exposeInMainWorld('languageChange', {
      language: (callback) =>
        ipcRenderer.on('languageSignal', (_event, value) => {
          console.log('Language changed');
          callback(value);
        }),
    });
    contextBridge.exposeInMainWorld('bridge', {
      staData: (content) => {
        ipcRenderer.on('staData', content);
      },
      datData: (content) => {
        ipcRenderer.on('datData', content);
      },
      excelData: (content) => {
        ipcRenderer.on('excelData', content);
      },
      zipData: (content) => {
        ipcRenderer.on('zipData', content);
      },
      txtData: (content) => {
        ipcRenderer.on('txtData', content);
      },
      jsonData: (content) => {
        ipcRenderer.on('jsonData', content);
      },
      openDialog: (method, params) => ipcRenderer.invoke(method, params),
      getPath: () => ipcRenderer.invoke('getPath'),
      writeFile: (filepath, blob) => ipcRenderer.invoke('writeFile', filepath, blob),
    });
  } catch (error) {
    console.error('Error: ', error);
  }
} else {
  window.electron = electronAPI;
}
