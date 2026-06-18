// console.log(process.stdin)  ->Readable stream
// console.log(process.stdout) ->Writeable stream
// console.log(process.stderr) ->Writeable stream

// file descriptor
// process.stdin.fd -> 0
// process.stdout.fd -> 1
// process.stderr.fd  -> 2


process.stdin.on("data", (chunk) => {
  //   console.log(chunk.toString());

  process.stdout.write(chunk.toString());
});
process.stdin.on("end", () => {
  process.stdout.write("Finish");
});
