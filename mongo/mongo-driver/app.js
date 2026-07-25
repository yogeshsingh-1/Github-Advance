import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");

await client.connect();

const db = client.db("chat-app");
// const collections = await db.listCollections().toArray();

const collection = db.collection("users");
console.log(
  await collection
    .find(
      {},
      {
        projection: {
          _id: 0,
          password: 0,
          createdAt: 0,
          updatedAt: 0,
          __v :0
        },
      },
    )
    .toArray(),
);
await client.close();
