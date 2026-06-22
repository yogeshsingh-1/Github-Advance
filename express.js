import express from "express";
import AuthRouter from "./route/login.route.js";
import fs from "node:fs/promises";
import path from "node:path";
const app = express();

app.use(express.static("public"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin:", "*");
  next();
});
app.use((req, res, next) => {
  req.companyId = "12345";
  next();
});

app.get("/", (req, res) => {
  console.log(req.url);
  console.log(req.baseUrl);
  console.log(req.originalUrl);
  console.log(req.route);
  res.end("Home router");
});

app.get("/test", async (req, res) => {
  // const fileHandle = await fs.open("download.mp4");
  // console.log(fileHandle.fd);
  // const readStream = fileHandle.createReadStream();
  // const stats = await fileHandle.stat();
  // res.setHeader("Content-Length", stats.size);
  // res.setHeader("Content-Type", "video/mp4");
  // readStream.pipe(res);

  // Alternate of this
  res.sendFile(path.join(import.meta.dirname, "download.mp4")); //absolute path dena hai
});
console.log();
// console.log(import.meta);
app.use("/signup/:sign", AuthRouter);
app.get("/login", (req, res) => {
  console.log(req.url);
  console.log(req.baseUrl);
  console.log(req.originalUrl);
  console.log(req.route);
  res.end("Login router");
});

app.listen(3000, () => {
  console.log(`server is running on port 3000`);
});
