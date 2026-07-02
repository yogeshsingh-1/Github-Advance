import express from "express";
import https from "https";
import fs from "fs";

const app = express();

app.get("/", (req,res)=>{

    console.log("Route Hit");

    res.send("Hello");

});

const options={
    key:fs.readFileSync("./key.pem"),
    cert:fs.readFileSync("./cert.pem")
};

// Aur HTTP ko certificate ki zarurat nahi hoti.

// Agar HTTPS chahiye, to tumhe khud https.createServer() use karna padta hai aur key + cert provide karne padte hain.

const server=https.createServer(options,app);

server.listen(3000,()=>{
  console.log(`server is listening on 3000`)
});
