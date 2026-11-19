# verify id token

Google OAuth me ID Token verify isliye karte hain taaki humein confirm ho sake ki Google ne genuinely user ko authenticate kiya hai aur token valid hai. Sirf token mil jaana proof nahi hai, kyunki koi attacker bhi fake token bhej sakta hai. Security ka kaam hi har cheez par shak karna hai.

{
algorithm :RS256
}

After comming id-token verify to id token
use open id connect website and search
well-known

https://accounts.google.com/.well-known/openid-configuration

"jwks_uri": "https://www.googleapis.com/oauth2/v3/certs"

jwks uri
URL Google ke public keys (certificates) ka endpoint hai. Iska use Google ID Token ki signature verify karne ke liye hota hai.

1. Ye actually karta kya hai?
   Jab Google tumhe ID Token deta hai, toh Google us token ko apni private key se digitally sign karta hai.

Tumhara backend us signature ko verify karne ke liye Google ki corresponding public key use karta hai.

# Node.js mein ID Token verify kaise karein?

Google ki official google-auth-library use kar sakte ho.

npm install google-auth-library

JWK(JSON Web Key)
pem(privacy enhance mail)

Or
JWT token ke through verify kar skte but public google key khud use karni pdgi har baar fetch karke.

# create client using google "google-auth-library"

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
scope: "openid email profile",
state: "1234",
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
