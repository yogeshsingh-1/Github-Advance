import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");

await client.connect();

console.log("Default Db", client.db().namespace); // give default DB name

const db = client.db("todoapp"); // connect todoapp DB or create new DB
console.log("DB-Name", db.namespace); // get the name of DB
const collections = await db.listCollections().toArray(); // see all your collection in your db
// console.log(collections);
console.log("Collection Name", collections.map(printResult)); // get collection from array

const todoCollection = db.collection("todos"); //select todos collection
const allTodo = todoCollection.find(); // find all documents in todoCollection
const todoData = await todoCollection.findOne(); // find one document in todocollection

// console.log(todoData);

console.log(await allTodo.toArray());

/* Get all Databases */

const admin = client.db().admin(); //get Admin instance

const allDB = await admin.listDatabases();
const databases = allDB.databases;
// console.log(databases);

console.log("All DB", databases.map(printResult));
/* End Region */

function printResult(collection) {
  return collection.name;
}

// await client.close();
