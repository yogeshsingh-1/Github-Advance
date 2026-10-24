# Realm authentication ko organize karta hai, lekin tumhari application ki database authorization ya tenant isolation automatically implement nahi karta.

- Same company ki multiple applications: Ek realm mein multiple clients rakh sakte ho, jaise erp-frontend, admin-portal aur mobile-app.

- Completely separate organizations: Alag realms useful ho sakte hain, especially jab users, authentication policies aur configuration isolate karni ho.

- Multi-tenant SaaS / ERP: Ek realm ke andar multiple organizations manage karna bhi possible hai. Har tenant ke liye realm banana zaroori nahi; users, groups, roles aur application-level tenant isolation ke design par depend karta hai.

2. Technically Realm hota kya hai?
Keycloak mein ek Realm ke andar ye cheezein hoti hain:
- Users: Kaun login kar sakta hai.
- Credentials: Password jaise login credentials.
- Roles: User ko kaunsi application permissions assign hain.
- Groups: Users ko teams mein organize karna.
- Clients: Kaunsi applications Keycloak ko authentication ke liye use karengi.
- Authentication settings: Login flows, password policies, required actions aur related configurations.
- Identity providers: Google jaise external providers se login.
Iska matlab Realm sirf users ka folder nahi hai. Ye ek logical security aur identity-management boundary hai.

3. Realm aur Client mein kya difference hai?
Ye difference samajhna bahut important hai.

Maan lo tumhare paas ek hi company hai, aur tum 3 applications bana rahe ho:
- React ERP
- Admin Dashboard
- Mobile App
Tum ek my-company Realm bana sakte ho aur usmein teen clients register kar sakte ho.


4. Login ke time Realm ka role
Maan lo React app mein user Login button click karta hai.
1. React user ko Keycloak ke login page par redirect karta hai.
2. Login request kisi specific Realm ko target karti hai, jaise /realms/my-company/.
3. Keycloak us Realm ke according user ko authenticate karta hai.
4. Successful login par Keycloak application ko authorization code deta hai. OAuth/OIDC flow mein code exchange hone ke baad tokens milte hain.
5. Node.js backend token verify karta hai aur phir user ki permissions check karta hai.