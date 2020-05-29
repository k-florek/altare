/* electron dependencies
*/
const { BrowserWindow, app, Menu, shell, dialog } = require('electron')
const defaultMenu = require('electron-default-menu');

/* auspice dependencies
*/
const path = require("path");
const fs = require("fs");
const express = require("express");
const expressStaticGzip = require("express-static-gzip");
const compression = require('compression');
const utils = require("./cli/utils");
const chalk = require('chalk');
const electronUtils = require("./electronDesktop/utils");
const nakedRedirect = require('express-naked-redirect');
const version = require('./src/version').version;


//########### Auspice ###########

const expressApp = express();
expressApp.set('port', process.env.PORT || 4000);
expressApp.set('host', process.env.HOST || "localhost");
expressApp.use(compression());
expressApp.use(nakedRedirect({reverse: true})); /* redirect www.name.org to name.org */

const auspiceBuild = electronUtils.getAuspiceBuild();

expressApp.get("/favicon.png", (req, res) => {res.sendFile(path.join(auspiceBuild.baseDir, "favicon.png"));});
expressApp.use("/dist", expressStaticGzip(auspiceBuild.distDir));
expressApp.use(express.static(auspiceBuild.distDir));

var appData = {datasetDir:"./electronDesktop/temp_data/",narrativeDir:"./electronDesktop/temp_narrative"}

handlerMsg = electronUtils.loadAndAddHandlers({app:expressApp, handlersArg:null, datasetDir: appData.datasetDir, narrativeDir: appData.narrativeDir});

expressApp.get("*", (req, res) => {
  res.sendFile(path.join(auspiceBuild.baseDir, "index.html"));
});

const server = expressApp.listen(expressApp.get('port'), expressApp.get('host'), () => {
  utils.log("\n\n---------------------------------------------------");
  const host = expressApp.get('host');
  const {port} = server.address();
  console.log(chalk.blueBright("Auspice server now running at ") + chalk.blueBright.underline.bold(`http://${host}:${port}`));
  utils.log(auspiceBuild.message);
  utils.log(handlerMsg);
  utils.log("---------------------------------------------------\n\n");
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    utils.error(`Port ${expressApp.get('port')} is currently in use by another program.
    You must either close that program or specify a different port by setting the shell variable
    "$PORT". Note that on MacOS / Linux, "lsof -n -i :${expressApp.get('port')} | grep LISTEN" should
    identify the process currently using the port.`);
  }
  utils.error(`Uncaught error in app.listen(). Code: ${err.code}`);
});

//########### Electron ###########

let mainWindow = null

function main() {
  mainWindow = new BrowserWindow()
  const mainMenu = defaultMenu(app,shell);
  const openFile = {
    title:"Select a JSON datafile",
    properties:["openFile"]
  }
  const openDir = {
    title:"Select a directory containing JSON data",
    properties:["openDirectory"]
  }
  mainMenu.splice(0,0, {
    label: "File",
    submenu: [
      {
        label: "Load Dataset",
        click() {
          const datasetPath = dialog.showOpenDialogSync(mainWindow,openFile)[0];
          fs.createReadStream(datasetPath).pipe(fs.createWriteStream(path.join(appData.datasetDir,path.basename(datasetPath))));
          mainWindow.loadURL(`http://localhost:4000/`)
        }
      },
      {
        label: "Load Narrative",
        click() {
          const narrativePath = dialog.showOpenDialogSync(mainWindow,openFile)[0];
          fs.createReadStream(narrativePath).pipe(fs.createWriteStream(path.join(appData.narrativeDir,path.basename(narrativePath))));
          mainWindow.loadURL(`http://localhost:4000/`)
        }
      },
      {
        label: "Exit",
        click() { app.quit() },
        accelerator: 'CmdOrCtrl+Q'
      }
    ]
  })
  Menu.setApplicationMenu(Menu.buildFromTemplate(mainMenu));
  mainWindow.loadURL(`http://localhost:4000/`)
  mainWindow.on('close', event => {
    mainWindow = null
  })
}

app.on('ready',main);
