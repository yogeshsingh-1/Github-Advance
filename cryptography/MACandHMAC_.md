# What is Message Authentication Code(MAC)

A Message Authentication Code(MAC) is a short piece of information(also called a tag) used to verify.

Data integrity: Ensures the message has not been altered.
Authenticity : Confirms the message came from a legitimate sender who
possesses the secret key.

`It is generated using:`

A secret key
A message
A MAC algorithm


The receiver, who also knows the secret key, can verify the MAC to confirm the message is valid and unmodified.

# Note : 
If message is changed, ever by one bit , the MAC will not match during
verification.


# What is HMAC?
HMAC stands for Hash-based message authentication code.

It is a specific type of MAC that uses a cryptographic hash function (like SHA-256 or SHA-512) along with a secret key.

How HMAC works:

1. Combines the message with a secret key.
2. Applies the hash function in a specific way(with inner and outer padding).
3. Outputs a fixed-length tag.

This tag is then send along with the message. The receiver uses the same process and compares the result.


# Why HMAC is Popular:

Works with existing hash functions(SHA-256)
Easy to implement
Resistant to known cryptographic attacks
Widely used in APIs, authentication protocols and secure communications.

# Example:
Imagine you are sending an imp file over the internet.
Along with the file, you send a MAC genereated using your secret key.
when the recipient receives the file, the use the same key and verify the MAC.
If the MAC matches, the message is authentic and unaltered.


# Summary

MAC  -> Verify message integrity & authenticity.  (Algorithm -> Varies)
HMAC -> A secure MAC using a hash function.(SHA-256,SHA-512 etc)