import express from "express";
import path from "node:path";
import receivedCallBack from "./service/googleService.js";
import cookieParser from "cookie-parser";
import "dotenv/config";
import sessions from "./json/sessionDB.json" with { type: "json" };
import { writeFileSync } from "node:fs";
const port = 4000;
const app = express();

app.use(cookieParser("secret"));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:5500");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.set("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());
app.use(express.static(path.join(process.cwd())));

app.post("/google/callback", async (req, res) => {
  console.log(req.body);
  const code = req.body?.code;
  if (!code) {
    return res
      .status(200)
      .json({ status: false, msg: "Google Code not provided" });
  }
  const result = await receivedCallBack(code);

  // const sessionId = crypto.randomUUID();
  let sessionId = null;
  const sessionHave = sessions.find(({ userId }) => userId === result.id);
  if (sessionHave) {
    sessionId = sessionHave.sessionId;
  } else {
    sessionId = crypto.randomUUID();
    sessions.push({ sessionId, userId: result.id });
    writeFileSync("./json/sessionDB.json", JSON.stringify(sessions, null, 2));
  }

  res.cookie("session_id", sessionId, {
    signed: true,
    httpOnly: true,
    maxAge: 1 * 60 * 60 * 1000,
  });

  return res.json({
    success: true,
    redirectUrl: "http://localhost:5500/dashboard",
    data: result,
  });
});
app.post("/google/logout", (req, res) => {
  res.clearCookie("session_id", { signed: true, httpOnly: true });
  return res.status(200).json({
    success: true,
    msg: "Logout Succesfully!.",
  });
});

app.listen(port, () => console.log(`server is listening on port ${port}`));
