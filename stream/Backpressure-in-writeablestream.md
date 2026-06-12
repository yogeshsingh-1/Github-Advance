Bhai Writable Stream me Internal Buffer aur Backpressure bahut important concepts hain.

1. Internal Buffer kya hai?

Jab tum write() karte ho aur data disk/network par turant nahi likha ja sakta, to Node.js us data ko temporary memory me store karta hai.

Is temporary memory ko Internal Buffer kehte hain.

writable.write("Hello");
writable.write("World");

Agar file system slow hai, to ye data buffer me store ho jayega aur baad me write hoga.

2. highWaterMark kya hai?

Ye buffer ki recommended limit hoti hai.

const ws = fs.createWriteStream("file.txt", {
  highWaterMark: 16 * 1024 // 16 KB
});

Matlab:

Buffer 16 KB tak comfortably fill ho sakta hai.
Iske baad Node.js kahega: "Bhai thoda ruk jao."
3. Backpressure kya hai?

Jab data produce karne ki speed zyada ho aur consume/write karne ki speed kam ho, to backpressure aata hai.

Producer Speed  ---> 100 MB/s
Writer Speed    ---> 10 MB/s

Ab extra data buffer me bharne lagega.

Node.js memory overflow se bachane ke liye backpressure apply karta hai.

4. write() false kab return karta hai?
const canWrite = writable.write(bigChunk);
true
true

Buffer me abhi jagah hai.

false
false

Buffer highWaterMark cross kar gaya.

Matlab:

"Abhi aur data mat bhejo, pehle buffer khali hone do."

5. drain Event

Jab buffer khali ho jata hai, Node.js drain event emit karta hai.

if (!writable.write(chunk)) {
  writable.once("drain", () => {
    console.log("Buffer empty, write again");
  });
}
Flow Example
write(chunk1)
       ↓
Internal Buffer

write(chunk2)
       ↓
Internal Buffer

write(chunk3)
       ↓
Buffer Full
       ↓
write() => false
       ↓
Stop Writing
       ↓
Disk writes data
       ↓
Buffer Empty
       ↓
drain Event
       ↓
Resume Writing
Real Example
const fs = require("fs");

const ws = fs.createWriteStream("demo.txt");

for (let i = 0; i < 100000; i++) {
  const ok = ws.write(`Line ${i}\n`);

  if (!ok) {
    console.log("Backpressure detected");
    break;
  }
}

# drain event tab fire hota hai jab writable stream ka internal buffer itna khali ho jata hai ki woh fir se data accept kar sakta hai, after write() had previously returned false

ws.on("drain", () => {
  console.log("Buffer drained");
});
One-Line Interview Answers
Internal Buffer

Writable stream ka temporary memory area jahan data store hota hai jab tak actual write operation complete nahi ho jata.

Backpressure

Jab producer data ko writable stream ki write speed se zyada fast bhejta hai aur stream usse slow process karti hai, to Node.js write() ko false return karke producer ko slow hone ka signal deta hai.

drain Event

Buffer khali hone par emit hota hai, jisse writing dobara continue ki ja sakti hai.
