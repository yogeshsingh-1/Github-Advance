220 -> 226(Login simple)
283 -> DB simple continue

<!--  Authentication  -->

Authentication is the process of verifying who the user is.

Ex:-

1. Entering your username and password to log in.
2. Login in with Google OAuth.
3. Using Biometric (like fingerprint or Face ID).

<!-- Authorization -->

Authorization is the process of determining what an authenticated user is allowed to access or do.

<!-- Stateful vs Stateless Auth -->

Authentication and Authroization mechanism can be classified into two categories :

1. Stateful :
   Stateful methods require the server to maintain user session infomation b/w requests.

# Authentication(stateful)

a. Session-Based Authentication

After login, the server creates a session and stores it (usually in memory or database).
A session ID is send to the client as a cookie.
Cookie can be Signed, HttpOnly, Secure and have and expiration.
The client sends this cookie on every request to authenticate.

b. Authorization(Stateful)

Role-Based Access Control (RBAC)

Roles like admin,editor or user are stored on server(in session or database).
Server checks role from the session data on every request.

c. Access Control Lists(ACLs)

Each user of role is associated with a list of permission.
Checked server-side during each request.

# Stateless

Stateless methods do not require the server to store any user session data.
the client provides all necessary information with each request.

1. Authentication(Stateless)

a. Token-Based Authentication (e.g. JWT)

After login the server generate a token (JWT) that encodes user identity and possibly permissions.
The browser(web) client stores the token (in httponly cookie or memory) and sends it automatically on every request.
The mobile(app) client stores the token(in secure storage) and sends Authorization: Bearer <token> header.
The server decodes and verifies the token on every request responds the resources if the token is valid.

WT token ko authentication ke liye use nhi karna chaiye.
ye client and server ke beech Authentication ke liye bna he nhi hai.
ye bna hai server and server ke beech authentication ke liye bna hai.

# Authorization (Stateless)

1. Claims-Based Authorization (JWT)

Claims in the token(like role,permissions) are used to authorize access to routes/resources.
No need to query the database or store roles in memory.

State = Data
Stateless auth use nhi karna chaiye. kyuki full control nhi hota hai logout karne ka jab tak user ka token hoga tab woh login rhega.
Isiliye Stateful use karna chiaye na ki stateless.

Stateful auth scalabe nhi hota hai. but scalabe and secure bna skte hai.

Note : In practice, many applications use a hybrid approach(e.g. JWT with refresh tokens and limited server-side session storage).
Server to client(browser or mobile) auth you should not use JWT or stateless auth unless you dont care about security and session control.

<!-- Limitations of Auth in Our storageApp-->

1. Users can indefinitely extend the cookie expiry date on their own.(User apni cookie ki expiry date change kar skta hai.)
2. Any user can change the value of uid to another user ID and gain their access to their account.
3. we cannot log out a user manually without either deleting the user or changing their ID.
4. We can not limit the number of devices a user can be logged into simultaneously
5. If the database is leaked, an attacker can access any users account without needing their password.

Root cause (sabki jad ek hi hai)

Jab tum "stateless" auth karte ho (jaise sirf cookie mein uid=123 daal diya, bina sign kiye, bina expiry check kiye server pe) — to cookie hi tumhari identity ban jaati hai, aur server andhe bharose usse trust kar leta hai. Isi wajah se ye saari problems aati hain.

Point by point samjho:

1. Expiry khud extend kar lena
   Cookie ki expires date sirf browser ko ek "suggestion" hoti hai. Server khud kabhi check nahi karta ki ye expire ho chuki hai ya nahi. Isliye user apni cookie ki expiry manually badha sakta hai (DevTools se) aur session zinda rakh sakta hai.
   👉 Fix: Expiry ko token ke andar hi daalo (jaise JWT ke exp field mein) aur har request pe server khud verify kare ki expire hua ya nahi — sirf browser pe bharosa mat karo.

2. uid change karke doosre ka account access karna
   Cookie ka value plain text hai, unsigned hai — matlab koi bhi usse edit kar sakta hai (uid=123 ko uid=456 bana diya) aur server ko pata hi nahi chalega ki tampering hui hai.
   👉 Fix: Token ko sign karo (HMAC ya JWT se). Agar koi value change karega to signature match nahi karega aur request reject ho jayegi.

3. Manually logout nahi kar sakte
   Kyunki server ke paas koi session table hi nahi hai jisme se entry delete karke logout force kiya ja sake. Token khud hi valid rehta hai jab tak expire na ho.
   👉 Fix: Ya to thoda "stateful" bano — chhota sa session/blacklist table maintain karo jisme revoked tokens ki list ho, aur har request pe check karo ki token us list mein to nahi hai.

4. Devices ki limit nahi laga sakte
   Same reason — server ko pata hi nahi ki user kitne devices se login hai, kyunki koi central record hi nahi hai.
   👉 Fix: Ek sessions table rakho (uid, device_id, login time, last_seen) — token stateless rahe, par ek chhota tracking layer server pe rakho.

5. DB leak = bina password ke account hack
   Agar sirf uid hi tumhari "credential" hai (na signature, na secret key ka use), to DB leak hote hi attacker ko sab uids mil jayenge aur wo directly kisi ka bhi account access kar lega — password ki zarurat hi nahi padegi.
   👉 Fix: Token ko ek secret key se sign karo jo database mein kahin store na ho. Isse agar DB leak bhi ho jaye, attacker ke paas sirf uid hoga, valid signature nahi — to wo fake token bana hi nahi payega.

Asli baat (short mein)

Tumne jo bhi likha hai, wo sab isliye ho raha hai kyunki uid ko hi credential bana diya gaya hai, bina sign kiye aur bina server-side tracking ke. Pure stateless (sirf JWT, kuch bhi DB check nahi) fast to hota hai, par revoke/logout/device-limit nahi kar sakte. Isliye zyadatar real-world systems hybrid approach use karte hain:

Short-lived signed access token (stateless, jaldi verify hota hai) → point 1, 2, 5 solve
Long-lived opaque refresh token, DB mein session ke saath store → point 3, 4 solve (logout, device list sab possible)

Note -> JWT url encoded form mai hota hai. ishe base64 se string mai change karke hum iska data and expiry dekh skte hai.

const l = Buffer.from(
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYjNmMjBlYmMyMGE3NDU5MjhmZTIyMTljMGExNzA0NjkiLCJpYXQiOjE3ODY1MjA4MTMsImV4cCI6MTc4NjU0MjQxM30.yLtzX-7QjPtd_3Vb3AmwoWiLAW6dAYot9Oapd1a0OU0",
"base64",
).toString("utf-8");

# jwt mai iat and exp ka jo value hota hai woh second mai hota hai.

but new Date() jo method hai woh value milisecond mai leta hai.

const a = { uid: "12345", iat: 1786445321, exp: 1786463321 };
console.log(new Date(a.iat \* 1000));
