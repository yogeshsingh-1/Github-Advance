# OAuth 1.0 vs OAuth 2.0

## 1. First Understand the Problem

Suppose we have:

* `MyApp` → our application
* `Google` → resource provider
* `User` → owner of the Google data

We want:

```text
MyApp → Google User Data
```

But we don't want:

```text
MyApp → User's Google Password ❌
```

OAuth solves this problem.

> **OAuth allows an application to access a user's resources without sharing the user's password.**

---

# 2. What is OAuth?

OAuth stands for **Open Authorization**.

The basic idea is:

```text
User
  ↓
Gives permission
  ↓
Application
  ↓
Gets a token
  ↓
Uses token to access allowed resources
```

For example:

```text
User
  ↓
"Allow MyApp to access my Google Drive"
  ↓
Google
  ↓
Access Token
  ↓
MyApp
  ↓
Google Drive API
```

The application gets a **token**, not the user's password.

---

# 3. Why Did We Need OAuth 1.0?

Before OAuth, applications sometimes needed users to give their username/password to third-party applications.

Example:

```text
MyApp
  ↓
"Give me your Google username/password"
  ↓
User
```

This is dangerous.

OAuth 1.0 introduced a better approach:

```text
MyApp
  ↓
Request permission
  ↓
User
  ↓
Approve
  ↓
OAuth Token
  ↓
MyApp accesses resource
```

So OAuth 1.0 solved the password-sharing problem.

---

# 4. OAuth 1.0 Main Components

OAuth 1.0 has four important parties:

### 1. Resource Owner

Usually the user.

```text
User
```

The user owns the data.

---

### 2. Client

The application requesting access.

```text
MyApp
```

---

### 3. Service Provider

The application that owns the data.

For example:

```text
Google
Twitter
```

---

### 4. Protected Resource

The actual data/API we want to access.

Example:

```text
Google Drive files
User profile
Photos
```

---

# 5. OAuth 1.0 Basic Flow

The OAuth 1.0 flow looks roughly like this:

```text
                OAuth 1.0

User
 │
 │ uses MyApp
 ↓
MyApp
 │
 │ Request Token
 ↓
Provider
 │
 │ Request Token
 ↓
MyApp
 │
 │ Send user to authorization
 ↓
User
 │
 │ Login + Allow
 ↓
Provider
 │
 │ Verifier
 ↓
MyApp
 │
 │ Request Access Token
 ↓
Provider
 │
 │ Access Token + Secret
 ↓
MyApp
 │
 │ API Request + Signature
 ↓
Protected Resource
```

---

# 6. OAuth 1.0 Important Thing: Signature

This is one of the biggest differences.

OAuth 1.0 does not simply send:

```http
Authorization: Bearer TOKEN
```

Instead, requests are cryptographically signed.

Conceptually:

```text
Request
+
Consumer Secret
+
Token Secret
+
Timestamp
+
Nonce
        ↓
Signature
```

The server verifies the signature.

Example:

```http
Authorization: OAuth
    oauth_consumer_key="abc",
    oauth_token="xyz",
    oauth_signature="generated-signature",
    oauth_timestamp="...",
    oauth_nonce="..."
```

The exact format depends on the OAuth 1.0 specification.

---

# 7. Why Was OAuth 1.0 Complicated?

Because developers had to correctly handle:

* Signature generation
* Signature verification
* Timestamp
* Nonce
* Consumer secret
* Token secret
* Request normalization
* HMAC signing

Even a small implementation mistake could cause authentication failures.

Example:

```text
Wrong parameter encoding
        ↓
Wrong signature
        ↓
Server rejects request
        ↓
401 Unauthorized
```

---

# 8. OAuth 2.0

OAuth 2.0 was designed as a **new authorization framework**.

It was not simply:

```text
OAuth 1.0 + small improvements
```

It introduced a different architecture.

The main goal was:

> Make authorization more flexible and easier to use across different types of applications.

---

# 9. OAuth 2.0 Basic Flow

The most important flow to understand is:

## Authorization Code Flow

```text
User
  ↓
MyApp
  ↓
Authorization Server
  ↓
User Login
  ↓
User clicks "Allow"
  ↓
Authorization Code
  ↓
MyApp Backend
  ↓
Access Token
  ↓
API
```

Let's understand this step by step.

---

# 10. Step 1 — User Opens MyApp

```text
User
  ↓
MyApp
```

The user wants to connect their Google account.

