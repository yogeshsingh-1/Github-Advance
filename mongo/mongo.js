use("todoapp");
const todosCollection = db.getCollection("todos");
todosCollection.insertOne({title :"todos file is created"});

console.log(todosCollection.find());

// Run this file using cmd -> mongosh mongo.js
