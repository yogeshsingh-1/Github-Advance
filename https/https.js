import app from "./routes/app.js";
import https from "node:https";
import fs from "node:fs";
import path from "node:path";
console.log(import.meta.dirname);

console.log(process.cwd());
// const a = 5;
const obj = { name: "yogesh", email: "yogesh@Qgmail.com" };
const options = {
  key: fs.readFileSync(path.join(import.meta.dirname, "key.pem")),
  cert: fs.readFileSync(path.join(import.meta.dirname, "cert.pem")),
};
const server = https.createServer(options, app);
const a = server.listen(3000, () => {
  console.log(`server is listen on port 3000 and directory ${process.cwd()}`);
});
console.log(a);
