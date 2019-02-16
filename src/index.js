// require('electron-react-devtools').install();
// localStorage.debug = 'worker:*'

import { app, Menu, dialog } from "electron";
import { enableLiveReload } from "electron-compile";
import * as Splashscreen from "@trodi/electron-splashscreen";
import * as path from "path";
// import * as url from "url";

// npm install lru-cache first
// const lru = require("lru-cache")({
//   max: 256,
//   maxAge: 250
// });

// const fs = require("fs");

// const origLstat = fs.lstatSync.bind(fs);

// // NB: The biggest offender of thrashing lstatSync is the node module system
// // itself, which we can't get into via any sane means.
// require("fs").lstatSync = function(p) {
//   let r = lru.get(p);
//   if (r) return r;

//   r = origLstat(p);
//   lru.set(p, r);
//   return r;
// };

// for window exit check
app.showExitPrompt = true;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) {
  enableLiveReload({
    strategy: "react-hmr"
  });
}

const createWindow = async () => {
  // Create the browser window.
  // mainWindow = new BrowserWindow({
  //   width: 980,
  //   height: 750,
  //   titleBarStyle: "hidden"
  // // icon: path.join(__dirname, "assets/icons/png/64x64.png")
  // });

  const windowOptions = {
    width: 1170, // 980,  1366  (old - 1100)
    height: 750, // 750,  768
    titleBarStyle: "hidden",
    backgroundColor: "#FFFF",
  };

  // todo - check linux icon settings - icon:path
  mainWindow = Splashscreen.initSplashScreen({
    windowOpts: windowOptions,
    // icon: path.join(`${__dirname}./assets/icons/png/512x512.png`),
    // icon: path.join(__dirname, "./assets/icons/png/512x512.png"),
    templateUrl: path.join(__dirname, "./assets/splash/", "splashScreen3.svg"),
    delay: 0, // force show immediately since example will load fast
    minVisible: 1500, // show for 1.5s so example is obvious
    splashScreenOpts: {
      height: 520,
      width: 520,
      transparent: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.webContents.on("new-window", (e, url) => {
    e.preventDefault();
    require("electron").shell.openExternal(url);
  });


  const template = [
    {
      label: "Edit",
      submenu: [
        {
          role: "cut"
        },
        {
          role: "copy"
        },
        {
          role: "paste"
        },
        {
          role: "delete"
        },
        {
          role: "selectall"
        }
      ]
    },
    {
      label: "View",
      submenu: [
        {
          role: "forcereload"
        },
        {
          role: "toggledevtools"
        },
        {
          type: "separator"
        },
        {
          role: "resetzoom"
        },
        {
          role: "zoomin"
        },
        {
          role: "zoomout"
        },
        {
          type: "separator"
        },
        {
          role: "togglefullscreen"
        }
      ]
    },
    {
      role: "window",
      submenu: [
        {
          role: "minimize"
        },
        {
          role: "close"
        }
      ]
    },
    {
      label: "Help",
      submenu: [
        {
          label: "User Guide",
          accelerator: process.platform === "darwin" ? "Alt+Cmd+U" : "Ctrl+Shift+U",
          click() {
            require("electron").shell.openExternal(
              "https://github.com/shawnbanasick/kade/wiki"
            );
          }
        },
        {
          label: "Show / Hide Developer Tools",
          click() {
            mainWindow.webContents.toggleDevTools();
          }
        },
        {
          label: "Report a Bug -> ken.q.tools@gmail.com",
          click() {
            require("electron").shell.openExternal(
              "mailto:ken.q.tools@gmail.com"
            );
          }
        }
      ]
    }
  ];

  if (process.platform === "darwin") {
    template.unshift({
      label: app.getName(),
      submenu: [
        {
          role: "about"
        },
        {
          type: "separator"
        },
        {
          type: "separator"
        },
        {
          role: "hide"
        },
        {
          role: "hideothers"
        },
        {
          role: "unhide"
        },
        {
          type: "separator"
        },
        {
          role: "quit"
        }
      ]
    });

    // Window menu
    template[3].submenu = [
      {
        role: "close"
      },
      {
        role: "minimize"
      },
      {
        role: "zoom"
      },
      {
        type: "separator"
      },
      {
        role: "front"
      }
    ];
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // Open the DevTools.
  // if (isDevMode) {
  //   await installExtension(REACT_DEVELOPER_TOOLS);
  //   mainWindow.webContents.openDevTools();
  // }

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });


  mainWindow.on('close', (e) => {
    if (app.showExitPrompt) {
      e.preventDefault() // Prevents the window from closing 
      dialog.showMessageBox({
        type: 'question',
        buttons: ['Yes', 'No'],
        title: 'Confirm',
        message: 'Are you sure you want to quit?'
      }, (response) => {
        if (response === 0) { // Runs the following if 'Yes' is clicked
          app.showExitPrompt = false
          mainWindow.close()
        }
      })
    }
  });
};




// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  app.showExitPrompt = true;
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    app.showExitPrompt = true;
    createWindow();
  }
});

// app.on("before-quit", e => {
//   const options = {
//     type: "question",
//     buttons: ["Yes", "No"],
//     defaultId: 1,
//     title: "Confirm",
//     message: "Are you sure you want to quit?"
//   };

//   dialog.showMessageBox(null, options, response => {
//     if (response === 1) {
//       e.preventDefault();
//     }
//   });
// });



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
