import fs from "node:fs";
const readable = fs.createReadStream("./git.md", "utf-8");

const writeable = fs.createWriteStream("./output.txt");
// writeable.on("data", (chunk) => console.log(chunk));
readable.on("data", (chunk) => {
  writeable.write(chunk);
});
readable.on("end", () => {
  writeable.end();
});
// writeable.end();
console.log(readable.readableFlowing);
console.log(readable.readableEnded);
console.log(readable.isPaused());
console.log(readable.pause());
