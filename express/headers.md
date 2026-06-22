<!-- Express mai Header set -->

Header = request और response के साथ भेजी जाने वाली extra metadata (जानकारी) होती है।

Body actual data होती है, जबकि header उस data के बारे में जानकारी देता है।

1. Request Header (Client ➜ Server)

जब browser, React app, Postman आदि server को request भेजते हैं।

app.get("/users", (req, res) => {
console.log(req.headers);

console.log(req.headers.authorization);

res.send("done");
});

2. Response Header (Server ➜ Client)

जब server client को response भेजता है।

res.set() Express में HTTP response headers set करने के लिए इस्तेमाल होता है।

EX :-
res.set(field, value)

res.set("Content-Type", "application/json");
res.set({
"Content-Type": "application/json",
"Cache-Control": "no-cache",
"X-App-Version": "1.0.0"
});

| Header                        | Purpose                     |
| ----------------------------- | --------------------------- |
| `Content-Type`                | Response data type बताता है |
| `Authorization`               | Authentication token        |
| `Set-Cookie`                  | Cookie भेजना                |
| `Cache-Control`               | Browser caching control     |
| `Content-Disposition`         | File download control       |
| `Access-Control-Allow-Origin` | CORS                        |
| `X-*`                         | Custom headers              |

res.set("Content-Disposition",'attachment; filename="sample.txt"');

1. Content-Type बताने के लिए

Content-Type header का काम होता है ये बताना कि body के अंदर किस type का data भेजा जा रहा है।

Server को बताना कि कौन सा data आ रहा है।

res.set("Content-Type", "application/json");

json response bhejane ke liye
Body के अंदर JSON data है, इसे JSON की तरह parse करो।
"Content-Type", "application/json"

application/x-www-form-urlencoded
HTML form submit के लिए।
Content-Type: application/x-www-form-urlencoded

multipart/form-data
File upload के लिए।
Content-Type: multipart/form-data

text/plain
Plain text भेजने के लिए।
"Content-Type": "text/plain"

text/html
HTML भेजने के लिए।
"Content-Type": "text/html"

application/xml
XML data के लिए।
Content-Type: application/xml

application/pdf
PDF file भेजने के लिए।
"Content-Type", "application/pdf"

image:
Images भेजने के लिए।
Content-Type: image/png
Content-Type: image/jpeg
Content-Type: image/webp

audio:
Content-Type: audio/mpeg

video:
Content-Type: video/mp4

2. CORS

किस origin को API access करने देना है।

res.set("Access-Control-Allow-Origin","http://localhost:3000");

3. Caching control

Browser को बताना data cache करना है या नहीं।

res.set("Cache-Control","no-cache"); // no cache

4. File download control

res.set("Content-Disposition",'attachment; filename="demo.pdf"');

Browser file download शुरू कर देगा

5. Custom information भेजने के लिए

res.set("X-App-Version","2.0");

| Content-Type                      | Use case      | Express parser         |
| --------------------------------- | ------------- | ---------------------- |
| application/json                  | JSON APIs     | `express.json()`       |
| application/x-www-form-urlencoded | HTML forms    | `express.urlencoded()` |
| multipart/form-data               | File upload   | `multer`               |
| text/plain                        | Plain text    | `express.text()`       |
| text/html                         | HTML response | `res.send()`           |
| application/pdf                   | PDF           | `res.sendFile()`       |
