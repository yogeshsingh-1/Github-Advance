# CPU-Bound Operations

CPU-bound operations mainly use the processor for computation.

Examples:

- Arithmetic calculations
- Sorting large datasets
- Searching algorithms
- Data compression/decompression
- Image or video processing
- Graphics rendering
- Encryption and decryption

---

# I/O-Bound Operations

I/O-bound operations spend most of their time waiting for external resources.

Examples:

- Reading and writing files
- Database queries
- Network requests (API calls)
- User input/output
- Sending emails
- Accessing cache systems (Redis, Memcached)
- Downloading or uploading files

---

# Key Difference

CPU-bound:

- Limited by CPU speed
- Requires computation
- Example: Sorting 1 million records

I/O-bound:

- Limited by external resources (disk, database, network)
- Often waits for response
- Example: Fetching data from a database


# CPU Operations → Main Thread par execute hoti hain.

# I/O Operations → Main Thread start karti hai, lekin actual work OS, libuv, ya Thread Pool handle karta hai.

Node.js me I/O operations ko manually handle nahi karna padta. libuv + Event Loop automatically handle karte hain.

In Node.js, I/O operations are handled asynchronously. When an I/O task such as file reading, database querying, or an HTTP request is initiated, Node.js delegates it to the operating system or libuv thread pool. The main thread remains free to handle other tasks. Once the operation completes, its callback, promise resolution, or async/await continuation is executed on the main thread through the event loop.