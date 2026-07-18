| `process.exit(0)`             | `process.exit(1)`              |
| ----------------------------- | ------------------------------ |
| Success                       | Failure                        |
| No error                      | Error occurred                 |
| Normal shutdown               | Abnormal shutdown              |
| Used after successful cleanup | Used after unrecoverable error |

<!-- // SIGINT event kya hai? -->

// SIGINT (Signal Interrupt) ek operating system signal hai jo process ko batata hai ki usse interrupt (stop) karna hai.

// Sabse common tarika:

// Terminal me Ctrl + C press karna.

// Jab aap Ctrl + C dabate ho, OS Node.js process ko SIGINT signal bhejta hai.

process.on("SIGINT", async () => {
await mongoose.disconnect();
console.log("MongoDB disconnected");
    process.exit(0);
});
