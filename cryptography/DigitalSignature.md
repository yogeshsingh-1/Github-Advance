# Digital Signature

Digital signature is a cryptographic mechanism used to verify the authenticity and integrity of data and to prove that the data was signed by the holder of a private key.

Digital Signature provides
Authenticity → Data kisne sign kiya, verify kar sakte hain.
Integrity → Data sign hone ke baad change hua ya nahi.
Non-repudiation → Signer ke private key control ke context mein, signer ke signature ko deny karna difficult hota hai.

there are two type of Digital Signatue:

|                   | Symmetric             | Asymmetric               |
| ----------------- | --------------------- | ------------------------ |
| Keys              | One shared secret key | Private + Public key     |
| Encryption        | ✅                    | ✅                       |
| Digital signature | ❌ Normally no        | ✅                       |
| Example           | AES                   | RSA, ECDSA, Ed25519      |
| Key sharing       | Difficult             | Public key can be shared |

# Digital signatures use asymmetric cryptography: the private key creates the signature, and the corresponding public key verifies it.

A digital signature is a cryptographic mechanism that uses an asymmetric private key to sign data and the corresponding public key to verify the signature, providing data integrity and authenticity.
