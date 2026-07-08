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

console.log(await studentCollection.countDocuments());  // count the document exist in collection

// Cursor is an Object in the eyes of Javascript.
const cursor = studentCollection.find(); //async iterator

for await (let document of cursor) {
  console.log(document);
}

console.log(await cursor.next());
console.log(await cursor.next());
console.log(await cursor.next());

console.log(await cursor.hasNext());
