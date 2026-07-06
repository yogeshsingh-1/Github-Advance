 <!-- Drop Database-->

db.dropDatabase()

<!-- Insert one document using mongo-shell -->

db.users.insertOne({name:"yogesh"})

after this line one collection created. Name of collection is users and one document inserted succesfully.

<!-- Insert multiple document using mongo-shell -->

db.users.insertMany([])

[] -> Object of Array

after this line one collection created. Name of collection is users and many document inserted succesfully.

<!-- Find one Document -->

db.users.findOne({name :"yogesh"})

<!-- Find all Document -->

db.users.findOne()
