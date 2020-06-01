/* electron dependencies
*/
const { BrowserWindow, app, Menu, shell, dialog } = require('electron')
const defaultMenu = require('electron-default-menu');
const path = require('path');
const auspice = require('../cli/view');
const menuTemplate = require('./appMenu');

args = {
  handlers: path.resolve(__dirname, 'handlers.js')
}

auspice.run(args);

let mainWindow = null

function main() {
  const menu = Menu.buildFromTemplate(menuTemplate.template)
  Menu.setApplicationMenu(menu)

  mainWindow = new BrowserWindow({ width: 1024, height: 800, show: true });
  mainWindow.loadURL(`http://localhost:4000/`);
  //catch links that navigate us away from the app and send them to the default browser
  mainWindow.webContents.on('will-navigate', function(e, url) {
    e.preventDefault();
    require('electron').shell.openExternal(url);
  });
  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    require('electron').shell.openExternal(url);
  });

  mainWindow.on('close', event => {
    mainWindow = null
  });
}

app.on('ready',main);
