// import session from "express-session";
// import fs, { readdirSync, readFileSync } from "node:fs";
// import { createWriteStream, createReadStream } from "node:fs"
import express from "express";
import connectDb from "./config/connection.js";
import courseRouter from "./routes/courseRoute.js";
import crypto from "node:crypto";
import paytmRouter from "./routes/paymentRoute.js";
import Session from "./models/SessionModel.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cookieParser("Mysecret"));

connectDb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(async (req, res, next) => {
  // Set Headers
  res.set({
    "Access-Control-Allow-Origin": "http://localhost:5173",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  });
  // Browser ka core preflight
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  const sessionId = req.signedCookies?.session_id;
  console.log(sessionId);
  if (!sessionId) {
    const sessionData = await Session.create({
      SessionData: [],
    });
    console.log(sessionData._id);
    // console.log("sessionData:", sessionData);sessionData._id
    res.cookie("session_id", sessionData._id, {
      httpOnly: true,
      signed: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });
  }
  next();
});
app.use("/", (req, res) => {
  return res
    .status(200)
    .json({ _id: 1, name: "Yogesh Singh", email: "yogeshs368@gmail.com" });
});
app.use("/", courseRouter);
app.use("/payment", paytmRouter);
console.log(process.argv);
console.log(process.argv0);
console.log(process.execArgv);
app.listen(3000, "0.0.0.0", () => {
  console.log(`server is listening on port 3000`);
});

// app.use(
//   session({
//     secret: "this is my cipher key",
//     // store:""
//     // genid:
//     name: "loloolo",
//     cookie: {},
//   }),
// );

// app.set("development", "hai abhi toh");

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     // credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "sole"],
//   }),
// );

// app.use("/")
// app.get("/", (req, res) => {
//   const fileName = "./package-lock.json";
//   //   const data = fs.readFileSync(fileName, "utf-8");
//   const readablestream = createReadStream(fileName, { highWaterMark: 1 });
//   readablestream.on("data", (chunk) => {
//     res.write(chunk);
//   });
//   const cookieData = [
//     {
//       name: "yogesh",
//       age: 25,
//     },
//     {
//       name: "anurag",
//       age: 21,
//     },
//     {
//       name: "sushil",
//       age: 24,
//     },
//   ];
//   res.cookie("session-id", cookieData, {
//     httpOnly: true,
//     signed: true,
//     expires: new Date(Date.now() + 1 * 60 * 1000),
//   });

//   readablestream.on("end", () => {
//     return res.end();
//   });
// });
// console.log(process.env.Environment);
// console.log(argv0);
// console.log(argv);
// console.log(app.settings.env)
// console.log(process.env.NODE_ENV);
// console.log(process.argv);
// console.log(process.versions)
