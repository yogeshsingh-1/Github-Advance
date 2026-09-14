import express from "express";
// import AuthRouter from "./route/login.route.js";
import fs from "node:fs/promises";
import path from "node:path";
import { createReadStream, createWriteStream } from "node:fs";
import dotenv from "dotenv";
const app = express();
console.log(import.meta.dirname);
console.log(process.cwd());
// console.log(process.argv);
// console.log(process.argv0);
// console.log(process.versions)
// process.chdir();
// console.log(process.config)
// console.log(process.connected)
console.log(process.constrainedMemory());
console.log(process.availableMemory() / (1024 * 1024 * 1024));
// console.log(process.dlopen())
const pid = process.pid;
console.log("processId", process.pid);
// process.kill(pid)
console.log(process.memoryUsage())

dotenv.configDotenv({
  path: path.resolve(import.meta.dirname, ".env.development"),
  quiet: true,
});
console.log(process.env.SOLO);
app.use(express.static("public"));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

app.listen(8000, () => {
  console.log(`server is running on port 8000`);
});
// Ye batata hai ki CPU ne user-level code execute karne mein kitna CPU time spend kiya.

// console.log(process.cpuUsage().user);
// // Yaani Node.js ke JavaScript/application code ko execute karne mein CPU ne approximately 12 ms spend kiye.
// console.log(process.cpuUsage().system);
