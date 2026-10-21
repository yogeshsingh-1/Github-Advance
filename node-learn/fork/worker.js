// Parent se message receive karo
// process.on("message", (message) => {
//   console.log("Child received:", message);

//   // Parent ko reply bhejo
//   process.send("Hello from child1");
// });

process.on("message", (message) => {
  console.log("child1", message);
});
console.log("worker1",process.pid)
