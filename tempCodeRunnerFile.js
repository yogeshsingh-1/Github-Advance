const path = "D:\\New folder\\Node-coder\\v89 Custom EventEmitter.mp4";
const totalBytelength = fs.readFileSync(path).byteLength;
console.log("byte length :", totalBytelength);
console.log("reading speed :", 2 * 1024 * 1024);
const writeStream = fs.createWriteStream("video.mp4");
const readStream = fs.createReadStream(path, {
  highWaterMark: 100 * 1024 * 1024,
});
let readFile = 0;
readStream.on("data", (chunk) => {
  // console.log(chunk.byteLength);
  readFile += chunk.byteLength;
  writeStream.write(chunk);
  const percentage = (readFile / totalBytelength) * 100;
  console.log(`process : ${percentage} %`);
});

readStream.on("end", () => {
  writeStream.end();
});