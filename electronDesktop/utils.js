const utils = require("../cli/utils");
const path = require("path");
const version = require('../src/version').version;

const serveRelativeFilepaths = ({app, dir}) => {
  app.get("*.json", (req, res) => {
    const filePath = path.join(dir, req.originalUrl);
    utils.log(`${req.originalUrl} -> ${filePath}`);
    res.sendFile(filePath);
  });
  return `JSON requests will be served relative to ${dir}.`;
};

const loadAndAddHandlers = ({app, handlersArg, datasetDir, narrativeDir}) => {
  /* load server handlers, either from provided path or the defaults */
  var handlers = {};
  datasetsPath = utils.resolveLocalDirectory(datasetDir, false);
  narrativesPath = utils.resolveLocalDirectory(narrativeDir, true);
  handlers.getAvailable = require("./getAvailable")
    .setUpGetAvailableHandler({datasetsPath, narrativesPath});
  handlers.getDataset = require("./getDataset")
    .setUpGetDatasetHandler({datasetsPath});
  handlers.getNarrative = require("./getNarrative")
    .setUpGetNarrativeHandler({narrativesPath});

  /* apply handlers */
  app.get("/charon/getAvailable", handlers.getAvailable);
  app.get("/charon/getDataset", handlers.getDataset);
  app.get("/charon/getNarrative", handlers.getNarrative);
  app.get("/charon*", (req, res) => {
    res.statusMessage = "Query unhandled -- " + req.originalUrl;
    utils.warn(res.statusMessage);
    return res.status(500).end();
  });

  return handlersArg ?
    `Custom server handlers provided.` :
    `Looking for datasets in ${datasetsPath}\nLooking for narratives in ${narrativesPath}`;
};

const getAuspiceBuild = () => {
  const cwd = path.resolve(process.cwd());
  const sourceDir = path.resolve(__dirname, "..");
  if (
    cwd !== sourceDir &&
    fs.existsSync(path.join(cwd, "index.html")) &&
    fs.existsSync(path.join(cwd, "dist")) &&
    fs.existsSync(path.join(cwd, "dist", "auspice.bundle.js"))
  ) {
    return {
      message: "Serving the auspice build which exists in this directory.",
      baseDir: cwd,
      distDir: path.join(cwd, "dist")
    };
  }
  return {
    message: `Serving auspice version ${version}`,
    baseDir: sourceDir,
    distDir: path.join(sourceDir, "dist")
  };
};


module.exports = {
  serveRelativeFilepaths,
  getAuspiceBuild,
  loadAndAddHandlers
}
