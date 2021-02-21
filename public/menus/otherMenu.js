const config = require("../configs/app.config");

const isMac = process.platform === "darwin";

module.exports = (app, mainWindow, i18n) => {
  let menu = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              {
                label: i18n.t("About KADE"),
                role: "about"
              },
              {
                type: "separator"
              },
              {
                role: "services"
              },
              { type: "separator" },
              {
                label: i18n.t("Hide App"),
                role: "hide"
              },
              {
                role: "hideothers"
              },
              {
                role: "unhide"
              },
              { type: "separator" },
              {
                label: i18n.t("Quit"),
                role: "quit"
              }
            ]
          }
        ]
      : []),
    // { role: 'fileMenu' }
    {
      label: i18n.t("Home"),
      submenu: [
        isMac ? { role: "close" } : { label: i18n.t("Quit"), role: "quit" }
      ]
    },
    // { role: 'editMenu' }
    {
      label: i18n.t("Edit"),
      submenu: [
        { label: i18n.t("Undo"), role: "undo" },
        { label: i18n.t("Redo"), role: "redo" },
        { type: "separator" },
        {
          label: i18n.t("Cut"),
          role: "cut"
        },
        {
          label: i18n.t("Copy"),
          role: "copy"
        },
        {
          label: i18n.t("Paste"),
          role: "paste"
        },
        { type: "separator" },
        { label: i18n.t("Delete"), role: "delete" },
        { label: i18n.t("Select All"), role: "selectAll" }
      ]
    },
    // { role: 'viewMenu' }
    {
      label: i18n.t("View"),
      submenu: [
        { label: i18n.t("Force Reload"), role: "forcereload" },
        { label: i18n.t("Toggle Developer Tools"), role: "toggledevtools" },
        { type: "separator" },
        { label: i18n.t("Reset Zoom"), role: "resetzoom" },
        { label: i18n.t("Zoom In"), role: "zoomin" },
        { label: i18n.t("Zoom Out"), role: "zoomout" },
        { type: "separator" },
        { label: i18n.t("Toggle Full Screen"), role: "togglefullscreen" }
      ]
    },
    // { role: 'windowMenu' }
    {
      label: i18n.t("Window"),
      submenu: [
        { label: i18n.t("Minimize"), role: "minimize" },
        { label: i18n.t("Close"), role: "close" }
      ]
    },
    {
      label: i18n.t("Help"),
      role: "help",
      submenu: [
        {
          label: i18n.t("User Guide"),
          accelerator:
            process.platform === "darwin" ? "Alt+Cmd+U" : "Ctrl+Shift+U",
          click() {
            require("electron").shell.openExternal(
              "https://github.com/shawnbanasick/kade/wiki"
            );
          }
        },
        {
          label: `${i18n.t("Report a Bug")} -> ken.q.tools@gmail.com`,
          click() {
            require("electron").shell.openExternal(
              "mailto:ken.q.tools@gmail.com"
            );
          }
        }
      ]
    }
  ];

  /*
  let menu = [
    {
      label: i18n.t("File"),
      submenu: [
        {
          label: i18n.t("Quit"),
          accelerator: "Ctrl+Q",
          click: function() {
            app.quit();
          }
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        {
          label: i18n.t("Cut"),
          accelerator: "Ctrl+X",
          role: "cut"
        },
        {
          label: i18n.t("Copy"),
          accelerator: "Ctrl+C",
          role: "copy"
        },
        {
          label: i18n.t("Paste"),
          accelerator: "Ctrl+P",
          role: "paste"
        },
        {
          label: i18n.t("Delete"),
          accelerator: "Ctrl+D",
          role: "delete"
        },
        {
          label: i18n.t("Select All"),
          accelerator: "Ctrl+A",
          role: "selectall"
        }
      ]
    },
    {
      label: i18n.t("View"),
      submenu: [
        {
          label: i18n.t("Reload"),
          accelerator: "Command+R",
          role: "forcereload"
          // click: function(item, focusedWindow) {
          //   focusedWindow.reload();
          // }
        },
        {
          label: i18n.t("Full Screen"),
          accelerator: "Ctrl+Command+F",
          click: function(item, focusedWindow) {
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
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
          click: function(item, focusedWindow) {
            focusedWindow.webContents.toggleDevTools();
          }
        }
      ]
    },
    {
      label: i18n.t("Help"),
      submenu: [
        {
          label: "User Guide",
          accelerator:
            process.platform === "darwin" ? "Alt+Cmd+U" : "Ctrl+Shift+U",
          click() {
            require("electron").shell.openExternal(
              "https://github.com/shawnbanasick/kade/wiki"
            );
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

  */

  const languageMenu = config.languages.map(languageCode => {
    return {
      label: i18n.t(languageCode),
      type: "radio",
      checked: i18n.language === languageCode,
      click: () => {
        i18n.changeLanguage(languageCode, (err, t) => {
          if (err) return console.log("something went wrong loading", err);
          // t('key'); // -> same as i18next.t
        });
        // console.log("called from other menu");
      }
    };
  });

  menu.push({
    label: i18n.t("Language"),
    submenu: languageMenu
  });

  return menu;
};
