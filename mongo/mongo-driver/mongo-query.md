 <!-- Drop Database-->

db.dropDatabase() -> Delete Database and existing collection and document

<!-- Drop Collection -->

db.collectionName.drop() -> Drop Collection and Its Documents.

<!-- Insert one document using mongo-shell -->

db.users.insertOne({name:"yogesh"})

after this line one collection created. Name of collection is users and one document inserted succesfully.

<!-- Insert multiple document using mongo-shell -->

db.users.insertMany([])

[] -> Object of Array

after this line one collection created. Name of collection is users and many document inserted succesfully.

<!-- Find one Document -->

db.users.findOne({name :"yogesh"}) -> return simple object not cursor.

<!-- Find all Document -->

db.users.findOne() -> this return a cursor

db.users.find().constructor
[class Cursor extends AggregateOrFindCursor]

db.users.find({curreny:"USD"}) -> Return array of Object.

<!-- mongo advance filter query -->

# db.users.find({amount : {$gt : 200}}) -> woh document doh jiske amount 200 se jyda hoh.

# db.users.find({amount : {$gte : 200}}) -> woh document doh jiske amount 200 or 200 se jyda hoh.

# db.users.find({amount : {$lt : 200}}) -> woh document doh jiske amount 200 se kaam hai.

# db.users.find({amount : {$lte : 200}}) -> woh document doh jiske amount 200 se kaam hai or equal hai.

<!-- Update One document -->

Update and insert combination

db.users.updateOne({name :'yogesh'}, {$set : {amount:120000}})

yogesh name se find karo agar document hai toh amount set kar doh.

<!-- Update many object -->

db.users.updateMany({name :'yogesh'}, {$set : {amount:120000}})

Jitne yogesh name ke document hai sabke amount set kar doh.

<!-- Update whole object -->

db.users.replaceOne({name :"yogesh"}, {name:"golu"})

<!-- Delete Property in Document -->

db.users.updateOne({name :'yogesh'}, {$unset : {age:27}})

<!-- Delete One document in Collection -->

db.users.deleteOne({\_id: ObjectId('67d69529abc7435a7de2d9dc')})

<!-- Delete Many Document -->

db.users.deleteMany({name :"yogesh"})

<!-- Delete collection -->

db.collectioName().drop()

<!-- Drop Database -->

db.dropDatabase()

<!-- Filter Bulk document using $in -->

db.users.find({name : {$in : ["Yogesh","Ajay","Jai"]}});

db.users.find({_id : {$in : [123,345,678]}});

return -> Array of Users

<!-- Update  Bulk document using $in  info property add in given name-->

db.student.updateMany(
{name :{$in :["Amit","Rahul"]}},
 {$set :{info : "private"}}
)

<!-- Delete Bulk document using $in -->

db.student.deleteMany({name :{$in :["Amit","Rahul"]}})