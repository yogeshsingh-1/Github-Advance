# MongoDB Query and Projection Operators

MongoDB provides a rich set of operators to filter documents (query operators) and control which fields are returned (projection operators).

find(filter, options)


## Query Operators

### Comparison

| Operator       | Meaning                    | Example                            |
| -------------- | -------------------------- | ---------------------------------- |
| `$eq`          | Equal to                   | `{ age: { $eq: 25 } }`             |
| `$ne`          | Not equal to               | `{ age: { $ne: 25 } }`             |
| `$gt` / `$gte` | Greater than / or equal    | `{ age: { $gt: 18 } }`             |
| `$lt` / `$lte` | Less than / or equal       | `{ age: { $lte: 65 } }`            |
| `$in`          | Matches any value in array | `{ status: { $in: ["A", "D"] } }`  |
| `$nin`         | Matches none in array      | `{ status: { $nin: ["A", "D"] } }` |

### Logical

| Operator | Meaning                     | Example                                             |
| -------- | --------------------------- | --------------------------------------------------- |
| `$and`   | All conditions true         | `{ $and: [{ age: { $gt: 18 } }, { status: "A" }] }` |
| `$or`    | Any condition true          | `{ $or: [{ status: "A" }, { qty: { $lt: 30 } }] }`  |
| `$not`   | Negates condition           | `{ age: { $not: { $gt: 18 } } }`                    |
| `$nor`   | None of the conditions true | `{ $nor: [{ status: "A" }, { qty: { $lt: 30 } }] }` |

### Element

| Operator  | Meaning                          | Example                        |
| --------- | -------------------------------- | ------------------------------ |
| `$exists` | Field exists (or not)            | `{ email: { $exists: true } }` |
| `$type`   | Field is of a specific BSON type | `{ age: { $type: "int" } }`    |

### Evaluation

| Operator | Meaning                              | Example                                     |
| -------- | ------------------------------------ | ------------------------------------------- |
| `$regex` | Pattern match                        | `{ name: { $regex: /^A/ } }`                |
| `$expr`  | Use aggregation expressions in query | `{ $expr: { $gt: ["$spent", "$budget"] } }` |
| `$mod`   | Modulo match                         | `{ qty: { $mod: [4, 0] } }`                 |
| `$text`  | Text search                          | `{ $text: { $search: "coffee" } }`          |
| `$where` | JS expression (rarely used, slow)    | —                                           |

### Array

| Operator     | Meaning                                           | Example                                            |
| ------------ | ------------------------------------------------- | -------------------------------------------------- |
| `$all`       | Array contains all specified values               | `{ tags: { $all: ["red", "blank"] } }`             |
| `$elemMatch` | At least one array element matches all conditions | `{ scores: { $elemMatch: { $gt: 80, $lt: 90 } } }` |
| `$size`      | Array has exact length                            | `{ tags: { $size: 3 } }`                           |

### Bitwise

`$bitsAllSet`, `$bitsAnySet`, `$bitsAllClear`, `$bitsAnyClear` — used for bitmask matching.

---

## Projection Operators

Projection controls which fields are returned in the result document — used as the second argument to `find()`.

### Inclusion / Exclusion

```javascript
db.users.find({}, { name: 1, email: 1 }); // only name, email, and _id
db.users.find({}, { password: 0 }); // everything except password
db.users.find({}, { _id: 0, name: 1 }); // exclude _id explicitly
```

You can't mix inclusion and exclusion (except for `_id`, which can always be excluded).

### Projection Operators Table

| Operator     | Purpose                                          | Example                                                                            |
| ------------ | ------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `$`          | Returns first matching array element             | `{ "grades.$": 1 }` after querying on `grades`                                     |
| `$elemMatch` | Returns first array element matching a condition | `{ scores: { $elemMatch: { subject: "Math" } } }`                                  |
| `$slice`     | Limits number of array elements returned         | `{ comments: { $slice: 5 } }` or `{ comments: { $slice: [10, 5] } }` (skip, limit) |
| `$meta`      | Returns metadata (e.g., text search score)       | `{ score: { $meta: "textScore" } }`                                                |

---

## Quick Example Combining Both

```javascript
db.orders.find(
  {
    status: "A",
    $or: [{ qty: { $gt: 20 } }, { price: { $lt: 100 } }],
  },
  {
    item: 1,
    qty: 1,
    "items.$": 1,
    _id: 0,
  },
);
```
