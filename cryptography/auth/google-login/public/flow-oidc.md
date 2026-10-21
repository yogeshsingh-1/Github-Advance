# Google Login Flow Using OpenID Connect (OIDC)

PKCE (Proof Key for Code Exchange) OAuth 2.0 Authorization Code Flow ki security extension hai.

## 1. User clicks the Login with Google button

First, the user clicks the **Login with Google** button on our website.

This button redirects the user to Google's Authorization Endpoint:

```text
https://accounts.google.com/o/oauth2/v2/auth
```

We send some query parameters to Google to tell it what we need.

### Required query parameters

- `client_id`: Identifies our application to Google.
- `redirect_uri`: The URL where Google sends the user after authentication.
- `response_type=code`: Requests an authorization code.
- `scope`: Defines the information and permissions we request.
- `state`: Helps protect against CSRF attacks.
- `nonce`: Helps protect against ID Token replay attacks in OIDC.

Example authorization URL:

```text
https://accounts.google.com/o/oauth2/v2/auth
?response_type=code
&client_id=YOUR_CLIENT_ID
&scope=openid%20email%20profile
&redirect_uri=http://localhost:5500
&state=random_state_value
&nonce=random_nonce_value
```

### What does `scope` mean?

The `scope` parameter specifies what information we request.

- `openid`: Enables OpenID Connect authentication and requests an ID Token.
- `email`: Requests the user's email address.
- `profile`: Requests basic profile information, such as name and profile picture.

**Important:** `openid` is mandatory for an OIDC request.

---

## 2. Google authenticates the user

After redirection, Google asks the user to log in if necessary and authorize the requested access.

Once authentication succeeds, Google redirects the browser to our `redirect_uri` with query parameters.

Example:

```text
http://localhost:5500/
?iss=https://accounts.google.com
&code=AUTHORIZATION_CODE
&scope=openid%20email%20profile
&authuser=0
&prompt=none
```

The important parameter here is:

```text
code=AUTHORIZATION_CODE
```

### What is this `code`?

This is an **Authorization Code**.

It is a temporary code that our application exchanges with Google's token endpoint to obtain tokens.

It is not the user's identity information, and it is not an Access Token.

We should also validate the returned `state` against the value generated before redirecting to Google.

---

## 3. Exchange the Authorization Code for Tokens

Now our application sends a POST request to Google's Token Endpoint:

```text
https://oauth2.googleapis.com/token
```

### Request body

The request uses `application/x-www-form-urlencoded` encoding.

```text
code=AUTHORIZATION_CODE
client_id=YOUR_CLIENT_ID
client_secret=YOUR_CLIENT_SECRET
redirect_uri=http://localhost:5500
grant_type=authorization_code
```

These fields mean:

- `code`: The authorization code received from Google.
- `client_id`: Our application's client ID.
- `client_secret`: Our application's secret, for confidential server-side clients.
- `redirect_uri`: Must match the redirect URI used in the authorization request.
- `grant_type=authorization_code`: Tells Google that we are exchanging an authorization code for tokens.

**Security note:** Never expose `client_secret` in frontend JavaScript. Keep it on the backend. For a browser-only public client, use Authorization Code Flow with PKCE instead.

### Example successful response

Google returns a JSON response similar to this:

```json
{
  "access_token": "ACCESS_TOKEN",
  "expires_in": 3599,
  "refresh_token": "REFRESH_TOKEN",
  "scope": "openid email profile",
  "token_type": "Bearer",
  "id_token": "ID_TOKEN"
}
```

The exact fields vary depending on the client, scopes, and authorization conditions.

---

## 4. Understand the returned tokens

### ID Token

The ID Token is a JWT that contains claims about the authenticated user.

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