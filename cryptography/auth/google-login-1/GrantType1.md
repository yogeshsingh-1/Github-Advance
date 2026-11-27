# What are GrantType in oauth?

OAuth 2.0 mein Grant Types (also called Authorization Grant Types) define karte hain ki client application ko user ki taraf se access token kaise milega.

Simple words mein:

Grant Type = Access Token obtain karne ka method.

OAuth 2.0 has several grant types.

- GrantType mai ek authorization server(like GooGle ka server) hmre client(frontend/backend) accessToken/idtoken issue karta hai.

# Implement implicit grant type authorization:

set code=id_token&none=12345(for implicit grant type authorization)

https://accounts.google.com/o/oauth2/v2/auth
?response_type=id_token
&none=12345
&scope=openid email profile
&redirect_uri=http://localhost:4000/google/callback
&client_id=clientId

Parameter Meaning
response_type=id_token Requests an ID Token directly
none=12345 Invalid/unknown standard OAuth parameter
scope=openid email profile Requests OIDC authentication and profile information
redirect_uri Where Google redirects the user
client_id Identifies your Google OAuth application

# What is response_type?

This parameter tells Google what kind of response your application expects.

Common values:
response_type Meaning
code Authorization Code
token Access Token (Implicit Flow)
id_token ID Token (OIDC Implicit Flow)
code id_token Hybrid Flow

implicit authorization mai problem Hai ki idtoken Hme History mai url mai dikta Hai.
