import fs from "node:fs";
// const read = fs.readFileSync("./express.js").toString("base64");
// const read = Buffer.from("abc").toString("utf-8");
// console.log(read);

const readstream = fs.createReadStream("./express.js");
readstream.on('data',(chunk)=>{
    
})
