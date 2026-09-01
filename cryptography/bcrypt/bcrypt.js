import bcrypt from "bcrypt";
import crypto from "node:crypto";
// console.log(crypto.randomBytes(10));
const salt = await bcrypt.genSalt(15);
console.log("Salt", salt);
const hash = await bcrypt.hash("hello world", salt);
console.log("Hash", hash);
const hashRound =
  "$2b$05$RzVmADYLg.IQEBOT/7vQmuzyMJleHv9JGa8I.r86wyYs0rW5nZx2O";
const result = await bcrypt.compare(hashRound, "utf-8");
console.log(result);
console.log(bcrypt.getRounds(hash));