// MongoDB me batchSize ka matlab hota hai:

// Ek baar me server client ko kitne documents bhejega.

// Jab aap bahut saare documents fetch karte ho, MongoDB sab documents ek hi response me nahi bhejta. Wo unhe batches (groups) me bhejta hai. Har batch ka size batchSize se control hota hai.

// Summary
// batchSize(n) → Ek network round-trip me kitne documents bhejne hain.
// limit(n) → Total kitne documents return karne hain.
// batchSize result count ko limit nahi karta, sirf data transfer ka size control karta hai.
// Large datasets ke liye batchSize memory usage aur network efficiency improve karta hai.

import { MongoClient } from "mongodb";
const client = new MongoClient("mongodb://127.0.0.1:27017");
let a;
let b;

await client.connect();

const db = client.db("school");

const studentCollection = db.collection("student");
const studentCollection1 = db.collection("student1");
if (!a) {
  studentCollection.insertMany([
    {
      name: "Rahul",
      age: 25,
      city: "Kanpur",
    },
    {
      name: "Amit",
      age: 28,
      city: "Lucknow",
    },
    {
      name: "Priya",
      age: 23,
      city: "Delhi",
    },
    {
      name: "Neha",
      age: 26,
      city: "Noida",
    },
    {
      name: "Rohit",
      age: 30,
      city: "Agra",
    },
  ]);
  a = 1;
}

const cursor = studentCollection.find().batchSize(100); // control the batch of data

// first batch ko first batch dikhta hai and next batch ko next batch dikta hai.
// 1 batch ka size 16 mb ho skta hai.

const data = await cursor.toArray();

console.log(data);

// What does batchSize(5) do?

// Many beginners think it will return only 5 documents, but that's not true.

// batchSize(5) tells MongoDB:

// "Send the results from the server to the client in batches of 5 documents."

// If your collection contains 20 documents, here's what happens:

// MongoDB Server
// ┌──────────────────────────┐
// │ 20 Documents             │
// └──────────────────────────┘
//           │
//           ▼
// Batch 1 → 5 docs
// Batch 2 → 5 docs
// Batch 3 → 5 docs
// Batch 4 → 5 docs

// If you want only 5 documents

// Use limit() instead.

const products = await productColllection
  .find(
    {},
    {
      projection: {
        _id: 0,
        title: 1,
        price: 1,
      },
    },
  )
  .limit(5)
  .toArray();

console.log(products);


