import express from "express";
import path from "node:path";
const app = express();
// app.use()
// app.enable();
app.set("views", path.join(process.cwd(), "backend", "node"));
console.log(app.settings);
// app.set("trust proxy", true);
// app.set("anurag", "nigam");
// app.set("view engine", "ejs");
// app.set("views", path.join(process.cwd(), "viewtemplate"));
// app.use(express.static("public"));
// console.log(app.settings);
// console.log("hi",app.enable("views"));
// app.enable("trust proxy");
// console.log(app.settings);
// console.log(app.get("view"));
// console.log(app.get("anurag"));
// app.enable("anurag");
// console.log(app.settings);
// console.log("hello world",app.locals);
console.log(app.settings);
app.get("/", (req, res) => {
  return res.status(200).json({
    Status: 1,
    Name: "Anurag",
    Position: "Frontend Developer",
    GirlFriend: "All",
  });
});
app.get("/word", (req, res) => {
  return res.status(200).send({
    Status: 1,
    Name: "Anurag",
    Position: "Frontend Developer",
    GirlFriend: "All",
  });
});
app.listen(3000, "0.0.0.0", (e) => {
  if (e) {
    process.exit(1);
  }
  console.log(`server is listening on port 3000`);
});
