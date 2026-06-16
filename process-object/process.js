// stream in process
// console.log(process.stdin); // readable stream
// console.log(process.stdout); //writeale stream
// console.log(process.stderr); // writeable stream

// event

process.stdin.on("data", (chunk) => {
  process.stdout.write(chunk);
  process.stdout.end();
});
process.stdin.on("end", (chunk) => {
  console.log("reading completed");
});

process.stdout.on("finish", (chunk) => {
  console.log("writing completed");
});
// file descriptor
