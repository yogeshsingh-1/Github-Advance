import crypto from "node:crypto";
import fs from "node:fs";
// const data = "Hello World";
// const hash = crypto.createHash("sha256").update(data).digest("hex");
// class CryptoExtend extends crypto {}
// console.log(hash);
// const hash = CryptoExtend.createHash("sha256").update(data).digest("hex");.
// const CryptoExtend = Object.assign(crypto, {
//   target: "Yogesh",
//   blank: "Some",
// });
// console.log(CryptoExtend.createHash("sha256").update(data).digest("hex"));
// console.log(CryptoExtend.target);
// const data = fs.readFileSync(
//   "C:/Users/dell/Downloads/VSCodeUserSetup-arm64-1.133.0.exe",
// );
// const key = crypto.createHash("SHA-256").update(data).digest("hex");
// console.log(key);

//
const algorithm = "SHA-1";
const data = "update";
console.log(crypto.createHash(algorithm).update(data).digest("hex"));
console.log(crypto.createHash(algorithm).update(data).digest("hex").length / 2);


// 7a6e6a439dc689aeae4e04f542f1eda34b01ae3c