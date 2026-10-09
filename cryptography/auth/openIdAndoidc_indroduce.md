# OAuth 2.0 pehle aaya tha, aur OpenID Connect (OIDC) baad mein.

- OAuth 2.0 -> 2012

Authorization, yani application ko resources access karne ki permission dena

- OpenID Connect (OIDC) -> 2014

Authentication, yani user ki identity verify karna

# Dono ka relation kaise bana?

OAuth 2.0: Applications ko protected resources access karne ki permission dene ke liye banaya gaya tha.

Problem: OAuth 2.0 khud standardized user authentication protocol define nahi karta tha.

OIDC: OAuth 2.0 ke upar identity layer add ki gayi, jisme ID token aur standardized authentication flow define kiya gaya.

- Interview answer: OAuth 2.0 was introduced in 2012, while OpenID Connect was introduced in 2014. OIDC builds on OAuth 2.0 by adding a standardized authentication layer to verify user identities.

- Yaad rakho: OAuth 2.0 purana hai; OIDC naya hai. Lekin OIDC, OAuth 2.0 ka replacement nahi, balki uske upar bani identity layer hai.