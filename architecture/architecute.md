# One-Tier, Two-Tier & Three-Tier Architecture (Simple Explanation)

Think of an application like ordering food from a restaurant.

---

# 1-Tier Architecture

In **1-Tier Architecture**, everything is in one place.

- User Interface (UI)
- Business Logic
- Database

All are inside the same application on the same computer.

## Diagram

```text
+----------------------------+
|        One Computer        |
|                            |
|  User Interface (UI)       |
|          │                 |
|  Business Logic            |
|          │                 |
|  Database                  |
+----------------------------+
```

## Flow

```text
User
  │
  ▼
Application
  │
  ▼
Database
```

## Example

A calculator application.

- You open Calculator.
- You enter `5 + 10`.
- The calculation happens inside the same application.
- No internet or server is required.

Another example:

- SQLite Desktop Application
- Microsoft Access

## Advantages

- Very simple
- Fast
- Easy to build

## Disadvantages

- Cannot handle many users
- Poor security
- Hard to scale

---

# 2-Tier Architecture (Client-Server)

Here, the application and database are on different computers.

The client talks directly to the database.

## Diagram

```text
+--------------------+      +------------------+
| Client Application | ---> | Database Server  |
+--------------------+      +------------------+
```

## Flow

```text
User
  │
  ▼
Desktop Application
  │
SQL Query
  │
  ▼
Database
```

## Real Example

Suppose a school has a desktop software.

When you click **Student List**:

```text
Desktop App
      │
      ▼
SELECT * FROM Students;
      │
      ▼
Database
```

The desktop application directly asks the database.

## Advantages

- Data stored in one place
- Multiple users can connect

## Disadvantages

- Client must know database details
- Less secure
- Business logic is on every client

---

# 3-Tier Architecture

This is used by almost all modern web applications.

Instead of talking directly to the database, the client talks to a backend server.

## Diagram

```text
+-----------+
|  Browser  |
+-----------+
      │
 HTTP Request
      │
      ▼
+-----------+
|  Backend  |
| Node/Spring|
+-----------+
      │
 SQL Query
      │
      ▼
+-----------+
| Database  |
+-----------+
```

## Flow

```text
User
   │
   ▼
Frontend
   │
HTTP Request
   ▼
Backend
   │
SQL Query
   ▼
Database
```

---

# Simple Example (Instagram Login)

## Step 1

User enters

```text
Username
Password
```

↓

## Step 2

Frontend sends request

```text
Login Request
```

↓

## Step 3

Backend checks

- Is username correct?
- Is password correct?

↓

## Step 4

Backend asks Database

```text
SELECT * FROM Users
WHERE username='abc';
```

↓

## Step 5

Database returns data.

↓

## Step 6

Backend sends response.

↓

## Step 7

Frontend shows

```text
Login Successful
```

---

# Restaurant Example 🍕

## 1-Tier

You cook food yourself.

```text
You
 │
 ▼
Kitchen
```

Everything is with you.

---

## 2-Tier

You directly ask the chef.

```text
You
 │
 ▼
Chef
```

No waiter.

---

## 3-Tier

You talk to the waiter.

The waiter talks to the chef.

The chef prepares food.

The waiter brings it back.

```text
Customer
    │
    ▼
 Waiter
    │
    ▼
 Chef
```

Here,

- Customer = Frontend
- Waiter = Backend
- Chef = Database

---

# Comparison

| 1-Tier                        | 2-Tier                            | 3-Tier                                             |
| ----------------------------- | --------------------------------- | -------------------------------------------------- |
| Everything in one application | Client directly talks to Database | Client talks to Backend, Backend talks to Database |
| Small applications            | Desktop applications              | Modern web applications                            |
| Easy                          | Medium                            | Best                                               |

---

# Which One Do We Use?

If you're building a **React + Node.js + PostgreSQL** application:

```text
React (Frontend)
       │
       ▼
Node.js (Backend)
       │
       ▼
PostgreSQL (Database)
```

This is **3-Tier Architecture**, and it is the standard architecture for modern web applications.
