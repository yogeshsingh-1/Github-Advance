# Duplex Stream क्या है?

Duplex Stream एक ऐसी stream होती है जो Readable और Writable दोनों होती है।
with two independent internal buffers. A classic real-world example is a TCP network socket:

Readable ←→ Duplex ←→ Writable

Ex :-

import { Duplex } from "stream";

const duplex = new Duplex({
read(size) {
this.push("Hello");
this.push(null);
},

write(chunk, encoding, callback) {
console.log("Received:", chunk.toString());
callback();
}
});

duplex.write("Himanshu");
duplex.on("data", chunk => {
console.log("Read:", chunk.toString());
});


# Transform Stream क्या है?

Transform Stream = Duplex Stream + Data Modification

मतलब:

Data write होता है।
बीच में data transform (modify) होता है।
Modified data read होता है।

import { Transform } from "stream";

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    const result = chunk.toString().toUpperCase();

    callback(null, result);
  }
});

upperCaseTransform.write("hello");
upperCaseTransform.end();

upperCaseTransform.on("data", (chunk) => {
  console.log(chunk.toString());
});