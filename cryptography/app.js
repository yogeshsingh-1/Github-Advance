import jwt from "jsonwebtoken";
import fs, { createWriteStream } from "node:fs";
// import
class JWTUtils {
  secret = "string";
  jwtTokenOption = {
    algorithm: "HS256",
    encoding: "utf-8",
    expiresIn: `5Hrs`,
  };
  jwtVerifyOption = {
    algorithms: ["HS256"],
    // maxAge: "5Hrs",
  };
  createToken(payload) {
    return jwt.sign(payload, this.secret, this.jwtTokenOption);
  }
  verifyToken(token) {
    return jwt.verify(token, this.secret, this.jwtVerifyOption);
  }
}
const jwtUtils = new JWTUtils();
const token = jwtUtils.createToken({ uid: "12345" });

console.log(jwtUtils.verifyToken(token));
// console.log(process.cwd());
// fs.w("data.json", jwtUtils.verifyToken(token));
const writeStream = createWriteStream("data.json", { encoding: "utf-8" });
writeStream.write(JSON.stringify(jwtUtils.verifyToken(token)), (e) => {
  if (e) {
    console.log("error comming");
    process.exit(1);
  }
});
writeStream.end();
const a = { uid: "12345", iat: 1786445321, exp: 1786463321 };
// console.log(new Date(a.iat  * 1000));
// console.log(new Date(a.exp * 1000) );
const b = new Date();
// console.log(b);
// # Hex mai 2 chararacter milker 1 byte bnate hai.
// Hex -> (0-9) A-F (16 values represent karti hai)

// # octal decimal number( 0 -8 )

const l = Buffer.from(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYjNmMjBlYmMyMGE3NDU5MjhmZTIyMTljMGExNzA0NjkiLCJpYXQiOjE3ODY1MjA4MTMsImV4cCI6MTc4NjU0MjQxM30.yLtzX-7QjPtd_3Vb3AmwoWiLAW6dAYot9Oapd1a0OU0",
  "base64",
).toString("utf-8");
// console.log(l);
const g = 1786520813;
const h = 1786542413;
console.log("algorithm");

