 <!-- MongoDB me batchSize ka matlab hota hai: -->

// Ek baar me server client ko kitne documents bhejega.

// Jab aap bahut saare documents fetch karte ho, MongoDB sab documents ek hi response me nahi bhejta. Wo unhe batches (groups) me bhejta hai. Har batch ka size batchSize se control hota hai.

// Summary
// batchSize(n) → Ek network round-trip me kitne documents bhejne hain.
// limit(n) → Total kitne documents return karne hain.
// batchSize result count ko limit nahi karta, sirf data transfer ka size control karta hai.
// Large datasets ke liye batchSize memory usage aur network efficiency improve karta hai.
