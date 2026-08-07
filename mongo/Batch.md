 <!-- MongoDB me batchSize ka matlab hota hai: -->

// Ek baar me server client ko kitne documents bhejega.

// Jab aap bahut saare documents fetch karte ho, MongoDB sab documents ek hi response me nahi bhejta. Wo unhe batches (groups) me bhejta hai. Har batch ka size batchSize se control hota hai.

// Summary
// batchSize(n) → Ek network round-trip me kitne documents bhejne hain.
// limit(n) → Total kitne documents return karne hain.
// batchSize result count ko limit nahi karta, sirf data transfer ka size control karta hai.
// Large datasets ke liye batchSize memory usage aur network efficiency improve karta hai.

<!-- When is batchSize() useful? -->

Suppose your collection has 1,000,000 documents.

Without batchSize:

await collection.find().toArray();

MongoDB will eventually fetch all one million documents into your application's memory (via multiple network batches under the hood), and toArray() stores them all in an array. This can consume a lot of memory.

A better approach is to process documents one at a time:

const cursor = collection.find().batchSize(100);

for await (const doc of cursor) {
console.log(doc);
}

Here:

MongoDB sends 100 documents at a time.
Your application processes them as they arrive.
You don't need to keep the entire result set in memory.

This is the main use case for batchSize().

Summary
find() → creates a cursor.
batchSize(5) → fetches data from the server in chunks of 5.
toArray() → reads all chunks and returns a single array.
limit(5) → returns only the first 5 documents.
