import { MongoClient } from "mongodb";
const client = new MongoClient("mongodb://127.0.0.1:27017");

await client.connect();

const db = client.db("cloth");
const collections = db.listCollections();
console.log(await collections.toArray());
// const order = db.collection("order");

// await order.insertMany([
//   {
//     name: "Mobile",
//     price: 24,
//     address: "g1219",
//   },
//   {
//     name: "Bottle",
//     price: 10,
//     address: "Opticode",
//   },
//   {
//     name: "Buds",
//     price: 30,
//     address: "pinnacle",
//   },
// ]);
