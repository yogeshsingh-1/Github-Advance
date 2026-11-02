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

app.post("/google/callback", async (req, res) => {
  const {session_id} = req.signedCookies;
  const existingSession= sessions.find(({sessionId})=> sessionId === session_id)
  if(existingSession){
    return res.status(200).json({status :true,msg:'User already logged in.'})
  }
  console.log(req.body);
  const code = req.body?.code;
  if (!code) {
    return res
      .status(200)
      .json({ status: false, msg: "Google Code not provided" });
  }
  const result = await receivedCallBack(code);
  if (!result) {
  return res.status(401).json({
    success: false,
    msg: "Google authentication failed",
  });
}

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
    // data: result,




    
  });
});
app.post("/google/logout", (req, res) => {
  const {session_id}  =req.signedCookies;
  if(session_id){
    const sessionIndex = sessions.findIndex(({sessionId})=> sessionId === session_id);
    // Index 0 is valid. -1 means not found.
   if(sessionIndex !== -1){
     sessions.splice(sessionIndex,1);
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
app.get("/google/profile",(req,res)=>{
  const {session_id} = req.signedCookies;
  const existingSession= sessions.find(({sessionId})=> sessionId === session_id)
  if(!existingSession){
    res.clearCookie("session_id", { signed: true, httpOnly: true });
    return res.status(409).json({status :false,msg:'You are not logged in.'})
  }
  const userId =existingSession.userId;
  const userDetails= users.find((user)=>user.id === userId);
  if(!userDetails){
    res.clearCookie("session_id", { signed: true, httpOnly: true });
    return res.status(200).json({status:false,msg:'You are not logged in.'});
  }
 return res.status(200).json({status:true,data:userDetails});


})

app.listen(port, () => console.log(`server is listening on port ${port}`));
