// SIGINT kya hai?

// SIGINT (Signal Interrupt) ek operating system signal hai jo process ko batata hai ki usse interrupt (stop) karna hai.

// Sabse common tarika:

// Terminal me Ctrl + C press karna.

// Jab aap Ctrl + C dabate ho, OS Node.js process ko SIGINT signal bhejta hai.
process.on("SIGINT", () => {
  console.log("SIGINT received");
});


// Is event ka use kyu karte hain?

// Default behavior:

// Ctrl + C
//       ↓
// OS sends SIGINT
//       ↓
// Node.js process exits immediately


// Real-world Use Cases
// 1. Database Connection Close
process.on("SIGINT", async () => {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");

    process.exit(0);
});


// 2. HTTP Server Close
const server = app.listen(3000);

process.on("SIGINT", () => {
    server.close(() => {
        console.log("Server closed");
        process.exit(0);
    });
});