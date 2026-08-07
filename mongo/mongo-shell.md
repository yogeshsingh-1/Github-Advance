<!-- # Default connection -->

mongosh -> mongo ka shell

<!-- # Without connecting to any database -->

mongosh --nodb

<!-- Kya mongosh Node.js REPL jaisa hai? -->

Yes. mongosh JavaScript engine par based hai aur interactive REPL (Read-Eval-Print Loop) provide karta hai, bilkul Node.js REPL ki tarah.

mongosh aur Node.js REPL kaafi similar lagte hain, lekin same nahi hain.

this mongo shell is same like a node repl.
Ye Node REPL ki tarah hi behave karta hai.

<!-- Kya mongosh me Node.js modules use kar sakte hain? -->

Haan. Modern mongosh Node.js runtime par based hai, isliye bahut se built-in Node modules available hote hain.

In mongo shell you can see all node.js module like
http,fs,path,os,net

<!-- See all version mongo shell  -->

process.versions

<!-- In mongo shell go editor mode -->

.editor

<!-- MongoDb Connection Command -->

# Connect to local MongoDB

mongosh "mongodb://127.0.0.1:27017"

# Connect to a specific database

mongosh "mongodb://127.0.0.1:27017/shop"

# Connect with username and password

mongosh "mongodb://admin:password@127.0.0.1:27017/shop"

# Connect to MongoDB Atlas

mongosh "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/shop"

<!-- Node REPL vs mongosh -->

| Feature                  | Node REPL | mongosh     |
| ------------------------ | --------- | ----------- |
| JavaScript               | ✅        | ✅          |
| Variables                | ✅        | ✅          |
| Functions                | ✅        | ✅          |
| Node.js built-in modules | ✅        | ✅ (mostly) |
| MongoDB commands         | ❌        | ✅          |
| Database connection      | ❌        | ✅          |
