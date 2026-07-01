HTTP → Rules (client aur server communication.)
TCP → Data ko reliably pahunchane ka transport protocol


1. Client sends an HTTP request.

2. DNS Lookup
The browser converts the domain name into an IP address.

3. TCP 3-Way Handshake

Before HTTP data can be exchanged, a TCP connection must be established.

4. HTTPS (Optional)

For HTTPS:

    TCP
     ↓
    TLS Handshake
     ↓
    HTTP

TLS exchanges encryption keys before any HTTP data is sent.

5. Browser Creates HTTP Request and send Request Headers.

6. The client sends data in the request body.

7. Body Converted to Bytes
The browser converts the request body into bytes. The browser converts the JSON into UTF-8 bytes before sending it.

8. The bytes travel over the network (TCP) to the Node.js server.

9. TCP Splits Data into Segments

   Large data is divided into smaller TCP segments.

    Chunk 1
    Chunk 2

10. Server Receives TCP Segments

The operating system reassembles the TCP segments into the original byte
stream.

11. Node.js Creates IncomingMessage

Node.js parses the HTTP request and creates an `IncomingMessage` object.

In Express:

``` js
app.post("/login", (req, res) => {
  // req is IncomingMessage
});
```

12. Node.js receives the request and creates an **IncomingMessage** object.

Request -> Is IncomingMessage object.

 In Express, this **IncomingMessage** object is available as **req**.

13. `req` is a **Readable Stream**.
 The request body is **not loaded into memory all at once**.

 Instead, the data arrives in **small chunks**.

 ``` js
req.on("data", (chunk) => {
  console.log(chunk);
});
``` 

end Event

When all chunks have been received:

``` js
req.on("end", () => {
  console.log("Request body complete");
});
```

14. express.json()

`express.json()`:

1.  Collects all chunks.
2.  Combines them.
3.  Converts bytes to a UTF-8 string.
4.  Calls `JSON.parse()`.
5.  Stores the result in `req.body`.



10. `createWriteStream()` creates a **Writable Stream** for the destination file.

11. `req.pipe(writeStream)` connects the Readable Stream (`req`) to the Writable Stream (`writeStream`).

12. As the client sends data, Node.js reads one chunk from `req` and immediately writes that chunk to `writeStream`.

13. This process continues until all chunks have been transferred from the request to the file.

14. When the client has finished sending data, the `req` stream emits the **end** event.

15. `pipe()` automatically calls `writeStream.end()` to close the file after all data has been written.

16. Finally, the server sends an HTTP response back to the client.



# Complete Flow

``` text
User
 │
 ▼
Browser
 │
 ▼
DNS Lookup
 │
 ▼
TCP 3-Way Handshake
 │
 ▼
TLS Handshake (HTTPS)
 │
 ▼
HTTP Request
 │
 ▼
Headers + Body
 │
 ▼
UTF-8 Bytes
 │
 ▼
TCP Segments
 │
 ▼
Internet
 │
 ▼
Server OS
 │
 ▼
Node.js HTTP Parser
 │
 ▼
IncomingMessage (req)
 │
 ▼
Readable Stream
 │
 ▼
Chunks
 │
 ▼
'end' Event
 │
 ▼
express.json()
 │
 ▼
req.body
 │
 ▼
Express Route Handler
 │
 ▼
HTTP Response
 │
 ▼
Browser
```

