import express from "express";
import fs, { createWriteStream, createReadStream } from "node:fs";
import path from "node:path";
const app = express();
console.log("meta", import.meta.dirname);
// app.use(express.json());
console.log("cwd", process.cwd());
app.get("/", (req, res) => {
  res.send("hello world");
});
app.get("/read", async (req, res) => {
  // const readStream = createReadStream(req.body);

  console.log("length", req.body);
  const writeStream = createWriteStream(
    path.join(import.meta.dirname, "test.txt"),
    {
      highWaterMark: 30 * 1024,
    },
  );
  let a = 0;

  // req.pipe(writeStream);
  // req.on("data", (chunk) => {
  //   // if ()
  //   a++;
  //   console.log(chunk.byteLength);
  //   writeStream.write(chunk);
  // });
  // req.on("end", () => {
  //   writeStream.end();
  // return res.json({ m: "hello world", a: a });
  // });
  req.pipe(writeStream);
  return res.json({ m: "hello world", a: a });
});
export default app;
