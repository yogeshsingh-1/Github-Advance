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
