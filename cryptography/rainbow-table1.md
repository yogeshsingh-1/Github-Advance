# Rainbow Table क्या है?

```
सबसे पहले एक important correction: Rainbow Table कोई database table नहीं है जिसे हम application में बनाकर use करते हैं। यह cryptographic hashes को reverse/crack करने के लिए बनाई गई precomputed data structure है। यानी security की दुनिया का एक ऐसा shortcut है जो attacker का काम पहले से करके रखता है। इंसानों को मेहनत बचाने का शौक हर जगह है। 😑

Rainbow tables मुख्यतः unsalted password hashes के खिलाफ useful होती हैं। OWASP भी बताता है कि unique salt rainbow-table/precomputed lookup attacks को रोकने में मदद करता है।
```

```
Rainbow tables का primary purpose है:

Precomputed hashes का इस्तेमाल करके password hash को efficiently crack करने की कोशिश करना।

यह legitimate password-storage mechanism नहीं है।

Security testing में इसका उपयोग यह समझने के लिए किया जा सकता है कि कोई application weak/unsalted hashing का उपयोग तो नहीं कर रही।

NIST भी salted password hashing को rainbow tables और अन्य password-cracking techniques की effectiveness कम करने के उपाय के रूप में बताता है।
```