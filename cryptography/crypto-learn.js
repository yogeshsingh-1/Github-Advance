import crypto from "node:crypto";
console.log(crypto.createHash("SHA256").update("12345").digest("hex"));
console.log(crypto.createHash("SHA256").update(JSON.stringify(12345)).digest("hex"));
