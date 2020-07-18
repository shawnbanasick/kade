const config = require("../configs/app.config");

module.exports = (app, mainWindow, i18n) => {
  let menu = [
    {
      label: i18n.t("KADE"),
      submenu: [
        {
          label: i18n.t("About KADE"),
          role: "about"
        },
        {
          type: "separator"
        },
        {
          label: i18n.t("Hide App"),
          accelerator: "Command+H",
          role: "hide"
        },
        {
          label: i18n.t("Hide Others"),
          accelerator: "Command+Shift+H",
          role: "hideothers"
        },
        {
          label: i18n.t("Show All"),
          role: "unhide"
        },
        {
          type: "separator"
        },
        {
          label: i18n.t("Quit"),
          accelerator: "Command+Q",
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: i18n.t("View"),
      submenu: [
        {
          label: i18n.t("Reload"),
          accelerator: "Command+R",
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.reload();
            }
          }
        },
        {
          label: i18n.t("Full Screen"),
          accelerator: "Ctrl+Command+F",
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
            }
          }
        },
        {
          label: i18n.t("Minimize"),
          accelerator: "Command+M",
          role: "minimize"
        },
        {
          type: "separator"
        },
        {
          label: i18n.t("Toggle Developer Tools"),
          accelerator: "Alt+Command+I",
          click: (item, focusedWindow) => {
            focusedWindow.webContents.toggleDevTools();
          }
        }
      ]
    },
    {
      label: i18n.t("Help"),
      submenu: [
        {
          label: i18n.t("About App"),
          click: function(item, focusedWindow) {
            if (focusedWindow) {
            }
          }
        }
      ]
    }
  ];

  const languageMenu = config.languages.map(languageCode => {
    return {
      label: i18n.t(languageCode),
      type: "radio",
      checked: i18n.language === languageCode,
      click: () => {
        console.log("called language change");
        i18n.changeLanguage(languageCode, (err, t) => {
          if (err) return console.log("something went wrong loading", err);
          t("key"); // -> same as i18next.t
        });
      }
    };
  });

  menu.push({
    label: i18n.t("Language"),
    submenu: languageMenu
  });

  return menu;
};

// const template = [
//   {
//     label: "Edit",
//     submenu: [
//       {
//         role: "cut"
//       },
//       {
//         role: "copy"
//       },
//       {
//         role: "paste"
//       },
//       {
//         role: "delete"
//       },
//       {
//         role: "selectall"
//       }
//     ]
//   },
//   {
//     label: "View",
//     submenu: [
//       {
//         role: "forcereload"
//       },
//       {
//         role: "toggledevtools"
//       },
//       {
//         type: "separator"
//       },
//       {
//         role: "resetzoom"
//       },
//       {
//         role: "zoomin"
//       },
//       {
//         role: "zoomout"
//       },
//       {
//         type: "separator"
//       },
//       {
//         role: "togglefullscreen"
//       }
//     ]
//   },
//   {
//     role: "window",
//     submenu: [
//       {
//         role: "minimize"
//       },
//       {
//         role: "close"
//       }
//     ]
//   },
//   {
//     label: "Help",
//     submenu: [
//       {
//         label: "User Guide",
//         accelerator:
//           process.platform === "darwin" ? "Alt+Cmd+U" : "Ctrl+Shift+U",
//         click() {
//           require("electron").shell.openExternal(
//             "https://github.com/shawnbanasick/kade/wiki"
//           );
//         }
//       },
//       {
//         label: "Show / Hide Developer Tools",
//         click() {
//           mainWindow.webContents.toggleDevTools();
//         }
//       },
//       {
//         label: "Report a Bug -> ken.q.tools@gmail.com",
//         click() {
//           require("electron").shell.openExternal(
//             "mailto:ken.q.tools@gmail.com"
//           );
//         }
//       }
//     ]
//   }

// ];

// if (process.platform === "darwin") {
//   template.unshift({
//     label: "name property",
//     submenu: [
//       {
//         role: "about"
//       },
//       {
//         type: "separator"
//       },
//       {
//         type: "separator"
//       },
//       {
//         role: "hide"
//       },
//       {
//         role: "hideothers"
//       },
//       {
//         role: "unhide"
//       },
//       {
//         type: "separator"
//       },
//       {
//         role: "quit"
//       }
//     ]
//   });

//   // Window menu
//   template[3].submenu = [
//     {
//       role: "close"
//     },
//     {
//       role: "minimize"
//     },
//     {
//       role: "zoom"
//     },
//     {
//       type: "separator"
//     },
//     {
//       role: "front"
//     }
//   ];
// }

// const menu = Menu.buildFromTemplate(template);
// Menu.setApplicationMenu(menu);