MyApp says:

```text
"Connect your Google account"
```

---

# 11. Step 2 — MyApp Redirects User

MyApp sends the user to the authorization server.

Example:

```text
https://provider.com/authorize
    ?client_id=123
    &redirect_uri=https://myapp.com/callback
    &response_type=code
    &scope=profile
```

Important parameters:

### client_id

Identifies our application.

```text
client_id = 123
```

### redirect_uri

Where the provider should send the user after authorization.

```text
redirect_uri = https://myapp.com/callback
```

### response_type

We want an authorization code.

```text
response_type=code
```

### scope

What permissions we want.

```text
scope=profile
```

---

# 12. Step 3 — User Logs In

The provider handles login.

```text
User
 ↓
Google
 ↓
Username + Password
```

Important:

```text
MyApp NEVER sees the Google password.
```

---

# 13. Step 4 — User Gives Permission

The provider shows:

```text
MyApp wants to:

✓ Read your profile
✓ Read your email

Allow?
```

User clicks:

```text
ALLOW
```

---

# 14. Step 5 — Authorization Code

The provider redirects the user back:

```text
https://myapp.com/callback?code=ABC123
```

Now MyApp receives:

```text
ABC123
```

This is the:

# Authorization Code

It is temporary.

It is NOT normally used directly to call the API.

---

# 15. Step 6 — Exchange Code for Access Token

MyApp's backend sends:

```http
POST /token
```

with:

```text
client_id
client_secret
code
redirect_uri
grant_type=authorization_code
```

The provider verifies everything.

Then returns:

```json
{
  "access_token": "eyJ....",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "abc..."
}
```

---

# 16. Step 7 — Call API

Now MyApp can call the API.

```http
GET /userinfo

Authorization: Bearer eyJ....
```

The provider checks:

```text
Is token valid?
        ↓
Is token expired?
        ↓
Does token have required scope?
        ↓
YES
        ↓
Return data
```

---

# 17. Access Token

Think of Access Token as:

```text
Temporary Permission Key 🔑
```

Example:

```text
Access Token
    ↓
Valid for 1 hour
    ↓
Can read profile
```

It does NOT mean:

```text
User's password
```

---

# 18. Refresh Token

Access tokens are usually short-lived.

Example:

```text
Access Token
    ↓
Expires after 1 hour
```

Instead of asking the user to login again, the application can use a refresh token.

```text
Refresh Token
       ↓
Authorization Server
       ↓
New Access Token
```

Flow:

```text
Access Token expires
        ↓
Use Refresh Token
        ↓
Get New Access Token
        ↓
Continue API calls
```

---

# 19. OAuth 1.0 vs OAuth 2.0

| Feature          | OAuth 1.0           | OAuth 2.0                  |
| ---------------- | ------------------- | -------------------------- |
| Purpose          | Authorization       | Authorization              |
| Password sharing | No                  | No                         |
| Request signing  | Yes                 | Usually no                 |
| Bearer token     | No                  | Common                     |
| Refresh token    | Different mechanism | Standard concept           |
| Complexity       | Higher              | Easier                     |
| Mobile apps      | Difficult           | Better support             |
| Web apps         | Supported           | Better support             |
| APIs             | Supported           | Designed with APIs in mind |
| Multiple flows   | Limited             | Multiple flows             |
| Scope            | Supported           | Supported                  |
| Modern adoption  | Low                 | Very high                  |

---

# 20. Why Did We Switch From OAuth 1.0 to OAuth 2.0?

This is the most important question.

## Reason 1 — OAuth 1.0 Was Complicated

OAuth 1.0 requires request signing.

```text
Request
+
Secret
+
Nonce
+
Timestamp
+
Parameters
        ↓
Signature
```

OAuth 2.0 generally makes API requests much simpler:

```http
Authorization: Bearer ACCESS_TOKEN
```

---

# 21. Reason 2 — Easier for Developers

OAuth 1.0:

```text
Generate signature
        ↓
Normalize parameters
        ↓
Encode parameters
        ↓
Generate HMAC
        ↓
Send request
```

OAuth 2.0:

```text
Get Access Token
        ↓
Send Bearer Token
```

Much easier to implement.

---

# 22. Reason 3 — Different Application Types

Modern applications are not only websites.

We have:

```text
Web Applications
Mobile Applications
Single Page Applications
Backend Services
IoT Devices
TV Applications
```

