# Exchange the Authorization Code for Tokens

After creating google "code" we can send to googleAPIS he send to him google api json response like
"access_token","id_token","expires_in","scope","token_type"

```
{
"access_token": "ACCESS_TOKEN",
"expires_in": 3599,
"refresh_token": "REFRESH_TOKEN",
"scope": "openid email profile",
"token_type": "Bearer",
"id_token": "ID_TOKEN"
}
```

## 4. Understand the returned tokens

### ID Token

The ID Token is a JWT that contains claims about the authenticated user.

Inside id token their sub imp info like "sub" like "id" ,"email","name","picture"

For example:

```json
{
  "iss": "https://accounts.google.com",
  "sub": "google-user-unique-id",
  "email": "user@example.com",
  "email_verified": true,
  "name": "Example User",
  "picture": "https://example.com/profile.jpg",
  "aud": "YOUR_CLIENT_ID"
}
```

This is an illustrative example, not a real token.

Our backend must validate the ID Token's signature and claims, including `iss`, `aud`, `exp`, and the `nonce` when one was sent.

The `sub` claim is Google's stable identifier for the user. It is generally the best identifier to associate with our local user account.

### Access Token

The Access Token is used to call authorized Google APIs, such as the UserInfo endpoint, when the required scopes are granted.

For example:

```text
https://openidconnect.googleapis.com/v1/userinfo
```

Send the token in the request header:

```http
Authorization: Bearer ACCESS_TOKEN
```

The endpoint can return user profile information, depending on the granted scopes.

### Refresh Token

A Refresh Token can be used to obtain new access tokens when Google issues one and the application needs offline access. Google does not necessarily return a Refresh Token on every login.

---

## 5. Create or log in the user in our application

After validating the ID Token, our backend can:

1. Read the user's verified identity claims.
2. Find the existing user using the Google `sub` identifier.
3. Create a local user account if appropriate.
4. Create our application's own session or issue our own access token.
5. Send the login result to the frontend securely.

The user is now logged in to **our application**.

Google authenticates the user, but our application remains responsible for its own session and
