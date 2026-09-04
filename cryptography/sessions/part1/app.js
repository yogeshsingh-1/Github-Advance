import express from "express";
import session from "express-session";
import fs, { readdirSync, readFileSync } from "node:fs";
import { createWriteStream, createReadStream } from "node:fs";
import cookieParser from "cookie-parser";
const app = express();
// app.use(
//   session({
//     secret: "this is my cipher key",
//     // store:""
//     // genid:
//     name: "loloolo",
//     cookie: {},
//   }),
// );
app.use(cookieParser("Mysecret"));

// app.set("development", "hai abhi toh");D
app.get("/", (req, res) => {
  const fileName = "./package-lock.json";
  //   const data = fs.readFileSync(fileName, "utf-8");
  const readablestream = createReadStream(fileName, { highWaterMark: 1 });
  readablestream.on("data", (chunk) => {
    res.write(chunk);
  });
  const cookieData = [
    {
      name: "yogesh",
      age: 25,
    },
    {
      name: "anurag",
      age: 21,
    },
    {
      name: "sushil",
      age: 24,
    },
  ];
  res.cookie("session-id", cookieData, {
    httpOnly: true,
    signed: true,
    expires: new Date(Date.now() + 1 * 60 * 1000),
  });

  readablestream.on("end", () => {
    return res.end();
  });
});
app.listen(3000, "0.0.0.0", () => {
  console.log(`server is listening on port 3000`);
});
