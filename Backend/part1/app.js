import express from "express";
import process from "node:process";
import dotenv from "dotenv";
import path from "node:path";
const app = express();
const result = dotenv.config({
  path:path.join(process.cwd(),".env.development")
});
console.log(result)
console.log("argv",process.argv); 
console.log("argv0",process.argv0)
// console.log(process.env.NODE_ENV)
app.use(express.json());
// console.log(process.env.GirlFriend);
// console.log(import.meta)
console.log(process.debugPort)
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:5173");
});
app.get("/api", (req, res) => {
  return res.status(200).json({ status: 200, data: true });
});
app.listen(5000, () => {
  console.log(`server is listening on port 5000`);
});

// Use env variable without install dotenv server without install dotenv package
// node --env-file=.env app.js
