import fs, { read } from "node:fs";
// const readable = fs.createReadStream("./git.md",{highWaterMark:64*1024*1024});

// const writeable = fs.createWriteStream("./output.txt");
// // writeable.on("data", (chunk) => console.log(chunk));
// readable.on("data", (chunk) => {
//   writeable.write(chunk);
// });
// readable.on("end", () => {
//   writeable.end();
// });
// writeable.end();

// import fs from "node:fs";

// const path = "D:\\New folder\\Node-coder\\v32 Managing file permissions.mp4";
// const writeStream = fs.createWriteStream("video.mp4");
// const readStream = fs.createReadStream(path, {
//   highWaterMark: 10 * 1024 * 1024,
// });
// readStream.on("data", (chunk) => {
//   console.log(chunk.byteLength);
//   writeStream.write(chunk);
// });

// readStream.on('')
// readStream.on("end", () => {
//   writeStream.end();
// });

// processs bar showing you read how many data are you readed

// const path = "D:\\New folder\\Node-coder\\v89 Custom EventEmitter.mp4";
// const totalBytelength = fs.readFileSync(path,).byteLength;
// console.log("byte length :", totalBytelength);
// console.log("reading speed :", 2 * 1024 * 1024);
// const writeStream = fs.createWriteStream("video.mp4");
const readStream = fs.createReadStream(path, {
  highWaterMark: 50 * 1024 * 1024,
  encoding: "utf-8",
  // 64kb
});
readStream.setEncoding("utf-8");
// let readFile = 0;
// readStream.on("data", (chunk) => {
//   // console.log(chunk.byteLength);
//   readFile += chunk.byteLength;
//   writeStream.write(chunk);
//   const percentage = (readFile / totalBytelength) * 100;
//   console.log(`process : ${percentage} %`);
// });

// readStream.on("end", () => {
//   writeStream.end();
// });
