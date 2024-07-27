import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import MenuFactory from './menu';
import i18nextMainBackend from '../../app/localization/i18n.mainconfig';
import openStaFile from './openStaFile';
import openDatFile from './openDatFile';
import openExcelFile from './openExcelFile';
import openZipFile from './openZipFile';
import openTxtFile from './openTxtFile';
import openJsonFile from './openJsonFile';
import saveSvgFile from './saveSvgFile';
import createResultsDocx from './createResultsDocx';
import createOutputDoc from './docxLogic/createOutputDoc';

const fs = require('fs');

// import fs from 'fs';
// import i18nextBackend from 'i18next-electron-fs-backend';
//import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let menuBuilder;

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 900,
    show: false,
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  // Sets up main.js bindings for our i18next backend
  // i18nextBackend.mainBindings(ipcMain, win, fs);

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  menuBuilder = MenuFactory(win, app.name);

  menuBuilder.buildMenu(i18nextMainBackend);

  // Set up necessary bindings to update the menu items
  // based on the current language selected
  i18nextMainBackend.on('initialized', (loaded) => {
    i18nextMainBackend.changeLanguage('en');
    i18nextMainBackend.off('initialized'); // Remove listener to this event as it's not needed anymore
  });

  // When the i18n framework starts up, this event is called
  // (presumably when the default language is initialized)
  // BEFORE the "initialized" event is fired - this causes an
  // error in the logs. To prevent said error, we only call the
  // below code until AFTER the i18n framework has finished its
  // "initialized" event.
  i18nextMainBackend.on('languageChanged', (lng) => {
    if (i18nextMainBackend.isInitialized) {
      console.log('Language changed to', lng);
      menuBuilder.buildMenu(i18nextMainBackend);
      mainWindow.webContents.send('languageSignal', lng);
    }
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // installExtension(REACT_DEVELOPER_TOOLS)
  //   .then((name) => console.log(`Added Extension: ${name}`))
  //   .catch((err) => console.log('An error occurred: ', err));

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on('ping', () => console.log('pong'));

  // Open Files
  ipcMain.on('dialog:openStaFile', openStaFile);
  ipcMain.on('dialog:openDatFile', openDatFile);
  ipcMain.on('dialog:openExcelFile', openExcelFile);
  ipcMain.on('dialog:openZipFile', openZipFile);
  ipcMain.on('dialog:openTxtFile', openTxtFile);
  ipcMain.on('dialog:openJsonFile', openJsonFile);

  // Path
  ipcMain.handle('getPath', () => {
    app.getPath('documents');
  });

  // Save Files

  ipcMain.handle('save-svg', async (event, arrayBuffer, filePath) => {
    const svgContent = Buffer.from(arrayBuffer).toString('utf-8');
    console.log(JSON.stringify(svgContent));
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, svgContent, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve('File saved successfully');
        }
      });
    });
  });

  ipcMain.handle('save-docx', async (event, arrayBuffer, filePath) => {
    // const docxContent = Buffer.from(arrayBuffer).toString('utf-8');
    // const docxContent = new TextDecoder().decode(arrayBuffer);
    console.log(JSON.stringify(arrayBuffer));
    createResultsDocx(JSON.stringify(arrayBuffer));
    // let file2 = file[0];
    // return new Promise((resolve, reject) => {
    //   fs.writeFile(filePath, file2, (err) => {
    //     if (err) {
    //       reject(err);
    //     } else {
    //       resolve('File saved successfully');
    //     }
    //   });
    // });
  });

  ipcMain.handle('large-data', async (event, arrayBuffer, path) => {
    const docxContent = JSON.parse(Buffer.from(arrayBuffer).toString('utf-8'));
    createOutputDoc(docxContent);
    // console.log('Received large data array:', docxContent);
  });

  ipcMain.handle('show-saveSvg-dialog', async (event, defaultPath) => {
    const result = await dialog.showSaveDialog({
      title: 'Save SVG',
      defaultPath: defaultPath || 'untitled.svg',
      filters: [{ name: 'SVG Files', extensions: ['svg'] }],
    });
    return result.filePath;
  });

  ipcMain.handle('show-saveDocx-dialog', async (event, defaultPath) => {
    const result = await dialog.showSaveDialog({
      title: 'Save DOCX',
      defaultPath: defaultPath || 'untitled.docx',
      filters: [{ name: 'DOCX Files', extensions: ['docx'] }],
    });
    return result.filePath;
  });

  ipcMain.on('showSaveDialogSync', saveSvgFile);
  ipcMain.handle('writeFile', (event, filepath, buffer) => {
    var message = {};
    fs.writeFileSync(filepath, buffer, (err) => {
      if (err) {
        message.text = err;
        message.title = 'Error Saving File';
      } else {
        message.text = filepath;
        message.title = 'File saved to';
      }
    });
    return message;
  });

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  } else {
    // i18nextBackend.clearMainBindings(ipcMain);
  }
});

app.on('web-contents-created', (event, contents) => {
  // enable i18next translations in popup window
  contents.on('did-create-window', (window) => {
    // i18nextBackend.mainBindings(ipcMain, window, fs);
  });
  // destroy bindings on popup window closed
  contents.on('destroyed', () => {
    // i18nextBackend.clearMainBindings(ipcMain);
  });
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
