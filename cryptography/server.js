import crypto from "node:crypto";
import fs from "node:fs";
const d1 = fs.readFileSync(
  "D:/_Project - Avinya ERP/learn-node/github/cryptography/crypto.js",
);
const d2 = fs.readFileSync(
  "D:/_Project - Avinya ERP/learn-node/github/cryptography/app.js",
);

console.log(crypto.createHash("SHA1").update(d2).update(d1).digest("hex"));
