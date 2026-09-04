# In express session :

npm i express-session

session(options)
Create a session middleware with the given options.

Note Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.

# session options

| Option              | Simple meaning                                 |
| ------------------- | ---------------------------------------------- |
| `secret`            | Cookie/session ID ko sign karna                |
| `genid`             | Custom session ID banana                       |
| `name`              | Session cookie ka naam                         |
| `store`             | Session data kahan store hoga                  |
| `cookie`            | Cookie ki security/expiry settings             |
| `rolling`           | Request par cookie expiry refresh karna        |
| `resave`            | Unchanged session ko dobara save karna         |
| `proxy`             | Reverse proxy ke peeche secure-cookie behavior |
| `saveUninitialized` | Empty/new session ko save karna hai ya nahi    |
| `unset`             | Session unset hone par store mein kya karna    |

secret: CipherKey | CipherKey[];
genid ? (req: express.Request): string;
name ?: string | undefined;
store ?: Store | undefined;
cookie ?: CookieOptions | ((req: express.Request) => CookieOptions) | undefined;
rolling ?: boolean | undefined;
resave ?: boolean | undefined;
proxy ?: boolean | undefined;
saveUninitialized ?: boolean | undefined;
unset ?: "destroy" | "keep" | undefined;

# Cipher Key

Cipher key basically encryption/decryption ka secret key hota hai.
