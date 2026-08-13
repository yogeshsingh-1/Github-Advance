<!-- Intro to Cryptography -->

1. Cryptography kya hai?

Cryptography ek technique hai jiska use data ko secure karne ke liye kiya jata hai.

Cryptography is the art and science of securing data by transforming it into a format that can only be understood by authorized parties.
It ensures confidentially, integrity, authentication and non-repudiation of information.

Node.js ke built-in crypto module se aap hashing, encryption/decryption, HMAC, aur random values generate kar sakte hain. Yeh module bina kisi extra package install kiye available hota hai.

Iska main purpose hai:

Data ko unauthorized access se protect karna
Data ki integrity maintain karna
User ki identity verify karna
Secure communication establish karna

Symetric and ASymetric

# Types of Cryptography

1. Encryption(Reversible)
   Encrryption is the process of converting data into an unreadable format to prevent unauthorized access.
   It can be reversed using a key.

Common Algorithms :
SHA256,
AES (Advanced Encryption Standard)
RSA(Rivest-Shamir-Adleman)
DES(Data Encyption Standard)

# Terminology in Encyption/Decryption
PlainText -> The original readable message or data.
Ciphertext -> The encypted, unreadable version of the plain text.
Encryption -> The process of converting plaintext into ciphertext using key.
Decryption -> The process of converting ciphertext back to plain text using key.
Key -> A secret value used for encyption and decryption.
Symmetric key -> The same key is used for both encryption and decryption.
ASymmetric key-> A key pair : public key(for encrytion) and private key(for decryption).


