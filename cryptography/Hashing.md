# Hashing & Node.js Crypto — Deep Revision Notes

> **Purpose:** Quick revision of hashing, cryptographic hashes, password hashing, file integrity, HMAC, salts, peppers, and Node.js `crypto`.
>
> **Core rule:** Hashing is generally **one-way**. Encryption is **reversible** with a key.

---

# 1. Hashing — Core Concept

## What is Hashing?

Hashing is the process of converting input data of arbitrary size into a fixed-size value called a **hash** or **digest**.

```text
Input
  ↓
Hash Function
  ↓
Fixed-size Digest
```

Example:

```text
"hello"
   ↓ SHA-256
2cf24dba5fb0a30e...
```

The same input should produce the same hash:

```text
hash("hello") === hash("hello")
```

But:

```text
hash("hello") !== hash("Hello")
```

Hashing is highly sensitive to input changes.

password ke liye simple SHA-256 use nahi karte. Salt + password-specific hashing algorithms jaise Argon2id, scrypt, bcrypt, ya PBKDF2 use karte hain.

Hash/Digest se data ko decrypt karke original form mein nahi la sakte. Original data verify karne ke liye same input ko dobara hash karke digest compare karte hain.

---

# 2. Hashing vs Encryption vs Encoding

| Concept    | Reversible? | Key required? | Main Purpose            |
| ---------- | ----------: | ------------: | ----------------------- |
| Hashing    |         No* |            No | Integrity, fingerprints |
| Encryption |         Yes |           Yes | Confidentiality         |
| Encoding   |         Yes |            No | Data representation     |

`*` A cryptographic hash is designed to be computationally infeasible to reverse, but weak hashes can sometimes be attacked using dictionaries, brute force, rainbow tables, etc.

### Example

```text
Password
   ↓
Hashing
   ↓
Stored password hash
```

You don't decrypt a password hash.

Instead:

```text
Login password
     ↓
Hash
     ↓
Compare with stored hash
```

---

# 3. Important Properties of Cryptographic Hash Functions

A secure cryptographic hash should provide:

## 3.1 Deterministic

Same input → same output.

```text
SHA256("hello")
=
SHA256("hello")
```

---

## 3.2 Fixed-Length Output

Different input sizes can produce the same digest length.

```text
"Hi"
"Very large data..."
"1000000 characters..."
```

All can produce a fixed-size SHA-256 digest.

```text
SHA-256 → 256 bits → 32 bytes
```

---

## 3.3 Avalanche Effect

A tiny input change should produce a drastically different output.

```text
hello
 ↓
hash A

Hello
 ↓
hash B
```

The hashes should look completely unrelated.

---

## 3.4 Preimage Resistance

Given:

```text
hash = H(x)
```

It should be computationally infeasible to find `x`.

---

## 3.5 Second-Preimage Resistance

Given:

```text
H(x)
```

It should be difficult to find another:

```text
y != x
```

such that:

```text
H(y) = H(x)
```

---

## 3.6 Collision Resistance

It should be difficult to find:

```text
x != y
```

where:

```text
H(x) = H(y)
```

Important:

> Collisions mathematically exist because the input space is larger than the output space. The goal is making them computationally infeasible to find.

---

# 4. Hash Output Sizes

## MD5

```text
128 bits
16 bytes
32 hexadecimal characters
```

MD5 is **cryptographically broken**.

Do not use it for security-sensitive hashing.

Possible legitimate uses include non-security checksums where collision attacks do not matter.

---

## SHA-1

```text
160 bits
20 bytes
40 hexadecimal characters
```

SHA-1 is also considered broken for collision resistance.

Do not use it for new security-sensitive systems.

---

## SHA-256

```text
256 bits
32 bytes
64 hexadecimal characters
```

Common modern cryptographic hash.

Good general-purpose choice for:

* File integrity
* Checksums
* Content fingerprints
* Cryptographic protocols
* Data integrity

---

## SHA-512

