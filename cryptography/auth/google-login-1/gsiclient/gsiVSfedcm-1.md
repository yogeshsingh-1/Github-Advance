# Google Identity Services (GSI) vs Federated Credential Management (FedCM)

chrome://flags/ 
and search fedcm (fedcmButtonMode)

1. Google Identity Services (GSI)
   Google Identity Services (GIS, often called GSI) is Google's JavaScript
   library for adding Google sign-in to a website.
   It provides: - Sign in with Google button - Google One Tap - Google ID
   token in `response.credential` - Account selection and sign-in
   experience
   Example:

```javascript
google.accounts.id.initialize({
  client_id: "YOUR_CLIENT_ID",
  callback: (response) => {
    console.log(response.credential);
  },
});

google.accounts.id.prompt();
```

`initialize()` configures Google sign-in. `prompt()` requests the One
Tap prompt. 2. Federated Credential Management (FedCM)
FedCM is a browser API designed to support federated sign-in in a more
privacy-preserving way.
Federated sign-in means a user signs in to one website using an identity
provider such as Google.
Example: - Website: `mywebsite.com` - Identity provider: Google - User:
signs in using their Google account
FedCM helps the browser manage the identity-provider interaction and
account-selection experience. It is designed to reduce reliance on
third-party cookies and give the browser a role in the sign-in flow. 3. GSI vs FedCM

---

## Feature GSI / GIS FedCM

What is it? Google's sign-in Browser identity API
library
Provided by Google Browser
Main purpose Integrate Google Support
sign-in into a website privacy-conscious
federated sign-in
Developer interaction Initialize and Often used through GSI;
configure GSI some integrations can
call browser APIs
directly
ID token GSI callback provides Credential is delivered
`response.credential` through the
browser-mediated
identity flow
Third-party cookies Older sign-in flows Designed to work
could depend on them without third-party
cookies
Key point: GSI and FedCM are not competing alternatives. They
operate at different layers. 4. How they work together
A typical sign-in flow:
Your website loads the GSI JavaScript library.
GSI is initialized with your Google OAuth client ID.
The browser may use FedCM to mediate account selection and sign-in.
Google authenticates the user and issues an ID token.
GSI delivers the ID token to your callback as `response.credential`.
Your backend verifies the ID token.
Your application finds or creates its own user record and
establishes its own session.

```text
Your website
    |
    | GSI JavaScript
    v
Browser / FedCM (when supported and used)
    |
    v
Google identity provider
    |
    | ID token
    v
GSI callback: response.credential
    |
    v
Your backend verifies the ID token
    |
    v
Your application session
```

GSI can use FedCM internally. A developer using GSI usually does not
need to manually implement every FedCM step. 5. What this means for my GSI code
Your existing code uses GSI:

```javascript
google.accounts.id.initialize({
  client_id: "YOUR_CLIENT_ID",
  callback: async (response) => {
    console.log(response.credential);
  },
});

google.accounts.id.prompt();
```

`initialize()` configures Google sign-in.
`prompt()` requests the One Tap sign-in prompt.
`response.credential` contains the Google ID token.
With a current GSI library, FedCM may be used by the browser as part of
the sign-in experience. Some custom setups, such as certain iframe,
Content Security Policy, or prompt-positioning configurations, may
require additional migration changes. 6. Backend: verify the ID token
Do not trust an ID token merely because its payload can be decoded.
Verify it on your backend.
Install Google's Node.js library:

```bash
npm install google-auth-library
```

Example:

```typescript
import { OAuth2Client } from "google-auth-library";

const GOOGLE_CLIENT_ID = "YOUR_CLIENT_ID";
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyGoogleToken(idToken: string) {
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error("Invalid Google ID token");
  }

  return {
    googleId: payload.sub,
    name: payload.name,
    email: payload.email,
    emailVerified: payload.email_verified,
    picture: payload.picture,
  };
}
```

After verification, use the stable Google user identifier (`sub`) to
find or create the corresponding user in your database. Then issue your
application's own session cookie or token. 7. Remember this
GSI = Google's library for integrating Google sign-in.
FedCM = a browser API for privacy-conscious federated sign-in.
GSI and FedCM are not alternatives; GSI can use FedCM.
`response.credential` is the Google ID token.
Verify the ID token on your backend.
After Google authentication, establish your application's own
session.
