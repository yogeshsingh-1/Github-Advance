<!-- Can we create a schema in MongoDB? -->

MongoDB by default schema-less hai, lekin hum JSON Schema Validation ke through collection-level schema enforce kar sakte hain. Agar Node.js use kar rahe hain, to Mongoose ke Schema feature se bhi schema aur validation define ki ja sakti hai.

<!-- In postgres Sql -->

Server
│
├── Database1
│       ├── public (Schema)
│       ├── tenant1 (Schema)
│       ├── tenant2 (Schema)
│       └── sales (Schema)
│
└── Database2
    ├── public
    └── hr

Yahan Schema ek namespace hota hai.

Ek hi database ke andar multiple schemas bana sakte ho.

<!-- In MongoDB -->
MongoDB Server
│
├── Database1
│     ├── users (Collection)
│     ├── orders
│     └── products
│
└── Database2
      ├── users
      └── employees

Yahan Schema naam ki koi namespace layer nahi hoti.

Sirf:

Server
Database
Collection
Document

# Note:-
PostgreSQL ka "Schema" = Namespace (database object container).
MongoDB ka "Schema" = Document structure/validation (optional).