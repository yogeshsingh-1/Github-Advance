import crypto, { sign } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
const fileData = readFileSync("./digital.md", "utf-8");
const [fileContent, signature] = fileData.split("Signature : ");
// console.log(fileContent);
const key = "my-super-secret-key";

const newSignature = crypto
  .createHash("sha256")
  .update(fileContent)
  .update(key)
  .digest("hex");
console.log(newSignature === signature);
console.log(newSignature);
console.log(signature);
if (newSignature === signature) {
  console.log("Payment is verified.");
} else {
  console.log("Payment is not verify because your signature is not matched.");
}
