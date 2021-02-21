const Menu = require("electron").Menu;
const config = require("../configs/app.config");

// const darwinTemplate = require("../menus/darwinMenu");
const otherTemplate = require("../menus/otherMenu");
// const i18nConfig = require("../configs/i18next.config");

const menu = null;
const platform = process.platform;

function menuFactoryService(menu) {
  this.menu = menu;

  this.buildMenu = buildMenu;
}

function buildMenu(app, mainWindow, i18n) {
  // if (config.platform === "darwin") {
  //   this.menu = Menu.buildFromTemplate(darwinTemplate(app, mainWindow, i18n));
  //   Menu.setApplicationMenu(this.menu);
  // } else {
  this.menu = Menu.buildFromTemplate(otherTemplate(app, mainWindow, i18n));
  // console.log(this.menu);
  // console.log(this.menu);
  Menu.setApplicationMenu(this.menu);
  // mainWindow.setMenu(this.menu)
  // }
}

module.exports = new menuFactoryService(menu);

// https://github.com/gz51837844/electron-i18n/tree/master/src/configs
