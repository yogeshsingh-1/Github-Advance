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
