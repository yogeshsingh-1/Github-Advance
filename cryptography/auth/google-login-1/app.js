import express from "express";
import path from "node:path";
import receivedCallBack from "./service/googleService.js";
import cookieParser from "cookie-parser";
import "dotenv/config";
import sessions from "./json/sessionDB.json" with { type: "json" };
import users from "./json/user.json" with { type: "json" };
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

// app.get("/google/callback", async (req, res) => {
//   const { session_id } = req.signedCookies;
//   const existingSession = sessions.find(
//     ({ sessionId }) => sessionId === session_id,
//   );
//   if (existingSession) {
//     const successQuery = getQuery(true, "Authentication Succesfull.");
//     return res.redirect(`http://localhost:5500/callback.html?${successQuery}`);
//     // return res
//     //   .status(200)
//     //   .json({ status: true, msg: "User already logged in." });
//   }
//   console.log(req.query);
//   const code = req.query?.code;
//   console.log(code);
//   if (!code) {
//     const failedQuery = getQuery(false, "Google Code not provided.");
//     return res.redirect(`http://localhost:5500/callback.html?${failedQuery}`);
//     // return res
//     //   .status(200)
//     //   .json({ status: false, msg: "Google Code not provided" });
//   }
//   const result = await receivedCallBack(code);
//   if (!result) {
//     const failedQuery = getQuery(false, "Google authentication failed.");
//     return res.redirect(`http://localhost:5500/callback.html?${failedQuery}`);

//     // return res.status(401).json({
//     //   success: false,
//     //   msg: "Google authentication failed",
//     // });
//   }

//   // const sessionId = crypto.randomUUID();
//   let sessionId = null;
//   const sessionHave = sessions.find(({ userId }) => userId === result.id);
//   if (sessionHave) {
//     sessionId = sessionHave.sessionId;
//   } else {
//     sessionId = crypto.randomUUID();
//     sessions.push({ sessionId, userId: result.id });
//     writeFileSync("./json/sessionDB.json", JSON.stringify(sessions, null, 2));
//   }

//   res.cookie("session_id", sessionId, {
//     signed: true,
//     httpOnly: true,
//     maxAge: 1 * 60 * 60 * 1000,
//     domain: "localhost",
//   });
//   const successQuery = getQuery(true, "Authentication Succesfull.");
//   return res.redirect(`http://localhost:5500/callback.html?${successQuery}`);

//   // return res.json({
//   //   success: true,
//   //   redirectUrl: "http://localhost:5500/dashboard",
//   //   // data: result,
//   // });
// });

app.get("/auth/google", (req, res) => {
  const oauthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const redirect_uri = "http://localhost:4000/google/callback";
  const client_id = process.env.client_id;
  const query = new URLSearchParams({
    response_type: "code",
    client_id: client_id,
    scope: "openid email profile",
    redirect_uri: redirect_uri,
  });
  return res.redirect(`${oauthUrl}?${query.toString()}`);
});

app.get("/google/callback", async (req, res) => {
  const { session_id } = req.signedCookies;
  const existingSession = sessions.find(
    ({ sessionId }) => sessionId === session_id,
  );
  if (existingSession) {
    return res.redirect(
      `http://localhost:5500/callback.html?sid=${existingSession.sessionId}`,
    );
  }
  const code = req.query?.code;
  if (!code) {
    return res.redirect(`http://localhost:5500/callback.html?sid=null`);
  }
  const result = await receivedCallBack(code);
  if (!result) {
    return res.redirect(`http://localhost:5500/callback.html?sid=null`);
  }
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
    domain: "localhost",
  });
  return res.redirect(`http://localhost:5500/callback.html?sid=${sessionId}`);
});

app.post("/auth/signed-cookie", (req, res) => {
  const { session_id } = req.signedCookies;
  const { sid } = req.body;

  if (sid === session_id) {
    const successQuery = { status: 200, msg: "Authentication Succesfull." };
    return res.status(200).json(successQuery);
  } else {
    const failedQuery = { status: 401, msg: "Google authentication failed." };
    res.clearCookie("session_id", {
      httpOnly: true,
      path: "/",
    });
    return res.status(401).json(failedQuery);
  }
});
app.post("/google/logout", (req, res) => {
  const { session_id } = req.signedCookies;
  if (session_id) {
    const sessionIndex = sessions.findIndex(
      ({ sessionId }) => sessionId === session_id,
    );
    // Index 0 is valid. -1 means not found.
    if (sessionIndex !== -1) {
      sessions.splice(sessionIndex, 1);
      writeFileSync("./json/sessionDB.json", JSON.stringify(sessions, null, 2));
    }
  }
  // Clear the browser cookie whether or not
  // the server-side session still exists.
  res.clearCookie("session_id", {
    httpOnly: true,
    path: "/",
  });

  return res.status(204).json({
    success: true,
    msg: "Logout Succesfully!.",
  });
});
app.get("/google/profile", (req, res) => {
  const { session_id } = req.signedCookies;
  const existingSession = sessions.find(
    ({ sessionId }) => sessionId === session_id,
  );
  if (!existingSession) {
    res.clearCookie("session_id", { signed: true, httpOnly: true });
    return res
      .status(409)
      .json({ status: false, msg: "You are not logged in." });
  }
  const userId = existingSession.userId;
  const userDetails = users.find((user) => user.id === userId);
  if (!userDetails) {
    res.clearCookie("session_id", { signed: true, httpOnly: true });
    return res
      .status(200)
      .json({ status: false, msg: "You are not logged in." });
  }
  return res.status(200).json({ status: true, data: userDetails });
});

function getQuery(success, msg) {
  return new URLSearchParams({ success, msg });
}
app.listen(port, () => console.log(`server is listening on port ${port}`));
