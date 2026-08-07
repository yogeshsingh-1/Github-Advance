<!-- MongoDB mein Schema Validation ka use collection ke documents ko validate karne ke liye hota hai. Ye SQL ke table constraints ki tarah kaam karta hai. -->

1. Collection create karte time validation add karna

Example: products collection

import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");
await client.connect();

const db = client.db("cloth");

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

2. Existing collection mein validation add karna

Agar collection pehle se bani hui hai:

await db.command({
collMod: "products",

validator: {
$jsonSchema: {
bsonType: "object",

      required: ["title", "price"],

      properties: {
        title: {
          bsonType: "string",
        },

        price: {
          bsonType: "number",
          minimum: 0,
        },
      },
    },

},

validationLevel: "strict",
validationAction: "error",
});
