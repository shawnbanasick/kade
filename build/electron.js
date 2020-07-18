const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Tray = electron.Tray;
const dialog = require("electron").dialog;
const path = require("path");
const isDev = require("electron-is-dev");
const appConfig = require("electron-settings");
const config = require("./configs/app.config");
const i18n = require("i18next");
const i18nextBackend = require("i18next-node-fs-backend");
const menuFactoryService = require("./services/menuFactory");
const ipcMain = electron.ipcMain;

let mainWindow;

function windowStateKeeper(windowName) {
  let window, windowState;
  function setBounds() {
    // Restore from appConfig
    if (appConfig.has(`windowState.${windowName}`)) {
      windowState = appConfig.get(`windowState.${windowName}`);
      return;
    }
    // Default
    windowState = {
      x: undefined,
      y: undefined,
      width: 1280,
      height: 720
    };
  }
  function saveState() {
    if (!windowState.isMaximized) {
      windowState = window.getBounds();
    }
    windowState.isMaximized = window.isMaximized();
    appConfig.set(`windowState.${windowName}`, windowState);
  }
  function track(win) {
    window = win;
    ["resize", "move", "close"].forEach(event => {
      win.on(event, saveState);
    });
  }
  setBounds();
  return {
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    isMaximized: windowState.isMaximized,
    track
  };
}

function createWindow() {
  // Get window state
  const mainWindowStateKeeper = windowStateKeeper("main");
  // Creating the window
  const windowOptions = {
    title: "Main Window",
    x: mainWindowStateKeeper.x,
    y: mainWindowStateKeeper.y,
    width: mainWindowStateKeeper.width,
    height: mainWindowStateKeeper.height,
    webPreferences: { nodeIntegration: true }
  };

  let currentLanguage;
  if (appConfig.has(`currentLanguage`)) {
    currentLanguage = appConfig.get(`currentLanguage`);
  } else {
    currentLanguage = "en";
  }

  let pathToTranslation;
  if (isDev) {
    pathToTranslation = path.join(
      __dirname,
      "../build/locales/{{lng}}/{{ns}}.json"
    );
    pathToMissing = path.join(
      __dirname,
      "../build/locales/{{lng}}/{{ns}}.missing.json"
    );
  } else {
    pathToTranslation = path.join(__dirname, "/locales/{{lng}}/{{ns}}.json");
    pathToMissing = path.join(
      __dirname,
      "/locales/{{lng}}/{{ns}}.missing.json"
    );
  }

  const i18nextOptions = {
    backend: {
      loadPath: pathToTranslation,
      addPath: pathToMissing,
      // jsonIndent to use when storing json files
      jsonIndent: 2
    },
    interpolation: {
      escapeValue: false
    },
    keySeparator: ">",
    nsSeparator: "|",
    saveMissing: true,
    fallbackLng: config.fallbackLng,
    whitelist: config.languages,
    react: {
      wait: true
    }
  };

  i18n.use(i18nextBackend);

  // initialize if not already initialized
  if (!i18n.isInitialized) {
    i18n.init(i18nextOptions);
  }

  i18n.on("loaded", loaded => {
    let currentLanguage;
    if (appConfig.has(`currentLanguage`)) {
      currentLanguage = appConfig.get(`currentLanguage`);
    } else {
      currentLanguage = "en";
    }

    i18n.changeLanguage(currentLanguage);
    i18n.off("loaded");
  });

  i18n.on("languageChanged", lng => {
    menuFactoryService.buildMenu(app, mainWindow, i18n);
    mainWindow.webContents.send("language-changed", {
      language: lng,
      namespace: config.namespace,
      resource: i18n.getResourceBundle(lng, config.namespace)
    });

    appConfig.set(`currentLanguage`, lng);
  });

  mainWindow = new BrowserWindow(windowOptions);
  // Track window state
  mainWindowStateKeeper.track(mainWindow);

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  // Dereference the window object, usually you would store windows
  // in an array if your app supports multi windows, this is the time
  // when you should delete the corresponding element.
  mainWindow.on("closed", () => (mainWindow = null));

  // showMessageBox returns a promise
  mainWindow.on("close", function(e) {
    e.preventDefault();
    var choice = dialog.showMessageBox(mainWindow, {
      title: "Confirm Quit",
      type: "question",
      buttons: ["Yes", "No"],
      message: "Are you sure you want to quit?",
      cancelId: 2
    });

    choice.then(function(result) {
      if (result.response === 0) {
        mainWindow.destroy();
      }
    });
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
} // end of create mainWindow function

ipcMain.on("get-initial-translations", (event, arg) => {
  let currentLanguage;
  if (appConfig.has(`currentLanguage`)) {
    currentLanguage = appConfig.get(`currentLanguage`);
  } else {
    currentLanguage = "en";
  }

  i18n.loadLanguages(currentLanguage, (err, t) => {
    const initial = {
      currentLanguage: {
        translation: i18n.getResourceBundle(currentLanguage, config.namespace)
      }
    };
    event.returnValue = initial;
  });

  // todo - fix this ugly hack to get requested language to appear on re-load
  i18n.changeLanguage(currentLanguage);
});

let updateVersion = "";
let versionStoredInUserSettings = "";

app.on("ready", () => {
  createWindow();

  // request updateVersion info on GITHUB
  let updateVersionInfo;
  let version = "1.2.0";
  const { net } = require("electron");
  const request = net.request(
    "https://raw.githubusercontent.com/shawnbanasick/kade/master/version.json"
  );
  request.on("response", response => {
    // console.log(`STATUS: ${response.statusCode}`);
    // console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
    response.on("data", chunk => {
      // console.log(`BODY: ${chunk}`);
      try {
        updateVersionInfo = JSON.parse(chunk);
        updateVersion = updateVersionInfo.releaseVersion;
      } catch (error) {
        console.log(`ERROR: ${JSON.stringify(error)}`);
      }
    });

    response.on("error", error => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
    });

    response.on("end", () => {
      console.log("No more data in response.");
    });
  });
  request.end();

  // version status stored in user settings file
  // (might differ from software version if they skipped an update)
  if (appConfig.has("versionStoredInUserSettings")) {
    versionStoredInUserSettings = appConfig.get("versionStoredInUserSettings");
    // console.log("version stored:", versionStoredInUserSettings);
  } else {
    console.log("has NO values");
    versionStoredInUserSettings = "1.2.0";
  }

  setTimeout(() => {
    mainWindow.webContents.send("shouldUpdate", [
      updateVersionInfo,
      updateVersion,
      versionStoredInUserSettings
    ]);
  }, 10000);
  // }

  ipcMain.on("skip-update-confirmed", (event, arg) => {
    // changes user settings so that update version from GitHub is now stored as "versionStoredInUserSettings"
    appConfig.set("versionStoredInUserSettings", updateVersion);
  });
});

menuFactoryService.buildMenu(app, mainWindow, i18n);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

function installExtensions() {
  if (process.env.NODE_ENV === "development") {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Install extensions
    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log("An error occurred: ", err));
  }
}
