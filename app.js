// const blob = new Blob(["Hello World"], {
//   type: "text/plain",
// });

// console.log(Array.isArray(blob.bytes)); // 11
// console.log(blob.type); // text/plain
// console.log(blob)
import fs from "fs";

// const a = fs.readFileSync("./img.jpg", "Base64");
// fs.writeFileSync("./test.txt", a);
// const path = "D:\\New folder\\New folder.rar";
// const text = fs.readFileSync(path);
// console.log(text)

const buf7 = Buffer.from('tést', 'latin1');
console.log(buf7)