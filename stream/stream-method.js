import fs from "node:fs";

const readstream = fs.createReadStream("./git.md", {
  highWaterMark: 64 * 1024 * 1024,
  encoding: "utf-8",
  destroy: 4,
});
readstream.setEncoding("base64");
readstream.destroy();

readstream.on("data", (chunk) => {
  console.log(chunk.byteLength);
});
readstream.on("end", () => {});
readstream.on("close", () => {});

console.log(readstream.readableFlowing);
console.log(readstream.readableEnded);
console.log(readstream.isPaused());
console.log(readstream.pause());
console.log(readstream.resume());
console.log(readstream.readableHighWaterMark);

const writestream = fs.createWriteStream("./output.txt", {
  highWaterMark: 4,
  encoding: "base64",
});

writestream.write("hello world");
writestream.end();

console.log(writestream.writableHighWaterMark);


// Jo data readablestream se aa raha hai, use automatically writestream me bhej do. without event ka concept lagaye
readstream.pipe(writestream);

// Readable stream aur Writable stream ke beech jo pipe connection bana tha, use tod do.
readstream.unpipe(writestream);

// 
// pipe() → readable ko writable se connect karta hai.
// unpipe() → connection tod deta hai.
