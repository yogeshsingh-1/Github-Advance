import fs from "node:fs";
const ws = fs.createWriteStream("demo.txt", { highWaterMark: 1 });

for (let i = 0; i < 10; i++) {
  // writableLength batata hai ki Writable Stream ke internal buffer me abhi kitna data (bytes me) pending hai.
  // 0 -> Matlab internal buffer me ab koi pending data nahi hai.
  //   console.log("hi", ws.writableLength);
  const ok = ws.write("a");
  //   if (!ok) {
  //     console.log("Backpressure detected");
  //     break;
  //   }
}
//drain event tab fire hota hai jab writable stream ka internal buffer itna khali ho jata hai ki woh fir se data accept kar sakta hai, after write() had previously returned false
ws.on("drain", () => {
  //   console.log("Buffer drained");
});

// # 2nd example ->  yahi kaam same pipe se kar skte hai.
const readablestream = fs.createReadStream("Github.md", { highWaterMark: 4 });
const writestream = fs.createWriteStream("local.txt", { highWaterMark: 1 });
readablestream.on("data", (chunk) => {
  const isEmpty = writestream.write(chunk);
  if (!isEmpty) {
    readablestream.pause();
  }
});
writestream.on("drain", () => readablestream.resume());

readablestream.on("end", () => {
  console.log("reading completed");
  writestream.end();
});
writestream.on("finish", () => {
  console.log("writing completed");
});

// finish tab fire hoga jab:

// saara buffered data write ho jaye
// end() call ho chuka ho