OAuth 2.0 provides different authorization flows for different scenarios.

For example:

```text
Web App
   ↓
Authorization Code
```

Machine-to-machine:

```text
Backend
   ↓
Client Credentials
```

Device without a normal browser:

```text
Device Authorization
```

---

# 23. Reason 4 — Better API Integration

Modern applications communicate heavily through APIs.

OAuth 2.0 works naturally with:

```text
REST APIs
Mobile Apps
SPAs
Backend APIs
Microservices
```

Example:

```http
GET /api/orders

Authorization: Bearer ACCESS_TOKEN
```

---

# 24. Reason 5 — Refresh Tokens

OAuth 2.0 provides a standard way to handle long-running access.

```text
Access Token
   ↓
Short lifetime
   ↓
Expires
   ↓
Refresh Token
   ↓
New Access Token
```

This improves security and user experience.

---

# 25. Very Important: OAuth 2.0 Is Not Authentication

OAuth 2.0 is primarily about:

# Authorization

Meaning:

> "What is this application allowed to access?"

Example:

```text
MyApp can:
✓ Read profile
✓ Read email

MyApp cannot:
✗ Delete account
✗ Change password
```

---

# 26. What About Login With Google?

This is where people commonly get confused.

OAuth 2.0 itself is about authorization.

For authentication, modern systems commonly use:

# OpenID Connect (OIDC)

OIDC is built on top of OAuth 2.0.

Conceptually:

```text
OAuth 2.0
    ↓
Authorization
    +
OpenID Connect
    ↓
Authentication / Identity
```

So:

```text
OAuth 2.0 → What can the app access?
OIDC      → Who is the user?
```

---

# 27. Easy Real-Life Example

Imagine an office.

You are the employee.

```text
You = User
Office = Provider
Your application = Client
ID card = Access Token
```

You don't give your personal password to another employee.

Instead:

```text
Office
 ↓
Checks your identity
 ↓
Gives permission
 ↓
Issues access card
```

The access card might allow:

```text
✓ Meeting Room
✓ Cafeteria
✓ Your Office

✗ Server Room
✗ HR Room
```

That's OAuth.

---

# 28. OAuth 1.0 vs OAuth 2.0 in One Example

## OAuth 1.0

Imagine every time you enter a room:

```text
Show ID
+
Generate special signature
+
Timestamp
+
Security code
```

Every request has to prove itself cryptographically.

---

## OAuth 2.0

You receive an access card:

```text
ACCESS TOKEN
```

Then:

```text
Request
+
Access Token
        ↓
Access Granted
```

Much simpler for API consumers.

---

# 29. What Should You Remember for Interviews?

Don't memorize the entire specification.

Remember these points:

### OAuth

```text
Password share nahi karna.
Token ke through access dena.
```

### OAuth 1.0

```text
Older
More complex
Request signing
Consumer secret
Token secret
Nonce
Timestamp
```

### OAuth 2.0

```text
Modern
More flexible
Bearer Access Token
Authorization Code
Refresh Token
Scopes
Multiple flows
```

### Why OAuth 2.0?

```text
OAuth 1.0
    ↓
Complex signing
    ↓
Harder implementation
    ↓
Modern applications need more flexibility
    ↓
OAuth 2.0
    ↓
Simpler + flexible authorization framework
```

---

# 30. One-Minute Interview Answer

If interviewer asks:

### "Why did we move from OAuth 1.0 to OAuth 2.0?"

You can say:

> **"OAuth 1.0 was secure but more complex because every API request required cryptographic signing. OAuth 2.0 introduced a simpler and more flexible authorization framework using access tokens and different flows for web, mobile, and other applications. That's why OAuth 2.0 became more widely adopted."**

---

# 31. Final Mental Map

Remember this:

```text
                 OAUTH
                   │
          Authorization
                   │
          ┌────────┴────────┐
          │                 │
      OAuth 1.0          OAuth 2.0
          │                 │
      Request             Access
      Signing              Token
          │                 │
      Complex             Simpler
          │                 │
       Older          Modern / Flexible
                            │
             ┌──────────────┼──────────────┐
             │              │              │
       Authorization    Access Token   Refresh Token
          Code
             │
             ↓
           API
```

## The one sentence to remember

> **OAuth 1.0 and OAuth 2.0 solve the same basic authorization problem, but OAuth 2.0 provides a more flexible architecture and simpler token-based API access, which made it much easier to use with modern applications.**
