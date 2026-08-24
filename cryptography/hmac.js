import crypto from "node:crypto";
import fs from "node:fs";
const secret = "super-secret";

const fileData = fs.readFileSync("./JWT.md");
// console.log(fileData.toString("utf-8"));
const digest = crypto
  .createHmac("SHA256", secret)
  .update(fileData)
  .digest("hex");
console.log(digest);
