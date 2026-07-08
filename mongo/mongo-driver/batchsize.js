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
