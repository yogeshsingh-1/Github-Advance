# OAuth vs OIDC: Main difference

OIDC (OpenID Connect): Authentication, verifies who the user is. (401)

OAuth 2.0: Authorization, determines what resources the application can access on behalf of the user. (403)

- OAuth 2.0

Authorization

Ye decide karta hai ki kisi application ko user ke resources access karne ki permission hai ya nahi.

Example: Kisi app ko Google Drive ki files read karne ki permission dena.

- OpenID Connect (OIDC)

Authentication

Ye verify karne mein madad karta hai ki user kaun hai. Ye OAuth 2.0 ke upar identity layer add karta hai.

Example: Google se sign in karke user ki identity verify karna.

# Important thing to know
Google OAuth 2.0: Kisi application ko Google APIs access karne ki permission deta hai.

Google OIDC: Google account se user ki identity verify karne deta hai.

# How openId connect work :

User click login with xyz on the client app.

The client redirects the user to the authorization server with a request for access.

user logs in and grants permissions(scope of openid).

the authorization server send an authorization code back to the client via a reidrect URL.

the client then exchanges the authorization code for an ID token by making a POST request to authorization server.

The client decodes the ID token to get user's identity( eg name, email).

# OAuth 2.0 vs OpenID Connect (OIDC)

## 1. What is OAuth 2.0?

**OAuth 2.0 is an authorization framework** that allows an application to access protected resources on behalf of a user, with the user's permission.

**Example:** An application requests permission to read files from Google Drive.

## 2. What is OpenID Connect (OIDC)?

**OpenID Connect (OIDC) is an authentication layer built on top of OAuth 2.0.** It allows an application to verify a user's identity using an ID token.

**Example:** A user logs in to an application using their Google account.

## 3. Is Google OAuth 2.0 or OIDC?

**Google supports both OAuth 2.0 and OpenID Connect (OIDC).**

The technology used depends on what the application wants to achieve.

* **OAuth 2.0:** Used to authorize access to Google APIs.
* **OIDC:** Used to authenticate users and verify their identities.
* **OIDC + OAuth 2.0:** Used when an application needs user authentication and access to protected APIs.

## 4. Difference Between OAuth 2.0 and OIDC

| Feature       | OAuth 2.0                          | OIDC                                               |
| ------------- | ---------------------------------- | -------------------------------------------------- |
| Main purpose  | Authorization                      | Authentication                                     |
| Main question | What can the application access?   | Who is the user?                                   |
| ID token      | Not defined by OAuth 2.0           | Used for identity information                      |
| Access token  | Used to access protected resources | Can also be issued as part of the OAuth-based flow |
| Example       | Accessing Google Drive API         | Login with Google                                  |

## 5. How Does Login with Google Work?

Consider an application called `MyERP`.

1. The user clicks **Login with Google**.
2. MyERP redirects the user to Google's authorization endpoint.
3. Google authenticates the user.
4. Google redirects the browser to MyERP's callback URL with an authorization code.
5. MyERP's backend exchanges the authorization code for tokens.
6. The backend validates the ID token, including its signature, issuer, audience, expiration, and applicable nonce.
7. MyERP identifies the local user and creates its own session or application token.

### Flow Diagram

```text
User
  |
  v
MyERP Login Page
  |
  v
Google Authorization Endpoint
  |
  v
User Authentication by Google
  |
  v
Authorization Code
  |
  v
MyERP Backend
  |
  v
Google Token Endpoint
  |
  v
ID Token + Access Token
  |
  v
Validate ID Token
  |
  v
Create MyERP Session
  |
  v
User Logged In
```

This is typically implemented using the **OIDC Authorization Code Flow with PKCE**. -> Proof Key for Code Exchange

## 6. Difference Between ID Token and Access Token

### ID Token

* Defined by OpenID Connect.
* Contains claims about the authenticated user.
* Used by the client to verify the user's identity.
* Common claims include `iss`, `sub`, `aud`, and `exp`.

### Access Token

* Used to access protected APIs.
* Grants access according to its scope, audience, and the authorization server's rules.
* Is not a substitute for an ID token when verifying user authentication.

## 7. How Does This Work in a Node.js ERP Application?

After Google authenticates the user, MyERP must still identify the corresponding local account.

```text
Google verifies user identity
          |
          v
MyERP receives verified identity
          |
          v
Find or create local user
          |
          v
Check account status and permissions
          |
          v
Create MyERP session or JWT
          |
          v
Access protected ERP APIs
```

Google verifies the external identity. MyERP controls its own users, companies, roles, and permissions.

## 8. What Do HTTP 401 and 403 Mean?

| Status Code        | Meaning                                            | Example                                               |
| ------------------ | -------------------------------------------------- | ----------------------------------------------------- |
| `401 Unauthorized` | Authentication credentials are missing or invalid  | Invalid or expired token                              |
| `403 Forbidden`    | The request is understood, but access is forbidden | A user without admin permission accesses an admin API |

These status codes are not exclusive to OIDC or OAuth 2.0. They depend on the API's authentication and authorization checks.

## 9. Interview Answer

**OAuth 2.0 is an authorization framework that allows applications to access protected resources with permission. OpenID Connect is an identity layer built on OAuth 2.0 that enables applications to authenticate users using an ID token. Google supports both technologies: OIDC for sign-in and OAuth 2.0 for delegated API access.**

## 10. Quick Revision

* **OAuth 2.0 = Authorization**
* **OIDC = Authentication built on OAuth 2.0**
* **ID Token = User identity information**
* **Access Token = API access credential**
* **Google supports both OAuth 2.0 and OIDC**
* **Login with Google = Typically OIDC Authorization Code Flow**
* **Google Drive API access = OAuth 2.0 authorization**
* **MyERP permissions = Controlled by MyERP itself**

