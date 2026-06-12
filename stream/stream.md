# Streams are used to process data piece by piece (chunks) instead of loading the entire data into memory at once.

There are 4 types of streams in Node.js:

1 MB = 1024 × 1024 Bytes
     = 1,048,576 Bytes

# highWaterMark kya hota hai?

const readable = fs.createReadStream("large-file.zip", {
  highWaterMark: 64 * 1024 * 1024, // 64 MB
});

Default:
64 * 1024
= 65,536 bytes
= 64 KB mai read karta hai.

highWaterMark maximum buffer size nahi hota.

# destroy() kya karta hai?
Stream ko turant band kar deta hai.
Aage data read nahi hoga.
File descriptor close kar deta hai.
close event emit hota hai.

1. highWaterMark: 64 * 1024
means data roughly 64 KB chunks mein aayega.

2. highWaterMark: 64 * 1024 * 1024
means data roughly 64 MB chunks mein aayega.

Ye sirf batata hai ki stream ek time par kitna data buffer karne ki koshish karegi before applying backpressure.

Buffer Max Size ≈ 2 GB
highWaterMark = Chunk/Buffer Threshold

Ye stream ka internal buffer size threshold hota hai.

1. Readable Stream 
<!-- Highwatermark -->

Readable streams are used to read data from a source.

Event ->open,data,end,error,close

data     → Jab naya data chunk receive hota hai.
end      → Jab saara data read ho jata hai.
error    → Jab reading ke dauran koi error aati hai.
close    → Jab stream/resource close ho jata hai.
readable → Jab internal buffer mein data available hota hai.
pause    → Jab stream pause ho jati hai.
resume   → Jab paused stream dobara start hoti hai.

Examples
Reading a file
Receiving an HTTP request
Reading data from a database

const fs = require("fs");

const readableStream = fs.createReadStream("data.txt",{highWaterMark : 64*1024*1024});

readableStream.on("data", (chunk) => {
  console.log(chunk.toString());
});

Real-Life Example

Reading a 1GB file without loading the entire file into memory.

2. Writable Stream

Writable streams are used to write data to a destination.

default highwatermark 16kb hota hai.
Event -> finish,drain,error,close

finish   → Jab saara data successfully write ho jata hai.
drain    → Jab internal buffer khali ho jata hai aur aur data accept kar sakta hai.
error    → Jab writing ke dauran error aati hai.
close    → Jab writable stream close ho jati hai.
pipe     → Jab koi readable stream is writable stream se pipe hoti hai.
unpipe   → Jab readable stream pipe hona band kar deti hai.

Examples
Writing data to a file
Sending an HTTP response
Writing logs

const fs = require("fs");

const writableStream = fs.createWriteStream("output.txt");

writableStream.write("Hello World");
writableStream.end();

Real-Life Example

Saving uploaded files to disk.

3. Duplex Stream

Duplex streams can read and write data.

Event -> data,end,finish,drain,error,close

data     → Jab naya data chunk receive hota hai.
end      → Jab readable side ka data khatam ho jata hai.
readable → Jab internal buffer mein data available hota hai.
pause    → Jab readable side pause ho jati hai.
resume   → Jab paused readable side dobara start hoti hai.

finish   → Jab writable side ka saara data write ho jata hai.
drain    → Jab writable buffer khali ho jata hai aur aur data accept kar sakta hai.

error    → Jab read ya write operation mein error aati hai.
close    → Jab duplex stream completely close ho jati hai.
pipe     → Jab koi readable stream isse pipe hoti hai.
unpipe   → Jab pipe connection remove ho jata hai.

Think of them as a combination of Readable and Writable streams.

Examples
TCP Socket
WebSocket

socket.write("Hello Server"); // Write

socket.on("data", (data) => { // Read
  console.log(data.toString());
});

Real-Life Example

Chat applications where you both send and receive messages.

4. Transform Stream

Transform streams are a special type of Duplex stream.

They can read data, modify it, and then write the transformed data.

const { Transform } = require("stream");

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  }
});

Examples
Compression
Encryption
Converting text to uppercase

# Interview Difference

Readable  → Only Read
Writable  → Only Write
Duplex    → Read + Write
Transform → Read + Modify + Write


Readable  = Input
Writable  = Output
Duplex    = Input + Output
Transform = Input + Process + Output



# diffrend type of event in stream

# Stream Events in Node.js

Streams are instances of the EventEmitter class, so they emit various events during their lifecycle.

---

# Readable Stream Events

Readable streams are used to read data from a source such as files, HTTP requests, or network sockets.

## data

Emitted whenever a chunk of data is available to read.

```js
readable.on("data", (chunk) => {
  console.log(chunk.toString());
});
```

### Use Case

Reading a large file chunk by chunk.

---

## end

Emitted when all data has been read from the stream.

```js
readable.on("end", () => {
  console.log("Reading completed");
});
```

### Use Case

Performing cleanup after reading is finished.

---

## error

Emitted when an error occurs while reading data.

```js
readable.on("error", (err) => {
  console.error(err);
});
```

### Use Case

Handling missing files or permission issues.

---

## close

Emitted when the stream and its underlying resources are closed.

```js
readable.on("close", () => {
  console.log("Readable stream closed");
});
```

---
# Writable Stream Events

Writable streams are used to write data to a destination such as files or HTTP responses.

## finish

Emitted after all data has been written and the stream has been ended.

```js
writable.on("finish", () => {
  console.log("Writing completed");
});
```

### Use Case

Detecting when file writing is complete.

---

## drain

Emitted when the internal buffer becomes empty and the stream can accept more data.

```js
writable.on("drain", () => {
  console.log("Buffer is ready for more data");
});
```

### Use Case

Handling backpressure efficiently.

---

## error

Emitted when an error occurs during writing.

```js
writable.on("error", (err) => {
  console.error(err);
});
```

---

## close

Emitted when the writable stream is closed.

```js
writable.on("close", () => {
  console.log("Writable stream closed");
});
```

---

# Duplex Stream Events

Duplex streams support both reading and writing.

Examples:

* TCP Sockets
* WebSockets

Supported events:

```txt
data
end
finish
drain
error
close
```

---

# Transform Stream Events

Transform streams are a special type of Duplex stream that modify data while passing it through.

Examples:

* Compression (gzip)
* Encryption
* Data conversion

Supported events:

```txt
data
end
finish
drain
error
close
```

Transform streams implement:

```js
transform(chunk, encoding, callback)
```

This method receives input data, transforms it, and pushes the modified data to the output stream.

---

# Most Important Stream Events

| Event  | Stream Type | Description               |
| ------ | ----------- | ------------------------- |
| data   | Readable    | Data chunk received       |
| end    | Readable    | Reading completed         |
| finish | Writable    | Writing completed         |
| drain  | Writable    | Buffer is available again |
| error  | All Streams | Error occurred            |
| close  | All Streams | Stream closed             |

---

# Easy Memory Trick

```txt
Readable Stream
---------------
data -> end

Writable Stream
---------------
write -> finish

All Streams
-----------
error
close
```

### Interview Summary

* `data` → New chunk is available.
* `end` → Reading completed.
* `finish` → Writing completed.
* `drain` → Writable stream buffer is empty again.
* `error` → Something went wrong.
* `close` → Stream resources have been closed.