```text
512 bits
64 bytes
128 hexadecimal characters
```

Larger digest than SHA-256.

---

# 5. Node.js `crypto` Module

Node.js provides cryptographic functionality through:

```js
import crypto from "node:crypto";
```

or:

```js
const crypto = require("node:crypto");
```

---

# 6. Creating a Hash

```js
import crypto from "node:crypto";

const hash = crypto
    .createHash("sha256")
    .update("hello")
    .digest("hex");

console.log(hash);
```

Flow:

```text
createHash()
      ↓
update()
      ↓
digest()
```

---

# 7. `createHash()`

```js
crypto.createHash("sha256");
```

Creates a hash object using the selected algorithm.

Example:

```js
const hash = crypto.createHash("sha256");
```

---

# 8. `update()`

```js
hash.update("hello");
```

Provides data to the hash.

You can update multiple times:

```js
hash.update("hello");
hash.update(" ");
hash.update("world");
```

Conceptually:

```text
hash("hello" + " " + "world")
```

---

# 9. `digest()`

```js
hash.digest("hex");
```

Finalizes the hash and returns the digest.

Common formats:

```js
.digest("hex")
.digest("base64")
.digest()
```

Example:

```js
const result = crypto
    .createHash("sha256")
    .update("hello")
    .digest("hex");
```

---

# 10. Hex vs Base64

The underlying digest is binary data.

You can represent it differently.

```js
.digest("hex")
```

Example:

```text
2cf24dba5fb0a30e...
```

Or:

```js
.digest("base64")
```

Example:

```text
LPQ...
```

The representation changes.

The underlying digest does not.

---

# 11. Hashing a File

Hashing is useful for checking whether a file changed.

Concept:

```text
Original File
     ↓
SHA-256
     ↓
Hash A

Later:
File
 ↓
SHA-256
 ↓
Hash B
```

If:

```text
Hash A === Hash B
```

the file contents are unchanged with respect to that hash.

If:

```text
Hash A !== Hash B
```

the contents differ.

This is called a **checksum / integrity check**.

---

# 12. Password Hashing

## NEVER do this for passwords

```js
crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
```

Why?

Because SHA-256 is designed to be fast.

Attackers can attempt enormous numbers of guesses.

For passwords, we want hashing algorithms that are intentionally:

* Slow
* Memory-hard where possible
* Configurable
* Resistant to brute-force attacks

---

# 13. Password Hashing Algorithms

Preferred modern choices:

```text
Argon2id
scrypt
bcrypt
PBKDF2
```

### General preference

```text
Argon2id
   ↓
scrypt
   ↓
bcrypt / PBKDF2
```

Exact choice depends on your platform, requirements, libraries, and operational constraints.

---

# 14. Why Salt?

A salt is a unique random value added to a password before password hashing.

Conceptually:

```text
password + salt
      ↓
Password Hash Function
      ↓
stored hash
```

Example:

```text
password = "hello123"

salt = random value

password + salt
       ↓
Argon2id
       ↓
hash
```

Every password should have a unique salt.

---

# 15. Why Salt Prevents Rainbow-Table Attacks

Without salt:

```text
password
   ↓
hash
```

Same password:

```text
"hello123"
```

produces the same hash.

With unique salts:

```text
hello123 + saltA → hashA

hello123 + saltB → hashB
```

Therefore identical passwords don't have identical stored hashes.

---

# 16. Salt Does NOT Need to Be Secret

A salt can normally be stored alongside the password hash.

Example:

```text
user
password_hash
salt
```

Or the password-hashing algorithm may encode the salt and parameters directly into the resulting stored string.

Important distinction:

```text
Salt     → public
Pepper   → secret
Password → secret
```

---

# 17. Pepper

A pepper is an additional secret value used during password hashing.

Unlike salt:

```text
Salt
→ stored with password hash

Pepper
→ kept secret outside the database
```

Concept:

```text
password + salt + pepper
          ↓
      Argon2id
          ↓
        hash
```

