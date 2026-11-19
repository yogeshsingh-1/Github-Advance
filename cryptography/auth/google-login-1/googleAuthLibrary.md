# Google Auth Library in Node.js

ye jo id token hota hai, woh ek jwt token hota hai.(header, payload , signature)

ye jo id token hai, woh RS256 algorithm ka use karke sign kiya gya hai. ishe token ko verify karne ke liye hume ek public key jarurat hoti hai. (https://www.googleapis.com/oauth2/v3/certs)

The google-auth-library is an official Google library for Node.js that helps your backend authenticate users and communicate securely with Google services.

Think of it as a helper that handles the complicated OAuth 2.0 and OpenID Connect operations instead of making you manually construct HTTP requests to Google's token endpoints.

refresh_token and access_token are "opaque token" and
id_token is jwt token.

user ki info pane ke liye hume na toh refresh_token and access_token ki jarurat nhi hai only hume id_token chaiye.
google ki service ko access karne ki liye apko access_Token ka use karna pdga.

Package name: google-auth-library

In google there are diffrent types of scopes for Google Drive and Google Forms etc.
non-sensitive scopes : ["openid", "email", "profile"]
baki sare sensitive scopes hote hai.

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

accesstoken ek opaque token hai.(ye token randomaly generate kiye jate.)

aud -> humare client id hota jise verify karna chaiye.
iss -> jisne id_token ko assign kara hota hai uska url hota hai.

# Important method and class in google-auth-library

# create client using google "google-auth-library"
 
- setting for google oAuth2client client.
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client({
clientId: process.env.client_id,
clientSecret: process.env.client_Secret,
});

const client = new OAuth2Client({
clientId: process.env.client_id,
clientSecret: process.env.client_Secret,
redirectUri: redirect_uri,
// grant_type: "authorization_code" -> Ye automatically send kar deta hai.
});

# Using google auth library generate Auth Url

const url = client.generateAuthUrl({
response_type: "code",
scope: ["openid", "email", "profile"],
state: state ? state :"1234",
})

ab hme refresh token bhi chaiye toh hume 2 options aure set karne hote hai.
prompt and access_type.

// Generate the url that will be used for the consent dialog.
const authorizeUrl = oAuth2Client.generateAuthUrl({
// To get a refresh token, you MUST set access_type to `offline`.
access_type: 'offline',
// set the appropriate scopes
scope: 'https://www.googleapis.com/auth/userinfo.profile',
// A refresh token is only returned the first time the user
// consents to providing access. For illustration purposes,
// setting the prompt to 'consent' will force this consent
// every time, forcing a refresh_token to be returned.
prompt: 'consent',
login_hint:"yogeshs368@gmail.com" // ye hum direct bina kisi account ko select karaye bina login karwa dega
});

- It give me oauth redirect url

https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid%20email%20profile&state=1234&client_id=640249440952-svt79p7s7d6c5oon3aaab5dtsroakfie.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fgoogle%2Fcallback

# Create id token using

const tokenResponse = await client.getToken(code);

- Ye hme token response deta hai.
- Jisme res and tokens hota hai.
- Ishe tokens ke andar humare id_token , accesstoken , expiry_date, scope, token_type hota hai.

# Verify id token

const loginTicket = await client.verifyIdToken({
idToken: id_token,
audience: clientId, //compare the clientId and audience
}); // It give me envelope and payload

- LoginTicket hum envelope and payload deta hai.
  envelope -> Isme jwt headers hote hai.
  payload -> Isme user details hoti hai.

- ye method hume TokenPayload deta hai. jisme users details hoti hai.
  loginTicket.getPayload()

- ye method hume Envelope deta hai(it give me signature).
  loginTicket.getEnvelope();

- ye hume userId(sub) deta hai
  loginTicket.getUserId()

# Get user-info based on accesstoken

ye hume ishe url per ja kar milti hai.
"userinfo_endpoint": "https://openidconnect.googleapis.com/v1/userinfo"

ye access_token 1hr ke liye valid rhta hai.

const userInfo = await client.getTokenInfo(accessToken);

Get userinfo based on accesstoken
