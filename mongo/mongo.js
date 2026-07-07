use("todoapp")
const todosCollection = db.getCollection("todos")
todosCollection.insertOne({title :"todos file is created"})

console.log(todosCollection.find())