// import console from "node:console";
// let a ={name :"hello world",age:30,email:'yogeshs3434@gmail.com'}
// console.dir(a)


// console.log(process.env)

import fs from "node:fs";
const writeable=fs.createWriteStream("process.json",{encoding:"utf-8"});
writeable.write(JSON.stringify(process))
writeable.end()



