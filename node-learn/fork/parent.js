// const { fork } = require("node:child_process");

// // Naya Node.js child process start karo
// const child = fork("./worker.js");

// const child1 = fork("./worker1.js");
// // Child ko message bhejo
// child.send("Hello from parent");

// // Child se message receive karo
// child.on("message", (message) => {
//   console.log("Parent received:", message);
// });
// child1.on("lulu", (message) => {
//   console.log("Parent received: ", message);
// });

// console.log("Parent process continues...");
// console.log("parent", process.pid);
import { fork } from "node:child_process";

const child1 = fork("./worker.js");
const child2 = fork("./worker1.js");
child1.send({
  Name: "yogesh",
  age: 25,
  email: "yogeshs368@gmail.com",
});
child2.send({
  Name: "Jai",
  age: 27,
  email: "Jai@gmail.com",
});

console.log("Parent start");
let a;
console.log("Parent Id",process.pid);
console.log(a =5)