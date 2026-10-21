import express from "express";
import path from "node:path";
const port = 4000;
const app = express();
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});
app.use(express.json());
app.use(express.static(path.join(process.cwd())));
app.get("/", (req, res) => {
  console.log("Hello world");
  // res.set("")
  res.sendFile(`index.html`);
  // res.sendFile(path.join(process.cwd(), "index.html"));
});
// app.get("/callback", (req, res) => {
//   console.log(req.query);
//   console.log("Hello world");
//   res.sendFile(path.join(process.cwd(), "callback.html"));
// });
app.listen(port, () => console.log(`server is listening on port ${port}`));
