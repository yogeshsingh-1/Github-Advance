// Buffer kya hai?
// Buffer ek memory ka block hota hai jisme bytes store hote hain.
//  1byte = 8 bits
// 1bit = 0 or 1
// Buffer ka use tab hota hai jab hume binary data ko handle karna hota hai, jaise ki file reading/writing, network communication, etc.
// Buffer ko create karne ke liye hum Buffer class ka use karte hain.
// Buffer class ke kuch methods hote hain jaise ki from, alloc, allocUnsafe, copy, includes, toJSON, toString, etc.

// BLOB -> BLOB stands for Binary Large Object. It is a data type that can store large amounts of binary data, such as images, videos, or any other type of file. In JavaScript, the Blob object represents a blob of immutable raw data. It can be used to create files or to represent data that can be read as text or binary.

const buffer = Buffer.from("hello world bhai"); // create a buffer array
const buffer1 = Buffer.alloc(50); // create a buffer array of size 50 and fill it with 0
const buffer2 = Buffer.allocUnsafe(50); // create a buffer array of size 50 and fill it with random data ,Fast hai, lekin memory initialize nahi karta.

// copy method in buffer
// sourceBuffer.copy(targetBuffer, targetStart, sourceStart, sourceEnd)
buffer.copy(buffer1, 0, 4, 10);
// include method in buffer
buffer.includes("hello");
// json method in buffer returns the json object of the buffer
console.log(buffer.toJSON());

// latin1 method in buffer returns the latin1 string of the buffer
console.log(buffer.toString("latin1"));

// console.log(buffer.length);

// console.log(buffer1.toString());
// console.log(buffer);

// console.log(buffer1);

// console.log(buffer);
// console.log(buffer.includes("hello"));
console.log(buffer2);

data: image / jpg;
(base64, base64encodedstring);
data: image / png;
(base64, base64encodedstring);
data: image / gif;
(base64, base64encodedstring);
data: image / jpeg;
