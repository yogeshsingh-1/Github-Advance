# MongoDB BSON Types

| Type                  | Number | Alias               | Notes                                      |
| --------------------- | ------ | ------------------- | ------------------------------------------ |
| Double                | 1      | double              | 64-bit floating point number               |
| String                | 2      | string              | UTF-8 string                               |
| Object                | 3      | object              | Embedded document                          |
| Array                 | 4      | array               | Array of values                            |
| Binary Data           | 5      | binData             | Binary data                                |
| Undefined             | 6      | undefined           | **Deprecated**                             |
| ObjectId              | 7      | objectId            | Unique document identifier                 |
| Boolean               | 8      | bool                | `true` or `false`                          |
| Date                  | 9      | date                | UTC datetime                               |
| Null                  | 10     | null                | Null value                                 |
| Regular Expression    | 11     | regex               | Regular expression                         |
| DBPointer             | 12     | dbPointer           | **Deprecated**                             |
| JavaScript            | 13     | javascript          | JavaScript code                            |
| Symbol                | 14     | symbol              | **Deprecated**                             |
| JavaScript with Scope | 15     | javascriptWithScope | **Deprecated**                             |
| 32-bit Integer        | 16     | int                 | Signed 32-bit integer                      |
| Timestamp             | 17     | timestamp           | Internal MongoDB timestamp                 |
| 64-bit Integer        | 18     | long                | Signed 64-bit integer                      |
| Decimal128            | 19     | decimal             | 128-bit decimal floating point             |
| MinKey                | -1     | minKey              | Compares lower than all other BSON values  |
| MaxKey                | 127    | maxKey              | Compares higher than all other BSON values |

<!-- Based on data type alias we search the data or type code ke based per bhi search kar skte hai-->

db.users.find({info : { $type : "bool" }})

Example:

# db.users.findOne({info :{$type :'array'}})

{
\_id: ObjectId('6a4d1e7ce61161578c4eeb8b'),
name: 'Array',
info: [ 'Node.js', 'MongoDB', 'Express' ]
}

# db.users.findOne({info :{$type :'object'}})

{
\_id: ObjectId('6a4d1e7ce61161578c4eeb8c'),
name: 'Object',
info: { firstName: 'Himanshu', age: 27, city: 'Kanpur' }
}

# db.users.findOne({info :{$type :'number'}})

{
\_id: ObjectId('6a4d1e7ce61161578c4eeb87'),
name: 'Number (Double)',
info: 3.14159
}

# db.users.findOne({info :{$type :'string'}})

{
\_id: ObjectId('6a4d1e7ce61161578c4eeb86'),
name: 'String',
info: 'Hello MongoDB'
}

# db.users.findOne({info :{$type :'null'}})

{ \_id: ObjectId('6a4d1e7ce61161578c4eeb8a'), name: 'Null', info: null }

# db.users.findOne({info :{$type :'date'}})

{
\_id: ObjectId('6a4d1e7ce61161578c4eeb8d'),
name: 'Date',
info: ISODate('2026-07-07T10:30:00.000Z')
}

# db.users.findOne({info :{$type :'double'}})

{
\_id: ObjectId('6a4d1e7ce61161578c4eeb87'),
name: 'Number (Double)',
info: 3.14159
}

# db.users.findOne({info :{$type :'bool'}})

{
\_id: ObjectId('6a4d1e7ce61161578c4eeb89'),
name: 'Boolean',
info: true
}
