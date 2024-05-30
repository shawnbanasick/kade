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
    });
    contextBridge.exposeInMainWorld('bridgeDat', {
      datData: (content) => {
        ipcRenderer.on('datData', content);
      },
    });
    contextBridge.exposeInMainWorld('bridgeExcel', {
      excelData: (content) => {
        ipcRenderer.on('excelData', content);
      },
    });
    contextBridge.exposeInMainWorld('bridgeZip', {
      zipData: (content) => {
        ipcRenderer.on('zipData', content);
      },
    });
    contextBridge.exposeInMainWorld('bridgeTxt', {
      txtData: (content) => {
        ipcRenderer.on('txtData', content);
      },
    });
  } catch (error) {
    console.error('Error: ', error);
  }
} else {
  window.electron = electronAPI;
}
