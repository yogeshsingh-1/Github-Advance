# MAC and HMAC

MAC -> Message Authentication Code
HMAC -> Hash-based Message Authentication Code

## 1. What is MAC?

**MAC** stands for **Message Authentication Code**.

A MAC is used to provide:

- **Message Integrity**: Detect whether the message was modified.
- **Message Authentication**: Verify that the sender knows the shared
  secret key.

Conceptually:

```text
Message + Secret Key → MAC
```

Example:

```text
Message = "Transfer ₹1000"
Secret  = "my-secret-key"

MAC = MAC(message, secret)
```

The sender sends:

```text
Message: "Transfer ₹1000"
MAC:     "abc123..."
```

The receiver has the same secret key and calculates the MAC again.

```text
MAC("Transfer ₹1000", "my-secret-key")
```

If both MAC values match:

```text
✅ Message is authentic
✅ Message was not modified
```

If someone changes the message:

```text
"Transfer ₹1000"
       ↓
"Transfer ₹9000"
```

the calculated MAC will be different:

```text
❌ Message was modified
```

---

## 2. What is HMAC?

**HMAC** stands for **Hash-based Message Authentication Code**.

HMAC is a specific type of MAC that uses a **cryptographic hash
function**.

Conceptually:

```text
HMAC = Hash + Secret Key + Message
```

More accurately:

```text
HMAC(key, message)
```

Common examples are:

```text
HMAC-SHA256
HMAC-SHA512
```

For example:

```text
Message = "hello"
Secret  = "12345"

HMAC-SHA256("12345", "hello")
        ↓
    HMAC value
```

---

## 3. MAC vs HMAC

---

MAC HMAC

---

General concept Specific type of MAC

Message Authentication Code Hash-based Message Authentication
Code

Can use different cryptographic Uses a cryptographic hash function
constructions

Examples include HMAC, CMAC, GMAC Examples include HMAC-SHA256 and
HMAC-SHA512

---

The relationship can be understood as:

```text
MAC
├── HMAC
├── CMAC
└── GMAC
```

---

## 4. HMAC is NOT Encryption

HMAC does **not** encrypt or hide the message.

For example:

```text
Message:
"Transfer ₹1000"

HMAC:
"a8f91c..."
```

The receiver can still see:

```text
"Transfer ₹1000"
```

The HMAC only helps verify:

```text
✅ Message was not modified
✅ Sender knows the secret key
```

For confidentiality, encryption is required.

```text
Encryption → Hides the message
HMAC       → Provides integrity + authentication
```

Modern systems often use **AEAD encryption**, such as:

```text
AES-GCM
ChaCha20-Poly1305
```

These provide encryption and authentication together.

---

## 5. HMAC in JWT

This is especially important for JWT.

When a JWT uses:

```text
HS256
```

it means:

```text
HMAC + SHA-256
```

Conceptually:

```text
JWT Header + "." + JWT Payload
              ↓
        HMAC-SHA256
              ↓
          Signature
```

So:

```text
HS256 = HMAC using SHA-256 with a shared secret key
```

For example:

```text
jwt.sign(payload, secret, { algorithm: "HS256" })
```

The same secret is required to verify the JWT:

```text
jwt.verify(token, secret)
```

---

## 6. Simple Real-World Example

Suppose a client sends:

```text
Amount = ₹1000
```

The client and server share a secret:

```text
Secret = "my-super-secret"
```

The client creates:

```text
HMAC-SHA256(secret, "Amount=1000")
```

and sends:

```text
Amount=1000
HMAC=a8f91c...
```

An attacker changes the amount:

```text
Amount=9000
```

but cannot generate the correct HMAC without knowing the secret key.

The server calculates the HMAC itself and compares it with the received
value.

```text
Received HMAC
      ==
Calculated HMAC
      ↓
    Valid
```

Otherwise:

```text
Received HMAC
      !=
Calculated HMAC
      ↓
   Invalid
```

---

## 7. Key Point to Remember

The easiest way to remember it:

```text
MAC
↓
Message Authentication Code
↓
General concept for authenticating a message

HMAC
↓
Hash-based Message Authentication Code
↓
MAC built using a cryptographic hash function
```

And:

```text
HMAC-SHA256
      ↓
HMAC
      ↓
Uses SHA-256
      ↓
Requires a secret key
      ↓
Provides integrity + authentication
```

### One-line definition

> **HMAC is a hash-based Message Authentication Code that uses a secret
> key and a cryptographic hash function to verify message integrity and
> authenticity.**
