// MongoDB me Projection ka matlab hota hai:

// Query ke result me kaun-kaun se fields return karni hain aur kaun si fields nahi return karni hain.

// Agar document me 20 fields hain aur aapko sirf name aur age chahiye, to projection use karke sirf wahi fields return karwa sakte ho.

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

const cursor = studentCollection.find(
  {},
  {
    projection: {
      _id: 0,
      name: 1, //1 ka matlab field include karo.
      age: 1,
    },
  }
);

// _id ko hide karna

// Default me MongoDB _id hamesha return karta hai.

// Agar nahi chahiye:

db.users.find(
  {},
  {
    _id: 0,
    name: 1,
    age: 1,
  }
);

// Rule:

// Ya to sirf include (1) use karo.
// Ya sirf exclude (0) use karo.
