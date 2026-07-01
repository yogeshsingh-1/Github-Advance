# Node.js Stream Process (Request → File)

## Step 1

Client sends an HTTP request.

```
POST /test.js
```

---

## Step 2

The client sends data in the request body.

```
console.log("Hello world")
```

---

## Step 3

The browser converts the text into bytes.

```
Text
   ↓
Bytes
   ↓
HTTP Request Body
```

---

## Step 4

The bytes travel over the network (TCP) to the Node.js server.

```
Browser
   ↓
TCP
   ↓
Node.js Server
```

---

## Step 5

Node.js receives the request and creates an **IncomingMessage** object.

In Express, this object is available as **req**.

```
IncomingMessage
      ↓
     req
```

---

## Step 6

`req` is a **Readable Stream**.

It does not contain the entire request body at once.

The data arrives in small chunks.

```
Chunk 1
Chunk 2
Chunk 3
...
```

---

## Step 7

Express extracts the filename from the URL.

```
/test.js
     ↓
test.js
```

---

## Step 8

Node.js creates (or opens) the destination file.

```
storage/
      ↓
   test.js
```

---

## Step 9

`createWriteStream()` creates a **Writable Stream**.

```
writeStream
```

---

## Step 10

`req.pipe(writeStream)` connects the two streams.

```
req (Readable Stream)
          │
          ▼
       pipe()
          │
          ▼
writeStream (Writable Stream)
```

---

## Step 11

As the client sends data, Node.js reads one chunk from `req` and immediately writes it to `writeStream`.

```
Chunk
   ↓
req
   ↓
pipe()
   ↓
writeStream
   ↓
File
```

This process repeats until all chunks are written.

---

## Step 12

Each chunk is written to the file.

```
Chunk 1 → File
Chunk 2 → File
Chunk 3 → File
...
```

---

## Step 13

When the client finishes sending data, the `req` stream emits the **end** event.

```
Client Finished
       ↓
req emits "end"
```

---

## Step 14

`pipe()` automatically ends the `writeStream`.

```
writeStream
      ↓
end()
      ↓
File Closed
```

---

## Step 15

The server sends the response back to the client.

```json
{
  "msg": "File Uploaded"
}
```

---

# Complete Flow

```
Client
   │
   ▼
HTTP Request
   │
   ▼
Request Body (Bytes)
   │
   ▼
req (Readable Stream)
   │
   ▼
pipe()
   │
   ▼
writeStream (Writable Stream)
   │
   ▼
Operating System
   │
   ▼
Disk
   │
   ▼
storage/test.js
   │
   ▼
HTTP Response
```
