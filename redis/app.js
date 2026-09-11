import net from "node:net";
import fs from "node:fs";
const redisData = fs.existsSync("./data.json")
  ? new Map(Object.entries(JSON.parse(fs.readFileSync("./data.json", "utf-8"))))
  : new Map();
console.log(redisData);
// Redis Opertion
async function redisOperation(socket, command) {
  const [operation, key, ...rest] = command.split(" ");
  const value = rest.join(" ");
  console.log(operation, key, value);
  const opt = operation.toLowerCase();
  switch (opt) {
    case "set":
      const val = typeof value === "string" ? value : JSON.stringify(value);
      console.log(typeof value);
      redisData.set(key, val);
      syncDataInFile(redisData, opt);
      break;
    case "get":
      const cacheValue = redisData.get(key);
      if (cacheValue === null || cacheValue === undefined) {
        socket.write("Key not found!");
      } else {
        socket.write(cacheValue);
        console.log(redisData);
      }
      break;
    case "del":
      const deleted = redisData.delete(key);
      socket.write(deleted ? "1\n" : "0\n");
      syncDataInFile(redisData, opt);
      break;
    case "exists":
      const existKey = redisData.has(key) ? "1" : "0";
      socket.write(existKey);
      break;
    case "exit":
      socket.end();
      break;
    default:
      // socket.write("Operation name not found", operation);
      socket.write(`Operation "${operation}" not found\n`);
  }
}

const server = net.createServer((socket) => {
  console.log("Client Connected");
  socket.setEncoding("utf-8");
  socket.on("data", (data) => {
    const command = data.trim();
    redisOperation(socket, command);
    socket.write("\nOK//\n");
  });

  socket.on("end", () => {
    console.log("Client Disconnected");
  });

  socket.on("error", (err) => {
    console.log("Socket Error generated");
    // console.log("Socket Error:", err.message);
  });
});

server.on("error", (err) => {
  console.log("Server Error:", err.message);
});

server.listen(3000, "0.0.0.0", () => {
  console.log("TCP server created on port 3000");
});

//  operation -> set/del
function syncDataInFile(redisData, operation) {
  const redisCache = Object.fromEntries(redisData);
  console.log(redisCache);
  fs.writeFileSync("./data.json", JSON.stringify(redisCache));
}
// syncDataInFile();
// process.on("SIGINT", async () => {
//   const redisDataTerminate = Object.fromEntries(redisData);
//   console.log(redisDataTerminate);
//   fs.writeFileSync(
//     "./data.json",
//     JSON.stringify([{ name: "Yogesh" }, { name: "Jai" }]),
//   );
//   console.log("Data saved successfully.");
//   console.log("Process exited.");
//   process.exit(0);
// });


