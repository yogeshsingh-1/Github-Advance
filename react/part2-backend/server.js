import { v7 as uuIdV7, v4 as uuidv4, v6, v1, parse, stringify } from "uuid";
const a = uuidv4({
  offset: 23,
});
console.log("a",a);
console.log(parse(a));
const base64Url = Buffer.from(parse(a)).toString("base64url");
console.log(base64Url);
const uuidAgain = stringify(Buffer.from(base64Url, "base64url"));
console.log(uuidAgain);
