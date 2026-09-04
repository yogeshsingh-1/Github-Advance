# Authentication ke fixed number of types nahi hain, kyunki authentication ko alag-alag basis par classify kiya ja sakta hai. Backend developer ke liye mainly ye methods important hain:

1. Session-Based Authentication

Server user ka session maintain karta hai.

Example: Express + express-session

```
Stateful authentication hoti hai, kyunki server ko session state store karni padti hai.
```

2. Token-Based Authentication

Server login ke baad token deta hai.
Common tokens:

JWT
Opaque access token

Usually stateless ho sakti hai, especially JWT ke case mein.

3. JWT Authentication

JWT token ke andar claims/user information hoti hai.

Server token verify karta hai, generally database/session lookup ke bina.

Important: JWT authentication aur token-based authentication same cheez nahi hain. JWT is one type of token.

4. API Key Authentication
   Client ko ek API key milti hai.
   Mostly:

Public/private APIs
Server-to-server communication
Developer APIs

5. Basic Authentication

Username + password ko Base64 encode karke bheja jata hai.

6. OAuth 2.0

OAuth mainly authorization framework hai, authentication protocol strictly nahi.

7. OpenID Connect (OIDC)

OIDC, OAuth 2.0 ke upar authentication layer provide karta hai.

Common examples:

Login with Google
Login with Microsoft
Login with Apple

OIDC mein ID Token user authentication information carry karta hai.

8. SSO (Single Sign-On)

Ek baar login karo, multiple applications access karo.

9. Certificate-Based Authentication

Client/server certificate se identity verify hoti hai.

Common technology:

mTLS (Mutual TLS)

10. Multi-Factor Authentication (MFA)

Authentication ke multiple factors use hote hain.

11. Passwordless Authentication

Password ki jagah:

Passkeys
WebAuthn
Security keys
Magic links
OTP

# Note:

Stateful vs Stateless authentication ka alag authentication method nahi hai. Ye batata hai ki authentication system server-side state maintain karta hai ya nahi.

# diffrence b/w stateless auth vs statefull auth

Server user ki login/session information ko apne paas store karta hai ya nahi.

1. Stateful Authentication

Server session information store karta hai.

Server ke paas actual session state hai.

Common example: Express Session + Redis.

2. Stateless Authentication

Server login session store nahi karta. Client har request ke saath authentication information bhejta hai.
