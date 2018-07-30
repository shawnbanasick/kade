import { app, BrowserWindow, dialog, Menu } from "electron";
// import installExtension, {
//   REACT_DEVELOPER_TOOLS
// } from "electron-devtools-installer";
import { enableLiveReload } from "electron-compile";

// import fs from "fs";

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
  mainWindow = new BrowserWindow({
    // webPreferences: {
    //   nodeIntegration: false
    // },
    width: 800,
    height: 600,
    titleBarStyle: "hidden"
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // to open file
  // function openFile() {
  //   // to open dialog for file input
  //   const files = dialog.showOpenDialog(mainWindow, {
  //     properties: ["openFile"],
  //     filters: [
  //       {
  //         name: "Markdown",
  //         extensions: ["md", "markdown", "txt"]
  //       }
  //     ]
  //   });
  // }

  // to open directory
  function openDir() {
    // to open dialog for file input
    const directory = dialog.showOpenDialog(mainWindow, {
      properties: ["openDirectory"]
    });

    // to stop no file error, early return
    if (!directory) return;

    const dir = directory[0];

    mainWindow.webContents.send("new-dir", dir);
  }

  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "Open Folder",
          accelerator: "CmdOrCtrl+O",
          click() {
            openDir();
          }
        },
        {
          label: "Save File",
          accelerator: "CmdOrCtrl+S",
          click() {
            mainWindow.webContents.send("save-file");
          }
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        {
          role: "undo"
        },
        {
          role: "redo"
        },
        {
          type: "separator"
        },
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
          role: "pasteandmatchstyle"
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
          role: "reload"
        },
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
      role: "help",
      submenu: [
        {
          label: "Learn More"
          // click() {
          //   require('electron').shell.openExternal('https://electronjs.org');
          // },
        }
      ]
    },
    {
      label: "Developer",
      submenu: [
        {
          label: "Toggle Developer Tools",
          accelerator:
            process.platform === "darwin" ? "Alt+Cmd+I" : "Ctrl+Shift+I",
          click() {
            mainWindow.webContents.toggleDevTools();
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
          role: "services",
          submenu: []
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

    // Edit menu
    template[2].submenu.push(
      {
        type: "separator"
      },
      {
        label: "Speech",
        submenu: [
          {
            role: "startspeaking"
          },
          {
            role: "stopspeaking"
          }
        ]
      }
    );

    // Window menu
    template[4].submenu = [
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
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
