import express from "express";
import AuthRouter from "./route/login.route.js";
import fs from "node:fs/promises";
import path from "node:path";
import { createReadStream, createWriteStream } from "node:fs";
const app = express();

app.use(express.static("public"));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});
app.use((req, res, next) => {
  req.companyId = "12345";
  next();
});



app.get("/", (req, res) => {
  console.log(req.url);
  console.log(req.baseUrl);
  console.log(req.originalUrl);
  console.log(req.route);
  res.end("Home router");
});

app.get("/test", async (req, res) => {
  
  
  
  
  
  
  

  
  res.sendFile(path.join(import.meta.dirname, "download.mp4")); 
});
console.log();

app.use("/signup/:sign", AuthRouter);
app.get("/login", (req, res) => {
  console.log(req.url);
  console.log(req.baseUrl);
  console.log(req.originalUrl);
  console.log(req.route);
  res.end("Login router");
});
app.get("/products/?*", (req, res) => {
  
  const { 0: name } = req.params;
  

  
  
  res.set("Content-Type", "application/json");
  
  res.set("Content-Length", name.length);
  return res.json(req.params);
});

app.get("/dir", async (req, res) => {
  const dir = await fs.readdir("./");

  const result = [];

  for (const file of dir) {
    const stats = await fs.stat(file);

    result.push({
      name: file,
      isDirectory: stats.isDirectory(),
    });
  }

  res.json(result);
});

app.listen(3000, () => {
  console.log(`server is running on port 3000`);
});

app.get("/file", async (req, res) => {
  const files = await fs.readdir("./");
  res.set("Content-Type", "text/html");
  for (let file of files) {
    const stat = await fs.stat(`./${file}`);

    if (!stat.isDirectory()) {
      const readPath = path.join(file);
      const readStream = createReadStream(readPath, { encoding: "utf-8" });
      
      readStream.on("data", (chunk) => {
        res.write(chunk);
      });
    }
  }
  res.end();
});

app.get("/download", (req, res) => {
  const readstream = createReadStream("./process.json", {
    highWaterMark: 1,
  });

  res.setHeader("Content-Type", "text/plain");

  readstream.on("data", (chunk) => {
    readstream.pause(); 

    res.write(chunk); 

    setTimeout(() => {
      readstream.resume(); 
    }, 100);
  });

  readstream.on("end", () => {
    res.end();
  });
});

app.get("/:filename", (req, res) => {
  const { filename } = req.params;
  
  const writeStream = createWriteStream(`./storage/${filename}`);
  req.on("data", (chunk) => {
    writeStream.write(chunk);
  });
  
  req.on("end", () => {
    writeStream.end();
    res.json({ msg: "File Uploaded" });
  });
});
async function getDir(dir) {
  const files = await fs.readdir(dir);
  for (let file of files) {
    const stat = await fs.stat(`${dir}/file`);
    if (stat.isDirectory()) {
      const writeStream = createWriteStream(file);
      req.pipe(writeStream);
    } else {
      const writeStream = createWriteStream(file);
      req.pipe(writeStream);
    }
  }
}


























