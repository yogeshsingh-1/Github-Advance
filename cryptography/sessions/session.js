import express from "express";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser("ram-ram",{
  decode:"base64"
}));
let sessionId = 1;
app.get("/", (req, res) => {
  res.cookie("lolo", "zolo", {
    maxAge: 6 * 60 * 60 * 1000,
    httpOnly: true, // Javascript side se not readable(document.cookie)
  });
  return res.send({ msg: "Session Created." });
});
app.get("/session", (req, res) => {
  //   res.cookie("lolo", "zolo");
  // if(req.cookie())
  return res.send({ msg: "Session Verify.", cookie: req.cookies });
});
app.listen(3000, () => {
  //   console.clear();
  console.log(`server is listen on 3000`);
});

console.log(new Date("2026-10-21T17:18:58.436Z").toLocaleString());
