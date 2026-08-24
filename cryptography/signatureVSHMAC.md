# Signature vs HMAC

Is a MAC or Tag the same

| Feature           | HMAC                                     | Digital Signature              |
| ----------------- | ---------------------------------------- | ------------------------------ |
| Key type          | **Symmetric key**                        | **Asymmetric key**             |
| Keys              | Same secret key                          | Private key + Public key       |
| Signing           | Secret key se                            | Private key se                 |
| Verification      | Same secret key se                       | Public key se                  |
| Secret sharing    | Dono parties ko secret pata hona chahiye | Private key sirf owner ke paas |
| Non-repudiation   | ❌ No                                    | ✅ Yes                         |
| Speed             | Faster                                   | Comparatively slower           |
| Common algorithms | HMAC-SHA256, HMAC-SHA512                 | RSA, ECDSA, Ed25519            |
| JWT example       | HS256                                    | RS256, ES256                   |
