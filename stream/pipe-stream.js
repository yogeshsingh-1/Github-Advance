import fs from "node:fs";
const readablestream = fs.createReadStream("Github.md", { highWaterMark: 4 });
const writestream = fs.createWriteStream("local.txt", { highWaterMark: 1 });

// # Equivalent Built-in Version

// Tumhara pura code Node internally pipe() me karta hai:
//Pipe ki Superpower
// Ye automatically handle karta hai:

// ✅ data transfer
// ✅ backpressure
// ✅ pause()
// ✅ resume()
// ✅ memory optimization

// Jo data readablestream se aa raha hai, use automatically writestream me bhej do. without event ka concept lagaye
readablestream.pipe(writestream);

// Readable stream aur Writable stream ke beech jo pipe connection bana tha, use tod do.
readablestream.unpipe(writestream);

// 
// pipe() → readable ko writable se connect karta hai.
// unpipe() → connection tod deta hai.

// without event lagaye

// readablestream.on("data", (chunk) => {
//   const canContinue = writestream.write(chunk);

//   if (!canContinue) {
//     readablestream.pause();
//   }
// });

// writestream.on("drain", () => {
//   readablestream.resume();
// });