import { MongoClient } from "mongodb";
import { title } from "node:process";
const client = new MongoClient("mongodb://127.0.0.1:27017");
await client.connect();

const db = client.db("cloth");
// console.log(await db.listCollections().toArray());
// const products = db.collection("products");
// const collection = db.createCollection("user", {});
// validate schema design
// console.log(
//   await products
//     .find(
//       {},
//       {
//         limit:6,
//         projection: {
//           _id: 0,
//         //   title: 1,
//         rating:1
//         },
//       },
//     )
//     .toArray(),
// );

// validationCollectionDesign
await db.command({
  collMod: "products",
  validator: {
    required: ["title", "price", "category"],
    title: {
      $type: "string",
    },
    price: {
      $type: "double",
    },
    category: {
      $type: "string",
    },
    rating: {
      $type: "object",
    },
    description: {
      $type: "string",
    },
  },
  validationLevel: "strict",
  validationAction: "error",
});

// {
//   _id: ObjectId('6a683c761559225f93db5981'),
//   id: NumberInt('1'),
//   title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
//   price: Double('109.95'),
//   description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
//   category: 'men\'s clothing',
//   image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png',
//   rating: {
//     rate: Double('3.9'),
//     count: NumberInt('120')
//   }
// }

await db.createCollection("products", {
validator: {
$jsonSchema: {
bsonType: "object",
required: ["title", "price", "rating"],
      properties: {
        title: {
          bsonType: "string",
          description: "Title must be a string",
        },

        price: {
          bsonType: "number",
          minimum: 0,
          description: "Price must be a positive number",
        },

        rating: {
          bsonType: "object",
          required: ["rate", "count"],

          properties: {
            rate: {
              bsonType: "number",
              minimum: 0,
              maximum: 5,
            },

            count: {
              bsonType: "int",
              minimum: 0,
            },
          },
        },
      },
    },

},

validationLevel: "strict",
validationAction: "error",
});

// 2. Existing collection mein validation add karna

// Agar collection pehle se bani hui hai:

await db.command({
collMod: "products",

validator: {
// $jsonSchema: {
// bsonType: "object",

//       required: ["title", "price"],

//       properties: {
//         title: {
//           bsonType: "string",
//         },

//         price: {
//           bsonType: "number",
//           minimum: 0,
//         },
//       },
//     },

},

validationLevel: "strict",
validationAction: "error",
});
