import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import iconWin from '../../resources/icon2.ico?asset'; // add for Windows
import iconMac from '../../resources/icon.icns?asset'; // add for macOS
import MenuFactory from './menu';
import i18nextMainBackend from '../../app/localization/i18n.mainconfig';
import openStaFile from './openFileLogic/openStaFile';
import openDatFile from './openFileLogic/openDatFile';
import openExcelFile from './openFileLogic/openExcelFile';
import openZipFile from './openFileLogic/openZipFile';
import openCsvFile from './openFileLogic/openCsvFile';
import openTxtFile from './openFileLogic/openTxtFile';
import openJsonFile from './openFileLogic/openJsonFile';
import saveSvgFile from './openFileLogic/saveSvgFile';
import exportDocx from './docxLogic/exportDocx';
import { windowStateKeeper } from './windowStateKeeper';
import settings from 'electron-settings';
import createXlsxFile from './excelLogic/createXlsxFile';
import createCsvFile from './csvLogic/createCsvFile';
import createConExcelFile from './excelLogic/createConExcelFile';
import createDistExcelFile from './excelLogic/createDistExcelFile';
import createXlsxFileT1 from './excelLogic/createXlsxFileT1';
import createXlsxFileT2 from './excelLogic/createXlsxFileT2';

const fs = require('fs');

// import i18nextBackend from 'i18next-electron-fs-backend';
//import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let menuBuilder;

function getIcon() {
  switch (process.platform) {
    case 'win32':
      return iconWin;
    case 'darwin':
      return iconMac;
    default:
      return icon; // Linux PNG file
  }
}

async function createWindow() {
  const mainWindowStateKeeper = await windowStateKeeper('main');

  let splash = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
  });
  splash.loadFile('splash.html');

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    x: mainWindowStateKeeper.x,
    y: mainWindowStateKeeper.y,
    width: mainWindowStateKeeper.width,
    height: mainWindowStateKeeper.height,
    show: false,
    backgroundColor: '#ffffff',
    autoHideMenuBar: false,
    icon: getIcon(),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      contextIsolation: true,
      enableRemoteModule: true,
    },
  });

  // Prevent Electron from consuming Escape
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'Escape') {
      event.preventDefault(); // let it fall through to the renderer
      mainWindow.webContents.send('escape-pressed'); // send a message to the renderer
    }
  });
  // Add this right after creating mainWindow
  mainWindow.webContents.on('did-finish-load', () => {
    // Forces the window to paint before showing
    // mainWindow.webContents.executeJavaScript('document.body.style.visibility = "visible"');
    mainWindow.webContents.executeJavaScript('document.body.style.opacity = "1"');
  });

  if (mainWindowStateKeeper.isMaximized === true) {
    mainWindow.maximize();
  }

  mainWindowStateKeeper.track(mainWindow);
  // Sets up main.js bindings for our i18next backend
  // i18nextBackend.mainBindings(ipcMain, win, fs);

  // delay the showing of the main window to give the splash time to load
  mainWindow.on('ready-to-show', () => {
    setTimeout(() => {
      if (splash && !splash.isDestroyed()) {
        splash.close();
      }
      mainWindow.show();
      splash = null;
    }, 500);
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  // Wait for splash to finish loading before loading the main window
  splash.webContents.on('did-finish-load', () => {
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
    } else {
      mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
    }
  });

  menuBuilder = MenuFactory(mainWindow, app.name);

  menuBuilder.buildMenu(i18nextMainBackend);

  // Set up necessary bindings to update the menu items
  // based on the current language selected
  i18nextMainBackend.on('initialized', () => {
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
      settings.set('currentLanguage', lng);
      menuBuilder.buildMenu(i18nextMainBackend);
      mainWindow.webContents.send('languageSignal', lng);
    }
  });
}

app.commandLine.appendSwitch('disable-features', 'NetworkServiceSandbox');
app.commandLine.appendSwitch('disable-gpu-shader-disk-cache');

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // If a second instance is launched, focus the existing window
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });

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
    ipcMain.on('dialog:openCsvFile', openCsvFile);

    // Path
    ipcMain.handle('getPath', () => {
      app.getPath('documents');
    });

    // Save Files

    ipcMain.handle('save-svg', async (event, arrayBuffer, filePath) => {
      const imgContent = Buffer.from(arrayBuffer).toString('utf-8');
      return new Promise((resolve, reject) => {
        fs.writeFile(filePath, imgContent, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve('File saved successfully');
            dialog.showMessageBoxSync({
              title: 'KADE',
              type: 'info',
              message: `File saved to:`,
              detail: `${filePath}`,
              buttons: ['OK'],
            });
          }
        });
      });
    });

    ipcMain.handle('save-png', async (event, imgContent, filePath) => {
      return new Promise((resolve, reject) => {
        fs.writeFile(filePath, imgContent, 'base64', (err) => {
          if (err) {
            reject(err);
          } else {
            resolve('File saved successfully');
            dialog.showMessageBoxSync({
              title: 'KADE',
              type: 'info',
              message: `File saved to:`,
              detail: `${filePath}`,
              buttons: ['OK'],
            });
          }
        });
      });
    });

    ipcMain.handle('large-data', async (event, arrayBuffer, path) => {
      const dataContent = JSON.parse(Buffer.from(arrayBuffer).toString('utf-8'));

      if (dataContent.type === 'docx') {
        exportDocx(dataContent);
      }
      if (dataContent.type === 'xlsx') {
        createXlsxFile(dataContent);
      }
      if (dataContent.type === 'csv') {
        createCsvFile(dataContent);
      }
      if (dataContent.type === 'ConExcel') {
        createConExcelFile(dataContent);
      }
      if (dataContent.type === 'distExcel') {
        createDistExcelFile(dataContent);
      }
      if (dataContent.type === 'ExampleExcelT1') {
        createXlsxFileT1(dataContent);
      }
      if (dataContent.type === 'ExampleExcelT2') {
        createXlsxFileT2(dataContent);
      }
    });

    ipcMain.handle('show-saveSvg-dialog', async (event, defaultPath) => {
      const result = await dialog.showSaveDialog({
        title: 'Save SVG',
        defaultPath: defaultPath || 'untitled.svg',
        filters: [{ name: 'SVG Files', extensions: ['svg'] }],
      });
      return result.filePath;
    });

    ipcMain.handle('show-savePng-dialog', async (event, defaultPath) => {
      const result = await dialog.showSaveDialog({
        title: 'Save PNG',
        defaultPath: defaultPath || 'untitled.png',
        filters: [{ name: 'PNG Files', extensions: ['png'] }],
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
}
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
