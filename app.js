// const blob = new Blob(["Hello World"], {
//   type: "text/plain",
// });

// console.log(Array.isArray(blob.bytes)); // 11
// console.log(blob.type); // text/plain
// console.log(blob)
import fs from "fs";

// const a = fs.readFileSync("./img.jpg", "Base64");
// fs.writeFileSync("./test.txt", a);
// const path = "D:\\New folder\\New folder.rar";
// const text = fs.readFileSync(path);
// console.log(text)

// const buf7 = Buffer.from('tést', 'latin1');
// console.log(buf7)

import express from "express";
import multer from "multer";
import { fileURLToPath } from "node:url";
import path from "node:path";
import ejs from "ejs";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const templatePath = path.join(__dirname, "views", "email");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// app.set("views", path.join("views", "email"));
app.get("/", async (req, res) => {
  const htmlBody = await ejs.renderFile(path.join(templatePath, "Email.ejs"), {
    name: "Yogesh Singh",
  });
  console.log(htmlBody);
  //   res.render("Email.ejs", { name: "Yogesh Singh" });
  return res.send(htmlBody);
});

app.listen(3000, () => {
  console.clear();
  console.log(`server is listen on 3000`);
});
