import fs from "node:fs";
// echo "hello world" | node script.js

// process.stdin.on("data", (chunk) => {
//   console.log(chunk.toString());
// });

// node script.js | node app.js   -> writing one data one file to another file.

// process.stdin.on("data", (chunk) => {
//   process.stdout.write(chunk);
// });
// process.stdout.write("hi from yogesh");
// process.stdout.write("hello  and by");

// node script.js  > output.txt    -> copy data in output.txt
// node script.js  >> output.txt    -> append data in output.txt
// process.stdout.write("hello  and by");

// node script.js  < output.txt    -> output redirection

process.stdin.on("data", (chunk) => {
  console.log(chunk.toString());
});

const data = fs.openSync("./output.txt");

console.log(data);
