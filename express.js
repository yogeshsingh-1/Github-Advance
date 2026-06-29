import express from "express";
import AuthRouter from "./route/login.route.js";
import fs from "node:fs/promises";
import path from "node:path";
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
  // const fileHandle = await fs.open("download.mp4");
  // console.log(fileHandle.fd);
  // const readStream = fileHandle.createReadStream();
  // const stats = await fileHandle.stat();
  // res.setHeader("Content-Length", stats.size);
  // res.setHeader("Content-Type", "video/mp4");
  // readStream.pipe(res);

  // Alternate of this
  res.sendFile(path.join(import.meta.dirname, "download.mp4")); //absolute path dena hai
});
console.log();
// console.log(import.meta);
app.use("/signup/:sign", AuthRouter);
app.get("/login", (req, res) => {
  console.log(req.url);
  console.log(req.baseUrl);
  console.log(req.originalUrl);
  console.log(req.route);
  res.end("Login router");
});
app.get("/products/?*", (req, res) => {
  // ? ka matlab optional parameter hota hai.
  const { 0: name } = req.params;
  // {"0":"yogesh/singh/jaith/lal"}

  // console.log(req.params);
  // return res.send(req.params);
  res.set("Content-Type", "application/json");
  // res.set("Content-Type", "text/html");
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


// app.get("/products/:id?", (req, res) => {
//   // ? ka matlab optional parameter hota hai.
//   console.log(req.params.id);
// });

// app.get("/products/?*", (req, res) => {
//   res.send(
//     "* wildcard hai. Iska matlab /products/ ke baad aane wala koi bhi path match ho jayega. Ye nested routes ya catch-all routing ke liye use hota hai.",
//   );

// /products
// /products/101
// /products/101/201
// /products/mobile/apple
// });

// docker run -d
//   --name mongo-express
//   -p 8081:8081
//   -e ME_CONFIG_MONGODB_URL="mongodb://192.168.1.29:27017"
//   mongo-express

//   docker run -d --name mongo -p 27017:27017

//   docker run -d --name mongo-express --network mongo -p 8081:8081 -e ME_CONFIG_MONGODB_URL="mongodb://mongo:27017"  mongo-express:latest
