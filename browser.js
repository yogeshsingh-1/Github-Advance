import http from "http";
import { WriteStream } from "node:fs";
import fs from "node:fs/promises";
const filehandle = await fs.open("./screenshot.png");
// const filehandle = await fs.open("./output.txt");
console.log(filehandle.fd);
const readStream = filehandle.createReadStream({
  highWaterMark: 20 * 1024,
  //   encoding: "utf-8",
});

// console.log(read);
const server = http.createServer((req, res) => {
  //   res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Type", "image/png");
  readStream.on("data", (chunk) => {
    res.write(chunk);
    readStream.pause();
    // console.log(chunk.toString());
  });
  setInterval(() => {
    readStream.resume();
  }, 500);

  readStream.on("end", () => {
    res.end();
  });
  //   res.end("hello world");
});

server.listen(3000, "0.0.0.0", () => {
  console.log("server is listening on port 3000");
});
