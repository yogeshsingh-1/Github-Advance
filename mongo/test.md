<!-- ObjectId() datatype -->

Get timestamp from ObjectId() method :-

const id = ObjectId()

id.getTimestamp()

ISODate('2026-07-07T15:00:09.000Z')

<!-- Long Datatype in mongo -->

In Js = Number.MAX_SAFE_INTEGER (9007199254740991)

In JS we work with long data type 900719925474099122121n

In mongo Long Datatype Store like string but thread as an number :-

NumberLong("9007199254740991")
Long('9007199254740991')

db.number.insertOne({a : 900719925474099121131n})

or 

db.number.insertOne({a : NumberLong("900719925474099121131")})

db.users.insertOne({
  _id: ObjectId(),
  name: "Himanshu",           // String
  age: NumberInt(27),         // Int32
  salary: NumberLong(500000), // Int64
  cgpa: 8.75,                 // Double
  balance: NumberDecimal("12345.67"), // Decimal128
  isActive: true,             // Boolean
  hobbies: ["Coding", "Gaming"], // Array
  address: {                  // Object
    city: "Kanpur",
    state: "UP"
  },
  createdAt: new Date(),      // Date
  profile: null,              // Null
  image: BinData(0, "..."),   // Binary
  pattern: /abc/i             // Regular Expression
});


<!-- Based on data type alias we search the data -->

db.users.find({info : { $type : "bool" }})
