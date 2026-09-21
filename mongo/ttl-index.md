# MongoDB TTL Index

## 1. What is TTL Index?

**TTL = Time To Live**

MongoDB ka **TTL Index** automatically documents ko delete karta hai jab unka specified time expire ho jata hai.

TTL Index ka common use:

* OTP
* Session data
* Temporary tokens
* Cache data
* Logs
* Temporary verification records

---

# 2. Basic Example

Suppose hamare paas `Otp` collection hai:

```js
{
  email: "abc@gmail.com",
  code: "123456",
  createdAt: new Date()
}
```

Agar hume OTP ko **10 minutes** ke baad automatically delete karna hai:

```js
db.Otp.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 600 }
)
```

### Meaning

```text
createdAt
   ↓
Document creation time

expireAfterSeconds: 600
   ↓
600 seconds = 10 minutes

After expiration
   ↓
MongoDB automatically deletes document
```

---

# 3. Complete Example

### Step 1: Insert document

```js
db.Otp.insertOne({
  email: "abc@gmail.com",
  code: "123456",
  createdAt: new Date()
})
```

### Step 2: Create TTL Index

```js
db.Otp.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 600 }
)
```

Now MongoDB automatically removes documents approximately **600 seconds after `createdAt`**.

---

# 4. Why `1` in `{ createdAt: 1 }`?

```js
{ createdAt: 1 }
```

Here:

```text
1  → Ascending index
-1 → Descending index
```

For a TTL index, the important part is that the field is indexed. The ascending direction is commonly used.

---

# 5. TTL with `expiresAt`

Instead of calculating expiration using `createdAt + expireAfterSeconds`, we can store the exact expiration time.

Example:

```js
{
  email: "abc@gmail.com",
  code: "123456",
  expiresAt: new Date(Date.now() + 10 * 60 * 1000)
}
```

Create TTL index:

```js
db.Otp.createIndex(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
)
```

### Meaning

MongoDB checks:

```text
expiresAt
    ↓
Current time
    ↓
If expiresAt <= current time
    ↓
Document becomes expired
    ↓
MongoDB deletes it
```

This is useful when every document can have a different expiration time.

---

# 6. `expireAfterSeconds`

There are two common approaches.

## Approach 1: Fixed expiration time

```js
db.Otp.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 600 }
)
```

Every document expires:

```text
createdAt + 600 seconds
```

Example:

```text
createdAt = 10:00:00
TTL       = 600 seconds

Expires approximately at:
10:10:00
```

---

## Approach 2: Exact expiration time

Store:

```js
{
  expiresAt: 10:10:00
}
```

Then:

```js
db.Otp.createIndex(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
)
```

Now each document can have its own expiration time.

---

# 7. Mongoose Example

Schema:

```ts
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },

  code: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600
  }
});

const Otp = mongoose.model("Otp", otpSchema);
```

Here:

```js
expires: 600
```

means:

```text
600 seconds
= 10 minutes
```

Mongoose creates the appropriate TTL index.

---

# 8. Mongoose `expires` Example

For 5 minutes:

```js
createdAt: {
  type: Date,
  default: Date.now,
  expires: 300
}
```

For 10 minutes:

```js
expires: 600
```

For 1 hour:

```js
expires: 3600
```

For 1 day:

```js
expires: 86400
```

---

# 9. Verify TTL Index

You can check indexes:

```js
db.Otp.getIndexes()
```

Example result:

```js
[
  {
    name: "_id_",
    key: {
      _id: 1
    }
  },
  {
    name: "createdAt_1",
    key: {
      createdAt: 1
    },
    expireAfterSeconds: 600
  }
]
```

---

# 10. Important Point: TTL Deletion Is Not Exact

TTL does **not** mean MongoDB deletes the document at the exact second.

For example:

```text
expiresAt = 10:10:00
```

MongoDB may remove it shortly after that time.

So TTL should be treated as:

```text
Automatic cleanup mechanism
```

not:

```text
Exact real-time timer
```

For security-sensitive logic such as OTP validation, **do not depend only on TTL deletion**.

Instead check expiration explicitly:

```js
const otp = await Otp.findOne({
  email,
  code
});

if (!otp) {
  throw new Error("Invalid OTP");
}

if (otp.expiresAt < new Date()) {
  throw new Error("OTP expired");
}
```

TTL can then clean up the expired document later.

---

# 11. TTL Index vs Normal Index

### Normal Index

```js
db.Otp.createIndex({
  email: 1
});
```

Purpose:

```text
Make searching faster
```

It does NOT delete documents.

---

### TTL Index

```js
db.Otp.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 600 }
);
```

Purpose:

```text
Automatically delete expired documents
```

---

# 12. TTL Index Flow

```text
              Insert Document
                    │
                    ▼
          ┌──────────────────┐
          │ createdAt         │
          │ 10:00:00          │
          └────────┬─────────┘
                   │
                   ▼
       expireAfterSeconds: 600
                   │
                   ▼
             10 minutes
                   │
                   ▼
          Document expires
                   │
                   ▼
        MongoDB TTL Monitor
                   │
                   ▼
          Document deleted
```

---

# 13. OTP Example

Suppose OTP is valid for 5 minutes.

Document:

```js
{
  email: "user@gmail.com",
  code: "123456",
  createdAt: new Date()
}
```

TTL index:

```js
db.Otp.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 300 }
)
```

Flow:

```text
User requests OTP
       ↓
Backend generates OTP
       ↓
OTP saved in MongoDB
       ↓
createdAt = current time
       ↓
5 minutes pass
       ↓
TTL expires
       ↓
MongoDB removes document
```

But during OTP verification:

```js
if (otp.createdAt.getTime() + 300000 < Date.now()) {
  // OTP expired
}
```

This gives immediate expiration behavior even if the TTL cleanup hasn't happened yet.

---

# 14. When Should You Use TTL?

Good use cases:

```text
OTP
Temporary verification token
Password reset token
Session documents
Temporary cache
Temporary logs
Temporary application data
```

Example:

```js
{
  token: "abc123",
  createdAt: new Date()
}
```

```js
db.ResetToken.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 900 }
)
```

This gives the token a 15-minute TTL.

---

# 15. Important Limitations

### 1. TTL works with Date fields

Example:

```js
createdAt: new Date()
```

Good.

---

### 2. TTL deletion is asynchronous

Document may remain for a short period after expiration.

Therefore:

```text
TTL ≠ exact timer
```

---

### 3. TTL Index is a single-field index

TTL indexes are based on a single indexed date field.

---

### 4. TTL does not replace expiration validation

For OTP/security logic:

```text
Application validation
        +
TTL cleanup
```

is a better design.

---

# 16. Quick Revision

### Fixed TTL

```js
db.Otp.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 600 }
)
```

Meaning:

```text
createdAt + 600 seconds
        ↓
Document automatically deleted
```

### Custom expiration time

```js
db.Otp.createIndex(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
)
```

Document:

```js
{
  expiresAt: new Date(Date.now() + 10 * 60 * 1000)
}
```

Meaning:

```text
expiresAt reached
      ↓
Document automatically deleted
```

---

# 17. One-Line Interview Answer

> **MongoDB TTL Index is a special index that automatically removes documents after a specified amount of time, commonly used for temporary data such as OTPs, sessions, tokens, and cache records.**

Example:

```js
db.Otp.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 600 }
)
```

**Remember:**

```text
Normal Index → Faster Search

TTL Index → Automatic Expiration + Deletion
```
