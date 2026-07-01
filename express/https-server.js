import "./injections/container.injection";

import { createServer } from "https";

import fs from "fs";

import { app } from "./providers/app";

import EnvDetails from "./utils/envdetails.utils";

process.env.TZ = "+05:30";

const { port, sqlLogFolder } = EnvDetails;

const ensureDirectories = () => {
  if (!fs.existsSync(sqlLogFolder)) {
    fs.mkdirSync(sqlLogFolder, { recursive: true });
  }
};
console.log(fs.readFileSync("./key.pem"))
const httpsOptions = {
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem"),
};

const startServer = async () => {
  ensureDirectories();

  createServer(httpsOptions, app).listen(port, () => {
    console.log(`HTTPS Server listening on port ${port}`);
  });
};

startServer();