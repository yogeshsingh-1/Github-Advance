import express from "express";
import process from "node:process";
import { availableParallelism } from "node:os";
import cluster from "node:cluster";
import http from "node:http";
const numCPUs = availableParallelism();
const app = express();
app.use(express.json());
// console.log(availableParallelism());
app.get("/hello", (req, res) => {
  const fullUrl = new URL(
    req.originalUrl,
    `${req.protocol}://${req.get("host")}`,
  ).href;
  res.json({
    message: "Hello from Node.js",
    pid: process.pid,
    workerId: cluster.worker?.id,
  });
});

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  cluster.schedulingPolicy = cluster.SCHED_RR;
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  app.listen(8001, () =>
    console.log(`server is listening on port 8001 ${process.pid}`),
  );
}
