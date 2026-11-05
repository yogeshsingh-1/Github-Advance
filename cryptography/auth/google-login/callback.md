# Locking in DB (Optimistic and Premesting locking)

DB Locking ke andar do important concepts hain:

1. Pessimistic Locking
2. Optimistic LockingD

# Acid

# Deadlocking

Deadlocking (Deadlock) is a situation in a database where two or more transactions are waiting for each other to release locks, and none of them can proceed.

In simple words:

Transaction 1 is waiting for Transaction 2, and Transaction 2 is waiting for Transaction 1.

This creates an infinite waiting situation unless the database intervenes.

# Racecondition

# Blocking

Database mein Blocking ka matlab hai: Jab ek transaction kisi row ya resource par lock laga deti hai, aur doosri transaction ko usi resource par kaam karne ke liye rukna padta hai, toh ise Blocking kehte hain.

Blocking means stopping or preventing something from proceeding until a particular task or condition is completed.

In programming, especially in Node.js, blocking usually means that one operation prevents the execution of subsequent operations until it finishes.

Bhai, Blocking in Database (DB) means one database operation prevents another operation from proceeding because it is waiting for a resource, lock, or transaction to be released.

Database blocking occurs when one transaction has acquired a lock on a database resource, and another transaction needs a conflicting lock on the same resource, causing it to wait until the lock is released.

In databases like PostgreSQL and MySQL, blocking commonly happens because of locks.

Ek transaction ki wajah se doosri transaction ka ruk jaana (wait karna).

# Blocking vs Deadlock

• Blocking: A one-way or chain queue where Process B waits for Process A to finish and release a resource. It is normal in small amounts.

• Deadlock: A circular dependency where Process A holds a resource needed by Process B, while Process B holds a resource needed by Process A. The database engine must intervene and terminate (rollback) one of the processes as a "victim".

# Normalization

# Indexes

# Connection Pooling

Connection Pool ek aisi jagah (collection) hai jahan hum reusable database connections ko store aur maintain karte hain, taaki har database request ke liye humein naya connection create na karna pade.

Connection pooling ek technique jisme hum kuch resuable DataBase connections ko open karte hai . aur ye resuable connection ko hum connection pool kahte hai.
taki every database request not create a new connection for multiple request.
Jab bhi tumhara Node.js application database se communicate karta hai, toh usko ek connection chahiye hota hai.

Har request par naya connection create karna expensive hota hai.

Isliye hum kuch database connections pehle se create karke rakhte hain aur unhe baar-baar reuse karte hain.

This collection of reusable connections is called a Connection Pool.

- Step-by-step working

1. Application start hone par kuch database connections create kiye jaate hain.
2. Ye connections Connection Pool mein store rehte hain.
3. Jab koi request database query execute karna chahti hai, toh pool se available connection leti hai.
4. Query execute hone ke baad connection close nahi hota, balki wapas pool mein release ho jata hai.
5. Next request usi connection ko reuse kar sakti hai.

Connection Pooling is a technique in which we create and maintain a group of reusable database connections instead of creating a new connection for every database request.
so that multiple database requests can reuse these connections instead of creating a new connection every time.

- Without connection pooling
  Problems:

1. Every request requires a new connection.
2. Creating connections takes time.
3. Database consumes more resources.
4. Too many connections can overload the database.
5. Connection creation and destruction add overhead.

- With Connection Pooling
  Now suppose we maintain a pool of 3 connections.

When 5 API requests arrive:

- First 3 requests get 3 available connections.
- Remaining 2 requests wait.
- When one request finishes, its connection returns to the pool.
- A waiting request gets that available connection.

# How does Connection Pooling work?

Let's understand its lifecycle.

1. Create connections

   Application starts and creates a pool with a configured number of database connections.

2. Acquire connection

   When an API needs database access, it requests a connection from the pool.

3. Execute query

   The application executes its SQL query using the acquired connection.

4. Release connection

   After query execution, the connection is returned to the pool.

5. Reuse connection
   Another API request can use the same connection.
   
   Important: Releasing a connection does not mean closing the database connection. It means returning it to the pool for reuse.
