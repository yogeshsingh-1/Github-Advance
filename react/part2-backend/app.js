import express from "express";
import connectDb from "./config/connection.js";
import courseRouter from "./routes/courseRoute.js";
import crypto from "node:crypto";
import paytmRouter from "./routes/paymentRoute.js";
// import session from "express-session";
// import fs, { readdirSync, readFileSync } from "node:fs";
// import { createWriteStream, createReadStream } from "node:fs";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
// app.use(
//   session({
//     secret: "this is my cipher key",
//     // store:""
//     // genid:
//     name: "loloolo",
//     cookie: {},
//   }),
// );
// app.use(cookieParser("Mysecret"));

// app.set("development", "hai abhi toh");

connectDb();
// app.use(async (req, res, next) => {
//   res.set("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.set("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   // Browser ka core preflight
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(204);
//   }
//   // const sessionId = req.signedCookies?.session_id;
//   // console.log(sessionId);
//   // if (!sessionId) {
//   //   const sessionData = await Session.create({
//   //     SessionData: [],
//   //   });
//   //   // console.log("sessionData:", sessionData);
//   //   res.cookie("session_id", sessionData._id, {
//   //     httpOnly: true,
//   //     signed: true,
//   //     expires: new Date(Date.now() + 60 * 1000),
//   //   });
//   // }
//   next();
// });

app.use(
  cors({
    origin: "http://localhost:5173",
    // credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "sole"],
  }),
);
app.use((req, res, next) => {
  res.set("harry", "harry potter");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", courseRouter);
app.use("/paytm", paytmRouter);
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
app.listen(3000, "0.0.0.0", () => {
  console.log(`server is listening on port 3000`);
});
