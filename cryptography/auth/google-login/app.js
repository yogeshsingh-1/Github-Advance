import express from "express";
import path from "node:path";
import receivedCallBack from "./service/googleService.js";
import "dotenv/config";
const port = 4000;
const app = express();

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());
app.use(express.static(path.join(process.cwd())));
app.post("/google/callback", async (req, res) => {
  console.log(req.body);
  const result = await receivedCallBack(req.body.code);
  return res.json({
    success: true,
    redirectUrl: "http://localhost:5500/dashboard",
    data: result,
  });
});

app.listen(port, () => console.log(`server is listening on port ${port}`));
