# Mongoose ke Data Types

- String
  Text store karna "Yogesh"

- Number
  Numeric values 25, 99.5

- Boolean
  True / False true

- Date
  Date aur time new Date()

- Buffer
  Binary data Buffer.from("Hi")

- ObjectId ( { type : mongoose.Types.ObjectId(), ref: "Collection_Name" })
  Kisi document ki unique ID/reference

- Array
  Multiple values store karna ["Node", "React"]

- Map
  Key-value pairs { theme: "dark" }

- Mixed ( type: mongoose.Schema.Types.Mixed)
  Koi bhi type ka data { any: "value" }

- Decimal128 ( type :mongoose.Schema.Types.Decimal128 )
  High-precision decimal values "99.99"
- BigInt
  Bade integer values 9007199254740993n
