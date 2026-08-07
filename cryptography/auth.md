220 -> 226

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

State = Data
Stateless auth use nhi karna chaiye. kyuki full control nhi hota hai logout karne ka jab tak user ka token hoga tab woh logic rhega.
Isiliye Stateful use karna chiaye.

Stateful auth scalabe nhi hota hai. but scalabe and secure bna skte hai.