A pepper can provide an additional defense if the database is compromised, but it introduces key-management requirements.

---

# 18. Password Verification

You don't decrypt the password.

Instead:

```text
User enters password
        ↓
Password hashing algorithm
        ↓
Compare with stored verifier
        ↓
Match?
   ↙         ↘
 YES         NO
```

With modern password-hashing libraries, use their dedicated verification function rather than manually reconstructing the process.

---

# 19. HMAC

HMAC means:

```text
Hash-based Message Authentication Code
```

It combines:

```text
Hash Function
+
Secret Key
+
Message
```

Concept:

```text
Message + Secret Key
        ↓
       HMAC
        ↓
 Authentication Tag
```

Example:

```js
const hmac = crypto
    .createHmac("sha256", secret)
    .update("hello")
    .digest("hex");
```

---

# 20. Hash vs HMAC

### Hash

```text
SHA256(message)
```

No secret key.

Used for things like:

* Integrity fingerprints
* Checksums
* Content identifiers

### HMAC

```text
HMAC(secret, message)
```

Uses a secret key.

Used for:

* Authenticating messages
* API signatures
* Webhook verification
* Signed requests

---

# 21. Random Values

Node.js:

```js
crypto.randomBytes(32);
```

Useful for generating:

* Salts
* Tokens
* Secrets
* Nonces
* Random identifiers

Example:

```js
const token = crypto.randomBytes(32).toString("hex");
```

Important:

> Security-sensitive randomness should come from a cryptographically secure random number generator.

Do NOT use:

```js
Math.random()
```

for security-sensitive tokens.

---

# 22. `randomUUID()`

Node.js also provides:

```js
crypto.randomUUID();
```

Example:

```js
const id = crypto.randomUUID();

console.log(id);
```

Useful for generating UUID-style identifiers.

---

# 23. Hashing vs Password Hashing

This distinction is extremely important.

### General cryptographic hashing

```text
SHA-256
SHA-512
```

Designed to be fast.

Use for:

```text
File integrity
Checksums
Fingerprints
Cryptographic protocols
```

### Password hashing

```text
Argon2id
scrypt
bcrypt
PBKDF2
```

Designed to be computationally expensive.

Use for:

```text
Password storage
```

---

# 24. Common Mistakes

## Mistake 1

Using MD5 for passwords.

```js
MD5(password)
```

❌ Don't.

---

## Mistake 2

Using SHA-256 directly for passwords.

```js
SHA256(password)
```

❌ Not recommended for password storage.

---

## Mistake 3

Using the same salt for every user.

```text
salt = "12345"
```

❌ Bad design.

Generate a unique random salt per password.

---

## Mistake 4

Using `Math.random()` for security tokens.

```js
Math.random()
```

❌ Not cryptographically secure.

---

## Mistake 5

Thinking hashing provides confidentiality.

Hashing does not hide data in the way encryption does.

---

## Mistake 6

Trying to decrypt a password hash.

There is nothing to decrypt.

You verify the password against the stored password verifier.

---

# 25. Node.js Crypto API Cheat Sheet

```js
import crypto from "node:crypto";
```

### Hash

```js
crypto.createHash("sha256")
```

### HMAC

```js
crypto.createHmac("sha256", secret)
```

### Random bytes

```js
crypto.randomBytes(32)
```

### UUID

```js
crypto.randomUUID()
```

### Encryption

```js
crypto.createCipheriv(...)
```

### Decryption

```js
crypto.createDecipheriv(...)
```

### Password-related KDF

```js
crypto.scrypt(...)
crypto.pbkdf2(...)
```

---

# 26. Interview Questions

## Q1. What is hashing?

A one-way transformation that maps arbitrary input to a fixed-size digest.

---

## Q2. Is hashing encryption?

No.

Hashing is generally one-way.

Encryption is designed to be reversible using a key.

---

## Q3. Can two inputs have the same hash?

Yes.

