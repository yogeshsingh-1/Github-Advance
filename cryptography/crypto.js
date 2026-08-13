import crypto from "node:crypto";
const data = "Hello World";
// const hash = crypto.createHash("sha256").update(data).digest("hex");
// class CryptoExtend extends crypto {}
// console.log(hash);
// const hash = CryptoExtend.createHash("sha256").update(data).digest("hex");.
const CryptoExtend = Object.assign(crypto, {
  target: "Yogesh",
  blank: "Some",
});
console.log(CryptoExtend.createHash("sha256").update(data).digest("hex"));
console.log(CryptoExtend.target);
