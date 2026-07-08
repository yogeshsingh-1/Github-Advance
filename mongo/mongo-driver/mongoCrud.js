import { MongoClient } from "mongodb";
var a;
const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url);
const db = client.db("crudapp");

// console.log(db.namespace);

const crudCollection = db.collection("crud");
if (!a) {
  await crudCollection.insertMany([
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

const getDocument = await crudCollection.find().toArray();
console.log(getDocument.map(print));

function print(doc) {
  return doc;
}