This is called a collision.

A secure cryptographic hash makes finding useful collisions computationally infeasible.

---

## Q4. Why shouldn't SHA-256 be used directly for passwords?

Because it is intentionally fast, which helps attackers perform huge numbers of password guesses.

---

## Q5. Why do we use salt?

To ensure identical passwords produce different password hashes and to make precomputed attacks such as rainbow tables much less useful.

---

## Q6. Does salt need to be secret?

No.

The salt normally can be stored with the password verifier.

---

## Q7. What is a pepper?

A secret additional value used in password protection and kept outside the password database.

---

## Q8. What is HMAC?

A keyed construction that uses a cryptographic hash and secret key to authenticate data.

---

## Q9. What is a ?

A value derived from data that can be used to detect accidental or intentional changes, depending on the checksum algorithm.

Not every checksum is cryptographically secure.

---

# 27. Mental Model

Remember this:

```text
                CRYPTOGRAPHY
                     |
        +------------+------------+
        |            |            |
      Hashing     Encryption    Signing
        |
   +----+----+
   |         |
 General   Password
 Hashing   Hashing
   |         |
 SHA-256   Argon2id
 SHA-512   scrypt
           bcrypt
           PBKDF2
```

And:

```text
Hash
 ↓
Integrity / Fingerprint

HMAC
 ↓
Integrity + Authentication

Encryption
 ↓
Confidentiality

Password Hashing
 ↓
Secure Password Storage
```

---

# 28. Revision Rule

When revising hashing, don't memorize APIs first.

Remember this order:

```text
1. What problem are we solving?
2. Hashing or encryption?
3. General hash or password hash?
4. Do we need a secret key?
5. Do we need salt?
6. Do we need HMAC?
7. Which algorithm is appropriate?
8. How does Node.js implement it?
```

Then remember:

```text
createHash()
     ↓
update()
     ↓
digest()
```

---

# 29. 30-Second Revision

### Hashing

```text
Input → Hash Function → Digest
```

### Properties

```text
Deterministic
Fixed output
Avalanche effect
Preimage resistance
Collision resistance
```

### General Hashes

```text
SHA-256
SHA-512
```

### Password Hashing

```text
Argon2id
scrypt
bcrypt
PBKDF2
```

### Password Protection

```text
Password
   +
Unique Salt
   +
Optional Pepper
   ↓
Password Hashing Function
   ↓
Stored Password Verifier
```

### HMAC

```text
Message + Secret Key
        ↓
       HMAC
```

### Node.js

```js
crypto.createHash()
crypto.createHmac()
crypto.randomBytes()
crypto.randomUUID()
crypto.scrypt()
crypto.pbkdf2()
```

---

# 30. Production Rules

Keep these rules burned into your brain:

```text
❌ MD5 for security
❌ SHA-1 for new security-sensitive systems
❌ SHA-256 directly for passwords
❌ Math.random() for secrets
❌ Same salt for every password
❌ Hardcoded secrets
❌ Rolling your own password hashing scheme

✅ Use established cryptographic algorithms
✅ Use CSPRNG for security-sensitive randomness
✅ Use unique salts for password hashing
✅ Use Argon2id/scrypt/bcrypt/PBKDF2 appropriately
✅ Keep secrets in proper secret-management infrastructure
✅ Use HMAC when a shared secret is required for authentication
```

---

# 31. Final Mental Model

```text
                 DATA
                   |
          +--------+--------+
          |                 |
       Need to            Need to
       verify             hide?
       changes?              |
          |              Encryption
       Hashing
          |
     +----+-------+
     |            |
 General       Password
 Hashing       Storage
     |            |
 SHA-256      Argon2id
 SHA-512      scrypt
              bcrypt
              PBKDF2

If authentication with a shared secret is required:

        Message + Secret
               ↓
              HMAC
```

## One-line memory trick

> **Hash for fingerprints, password hashing for passwords, HMAC for keyed authentication, encryption for secrecy.**
