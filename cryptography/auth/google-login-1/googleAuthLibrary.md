# Google Auth Library in Node.js

The google-auth-library is an official Google library for Node.js that helps your backend authenticate users and communicate securely with Google services.

Think of it as a helper that handles the complicated OAuth 2.0 and OpenID Connect operations instead of making you manually construct HTTP requests to Google's token endpoints.

Package name: google-auth-library

# Why do we need this library?

Suppose you're building an application where users can log in using Google.

Your application needs to:

1. Redirect users to Google's login page.
2. Receive an authorization code after successful login.
3. Exchange that code for tokens.
4. Verify the user's identity.
5. Extract the user's email, name and Google ID.
6. Create your application's own login session.
   You can implement these operations manually using HTTP requests, but Google provides google-auth-library to simplify them.

# Important classes

The library provides several classes, but for Google OAuth login, the most important one is OAuth2Client.

Class Purpose
OAuth2Client OAuth 2.0 authorization and token management
GoogleAuth Authentication with Google Cloud services
JWT Service-account and JWT-based authentication
UserRefreshClient Authentication using refresh tokens

For your Google login implementation, start with OAuth2Client.

# Imp point for verification

Google ke dwara official library hai. and ye publicly key ko fetch karega and kid ko compare karega and correct public key ko use karake hum data ko verify karega and humare audience ko bhi hmre cliend_id se compare kar dega.

id_token ko verify karne ke baad jo data milta hai ,

aud -> humare client id hota jise verify karna chaiye.
iss -> jisne id_token ko assign kara hota hai uska url hota hai.
