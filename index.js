import fs from "node:fs";
// const read = fs.readFileSync("./express.js").toString("base64");
// const read = Buffer.from("abc").toString("utf-8");
// console.log(read);

// const readstream = fs.createReadStream("./express.js");
// readstream.on('data',(chunk)=>{

// })

import express from "express";
const app = express();

app.disable("x-powered-by")
app.get("/", (req, res) => {
//   res.setHeader("Content-Type", "text/html; charset=hex");
//   res.setHeader("Content-Type1", "application/json;charset=base64");
  return res.end("Hello world");
  //   res.send()
});
// const a = fs.readFileSync("abs", "hex");
app.listen(3000, "0.0.0.0", (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`server is listening on 3000`);
});
