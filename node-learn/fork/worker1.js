// // Parent se message receive karo
// process.on("lulu", (message) => {
//   console.log("Child received:", message);

//   // Parent ko reply bhejo
//   process.send("Hello from child");
// });
// // console.log(process.version);
// console.log("worker1", process.pid);
process.on("message", (message) => {
  console.log("child2", message);
});
console.log("worker2", process.pid);

console.log(process.argv)