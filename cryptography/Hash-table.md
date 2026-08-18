| Use case                  | Example algorithm        | Why?                                                 |
| ------------------------- | ------------------------ | ---------------------------------------------------- |
| 📁 File integrity         | SHA-256                  | File change detect karna                             |
| 🔐 Password storage       | Argon2id, scrypt, bcrypt | Password ko safely store karna                       |
| 🔑 Token/fingerprint      | SHA-256 / HMAC           | Data ka fingerprint banana                           |
| 🌐 HMAC/API signatures    | HMAC-SHA-256             | Authentication + integrity                           |
| 📦 Content identification | SHA-256                  | Same content identify karna                          |
| 🗄️ Deduplication          | SHA-256                  | Duplicate files/data detect karna                    |
| 🔗 Blockchain             | SHA-256 / other hashes   | Blocks ko link/integrity maintain karna              |
| 🌳 Merkle trees           | Cryptographic hashes     | Large data structure ki integrity verify karna       |
| 🔍 Data integrity         | SHA-256                  | Data tamper hua ya nahi                              |
| 🏗️ Cache keys             | Hash functions           | Long/complex input ko compact key mein convert karna |


# Cipher Text vs Hash/Digest

| Feature                | Hash / Digest                                     | Ciphertext                                        |
| ---------------------- | ------------------------------------------------- | ------------------------------------------------- |
| Purpose                | Integrity / fingerprint                           | Confidentiality                                   |
| Reversible?            | ❌ No                                              | ✅ Yes, with correct key                           |
| Key required?          | ❌ Generally no                                    | ✅ Yes                                             |
| Original data recover? | ❌ Directly नहीं                                   | ✅ Decrypt करके                                    |
| Same input             | Same hash                                         | Same/different depending on encryption mode/nonce |
| Example                | SHA-256                                           | AES-256-GCM                                       |
| Node.js                | `createHash()`                                    | `createCipheriv()`                                |
| Main use               | File checksum, password verification, fingerprint | Secure data storage/transmission                  |


# Hash/Digest = "Is data mein change hua?"
# Ciphertext = "Data ko doosron se kaise chhupayein?"