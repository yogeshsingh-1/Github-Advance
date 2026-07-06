# Database: Collections ka container.

Definition:
A database is a container that stores and organizes multiple collections. It is the highest level of data organization in MongoDB.

# Collection: Similar type ke documents ka group (SQL Table jaisa).

Definition:
A collection is a group of related documents stored within a database. It is similar to a table in a relational database, but it does not require a fixed schema.

# Document: JSON/BSON format me ek individual record (SQL Row jaisa).

Definition:
A document is a single record in a collection. It stores data in BSON (Binary JSON) format as key-value pairs.

# What is BSON?

In MongoDB, data is stored internally in BSON (Binary JSON) format.

BSON (Binary JSON) is a binary-encoded serialization format used by MongoDB to store documents. It extends JSON by supporting additional data types and enabling efficient storage and faster data processing.

You write it in JSON (or JSON-like syntax), but MongoDB stores it internally as BSON.

# Kya database banane ke liye minimum ek collection/document chahiye?
A database can exist only after at least one collection containing a document is created.
A document must always belong to a collection.
MongoDB automatically creates the database and collection when the first document is inserted.
