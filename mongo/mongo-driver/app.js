import { MongoClient } from "mongodb";
import fs from "node:fs";
import { title } from "node:process";
const client = new MongoClient("mongodb://127.0.0.1:27017");

await client.connect();

const db = client.db("cloth");
// get Collection Info
// const collections = await db.listCollections({ name: "users" }).toArray();
// console.log(collections);

const productColllection = db.collection("products");
const data = await fs.promises.readFile("./data.json", { encoding: "utf-8" });
// const productData = productColllection
//   .find(
//     {},
//     {
//       projection: {
//         _id: 0,
//         //   id: 0,
//         title: 1,
//         price: 1,
//       },
//     },
//   )
//   .limit(5);
// console.log(await productData.toArray());

// const productData = productColllection
//   .find(
//     { id: { $in: [7, 8] } },
//     {
//       projection: {
//         _id: 0,
//         id: 1,
//         title: 1,
//       },
//     },
//   )
//   .limit(5);
// console.log(await productData.toArray());

// const productData = productColllection
//   .find(
//     { price: { $ne: 695 } },
//     {
//       projection: {
//         _id: 0,
//         id: 1,
//         title: 1,
//       },
//     },
//   )
//   .limit(5);
// console.log(await productData.toArray());

// const productData = productColllection
//   .find(
//     { price: { $gt: 200 } },
//     {
//       projection: {
//         _id: 0,
//         id: 1,
//         title: 1,
//         price:1
//       },
//     },
//   )
// //   .limit(5);
// console.log(await productData.toArray());

// const productData = productColllection.find(
//   { price: { $nin: [15.99, 695] } },
//   {
//     projection: {
//       _id: 0,
//       id: 1,
//       title: 1,
//       price: 1,
//     },
//   },
// );
//   .limit(5);

const productData = productColllection.find(
  { $and: [{ price: { $lt: 200 } }, { price: { $gt: 5 } }] },
  {
    projection: {
      _id: 0,
      id: 1,
      title: 1,
      price: 1,
    },
  },
);
console.log(await productData.toArray());
// await productColllection.insertMany(JSON.parse(data));

// console.log(
//   await collection
//     .find(
//       {},
//       {
//         projection: {
//           _id: 0,
//           password: 0,
//           createdAt: 0,
//           updatedAt: 0,
//           __v: 0,
//         },
//       },
//     )
//     .toArray(),
// );

// Get Collection Info
db.collection("users");

await client.close();
