import { electronAPI } from '@electron-toolkit/preload';
import { contextBridge, ipcRenderer } from 'electron';

if (process.contextIsolated) {
  try {
    console.log('contextIsolated');
    contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('electronAPI', {
      openFile: () => ipcRenderer.send('dialog:openFile'),
      //  export type ElectronHandler = typeof handler;
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
  } catch (error) {
    console.error('Error: ', error);
  }
} else {
  window.electron = electronAPI;
}
