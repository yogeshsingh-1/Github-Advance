import express from "express";
import { createWriteStream, WriteStream } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
const app = express();

app.use((req, res, next) => {
  // res.set("Access-Control-Allow-Origin", "*");
  // res.set("Access-Control-Allow-Method", "*");
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",
  });
  next();
});
app.use(express.json());

app.use(express.static(path.resolve(import.meta.dirname, "storage")));
console.log(import.meta.dirname);
console.log(path.join(import.meta.dirname, "storage"));
app.get("/", async (req, res) => {
  const files = await fs.readdir(path.resolve(import.meta.dirname, "storage"));
  res.set("Content-Type", "application/json; charset=utf-8");
  res.status(200).json(files);
});
app.get("/file/:fileName", async (req, res) => {
  const { fileName } = req.params;
  const { action, newFileName } = req.query;
  console.log(action);
  console.log(newFileName);
  const filePath = path.resolve(import.meta.dirname, "storage", fileName);
  if (action === "download") {
    // res.set("Content-Disposition", `attachment; filename="${fileName}"`);
    // return res.sendFile(filePath);
    return res.download(filePath); // automatically header add karta hai stream ke through file send karta hai
  }
  if (action === "rename") {
    const updateFileName = path.resolve("storage", newFileName);
    console.log("updte", updateFileName);
    await fs.rename(filePath, updateFileName);
    return res.status(200).json({ message: "Succesfully rename file" });
  }
  if (action === "delete") {
    const deletePath = path.resolve("storage", fileName);
    // console.log("updte", updateFileName);
    await fs.unlink(deletePath);
    return res.status(200).json({ message: "Succesfully file Deleted." });
  }
});

app.post("/:filename", (req, res) => {
  console.log(req.params.filename);
  const fileName = req.params.filename;
  // req.highWaterMark = 64 * 1024 * 1024;
  const writeStream = createWriteStream(`./storage/${fileName}`, {
    highWaterMark: 64 * 1024 * 1024,
  });

  req.pipe(writeStream);
  writeStream.on("finish", () => {
    return res.status(200).json({
      message: "File Uploaded Succesfully.",
    });
  });
  // req.on("data", (chunk) => {
  //   writeStream.write(chunk);
  // });
  req.on("end", () => {
    // writeStream.end();
    // res.status(200).json("File upload succesfully");
    console.log("File Uploaded");
  });
});
app.listen(8080, () => console.log(`server is listening on port 8080`));

// res.sendFile(filePath)  vs res.download(filePath);

// 1. res.sendFile(filePath)
// mai sab manually karna pdta hai.

// res.setHeader(
//   "Content-Disposition",
//   `attachment; filename="${fileName}"`
// );

// return res.sendFile(filePath);

// 2. res.download(filePath);
// Ye internally header set karta hai:
// Content-Disposition: attachment
// set karta hai aur file stream kar deta hai.
