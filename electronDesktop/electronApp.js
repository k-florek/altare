/* electron dependencies
*/
const { BrowserWindow, app, Menu, shell, dialog } = require('electron')
const defaultMenu = require('electron-default-menu');
const path = require('path');
const auspice = require('../cli/view');

args = {
  handlers: path.resolve(__dirname, 'handlers.js')
}

auspice.run(args);

let mainWindow = null

function main() {
  mainWindow = new BrowserWindow({ width: 1024, height: 800, show: true })
  mainWindow.loadURL(`http://localhost:4000/`)
  mainWindow.on('close', event => {
    mainWindow = null
  })
}

app.on('ready',main);
