import express from "express";
import path from "node:path";
import cookieParser from "cookie-parser";
import "dotenv/config";
import sessions from "./json/sessionDB.json" with { type: "json" };
import users from "./json/user.json" with { type: "json" };
import { writeFileSync } from "node:fs";
import { passportMiddleware } from "./service/passport.js";
import passport from "passport";
import fs from "fs";
import {
  getUserInfoUsingAccessToken,
} from "./service/googleAuthLibrary.js";
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
passportMiddleware();

// app.get("/auth/google", async (req, res) => {
//   // Create google oauth redirect url
//   const url = await generateAuthUrl();
//   return res.redirect(url);
// });
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile","email","openid"],session:false }),
);

// Goggle can send a code this callback url
// app.get("/google/callback", async (req, res) => {
//   const { session_id } = req.signedCookies;
//   const existingSession = sessions.find(
//     ({ sessionId }) => sessionId === session_id,
//   );
//   if (existingSession) {
//     return res.redirect(
//       `http://localhost:5500/callback.html?sid=${existingSession.sessionId}`,
//     );
//   }
//   const code = req.query?.code;
//   if (!code) {
//     return res.redirect(`http://localhost:5500/callback.html?sid=null`);
//   }
//   // using code get userdetails and verify id_token
  // const result = await receivedCallBack(code);
//   if (!result) {
//     return res.redirect(`http://localhost:5500/callback.html?sid=null`);
//   }
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
//   return res.redirect(`http://localhost:5500/callback.html?sid=${sessionId}`);
// });

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "",session:false }),
  (req, res) => {
    console.log("Successfully login");
    console.log(req.user);
      const {googleId: sub, name, email,photo: picture } = req.user; // JSON.parse(userDetails);
      // Check whether user already exists
     
      const findUser = users.some((user) => user.id === sub);
      if (!findUser) {
        users.push({
          id: sub,
          name,
          email,
          picture,
          // access_token: tokens?.access_token,
        });
        fs.writeFileSync(`./json/user.json`, JSON.stringify(users, null, 2));
      }
      let sessionId = null;
  const sessionHave = sessions.find(({ userId }) => userId === sub);
  if (sessionHave) {
    sessionId = sessionHave.sessionId;
  } else {
    sessionId = crypto.randomUUID();
    sessions.push({ sessionId, userId:sub });
    writeFileSync("./json/sessionDB.json", JSON.stringify(sessions, null, 2));
  }

  res.cookie("session_id", sessionId, {
    signed: true,
    httpOnly: true,
    maxAge: 1 * 60 * 60 * 1000,
    domain: "localhost",
  });
  return res.redirect(`http://localhost:5500/callback.html?sid=${sessionId}`);
  
  },
);

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

app.post("/google/user-info", async (req, res) => {
  const accessToken = req.body.accessToken;
  if (!accessToken) {
    return res
      .status(200)
      .json({ status: false, msg: "Access Token not found." });
  }

  const result = await getUserInfoUsingAccessToken(accessToken);
  if (!result) {
    return res
      .status(200)
      .json({ status: false, msg: "Access Token Invalid." });
  }
  return res.status(200).json({
    status: true,
    data: result,
  });
});
function getQuery(success, msg) {
  return new URLSearchParams({ success, msg });
}
app.listen(port, () => console.log(`server is listening on port ${port}`));
