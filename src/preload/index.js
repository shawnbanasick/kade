import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
// const i18nextBackend = require('i18next-electron-fs-backend');

// i18next-electron-fs-backend not working due to "Module 'path' has
// been externalized for browser compatibility" error

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.

if (process.contextIsolated) {
  try {
    // contextBridge.exposeInMainWorld('electron', electronAPI);
    contextBridge.exposeInMainWorld('electronAPI', {
      openFile: () => ipcRenderer.invoke('dialog:openFile'),
    });
    // export type ElectronHandler = typeof handler;
    contextBridge.exposeInMainWorld('languageChange', {
      // language: ipcRenderer.on('languageSignal', (_event, value) => {
      //   console.log('Language changed');
      //   return value;
      // }),
      language: (callback) =>
        ipcRenderer.on('languageSignal', (_event, value) => {
          console.log('Language changed');
          callback(value);
        }),
    });
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = electronAPI;
}
