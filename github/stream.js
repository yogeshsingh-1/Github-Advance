import { createReadStream } from "fs";

const readStream = createReadStream("browser.js", {
  //   encoding: "utf-8",
  highWaterMark: 10,
});
readStream.on("data", (chunk) => {
  
    process.stdout.write(chunk.toString());
    readStream.pause();
  const isPaused = readStream.isPaused();
  if (isPaused) {
    setTimeout(() => {
      readStream.resume();
    }, 500);
  }
});
