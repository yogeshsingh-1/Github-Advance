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
console.log(b);
if (!b) {
  studentCollection1.insertMany([
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
  b = 1;
}
await studentCollection.deleteMany({name:'yogesh'})
await studentCollection1.drop();
