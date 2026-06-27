<!-- CORS stands for Cross-Origin Resource Sharing. -->

CORS is a browser security feature that controls whether a web page from one origin can access resources from another origin.

# What is an Origin?

An origin is made up of:
http://example.com:8080

Protocol (http or https)
Domain (example.com)
Port (3000, 5000, etc.)

# Why do we need CORS?

Since the origins are different (ports are different), the browser blocks the request unless the backend explicitly allows it.

# CORS Response Headers :

Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET,POST,PUT,DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials :
Access-Control-Expose-Headers:

Header Purpose
Access-Control-Allow-Origin -> Which origins are allowed
Access-Control-Allow-Methods -> Allowed HTTP methods
Access-Control-Allow-Headers -> Allowed request headers
Access-Control-Allow-Credentials -> Whether cookies/auth credentials are allowed
Access-Control-Expose-Headers -> Response headers that JavaScript can access

res.set({
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET,POST,PUT,DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
})

# What is Simple Request ?

Some requests don't trigger a CORS preflight. Those are called simple requests.

A simple request is one that meets all the following conditions:

https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS

One of the allowed methods: GET,HEAD,POST

he only type/subtype combinations allowed for the media type specified in the Content-Type header are:

application/x-www-form-urlencoded
multipart/form-data
text/plain

# What is a Preflight Request? app.options("\*", cors());

Preflight request automatically browser ke dwara send ki jati hai jab bhi browser ko lagta hai ki request ek non-simple (complex) CORS request hai. Browser actual request bhejne se pehle server se permission check karta hai. Ye permission check OPTIONS request ke through hota hai.
Isme Kuch Method and Headers ko check karta hai ki ye headers and method allowed hai.

Answer:
A Preflight Request is an automatic HTTP OPTIONS request sent by the browser before certain cross-origin requests. It checks whether the server allows the requested HTTP method and headers.
If the server responds with the appropriate CORS headers (such as Access-Control-Allow-Origin,
Access-Control-Allow-Methods, and
Access-Control-Allow-Headers),
the browser proceeds with the actual request. Otherwise, it blocks the request for security reasons.

Preflight Request ek automatic request hoti hai jo browser server ko actual request bhejne se pehle send karta hai.

Iska purpose hota hai:

"Server, kya main ye request bhej sakta hoon?"

Agar server permission de deta hai, tab browser actual request bhejta hai.

Ex:
fetch("http://localhost:5000/users/1", {
method: "PUT",
headers: {
Authorization: "Bearer token",
"Content-Type": "application/json",
},
body: JSON.stringify({
name: "Himanshu",
}),
});

Browser sochta hai:

"Ye normal GET request nahi hai."
"Isme PUT method hai."
"Authorization header bhi hai."

Isliye browser pehle Preflight Request bhejta hai.

# Step 1: Browser sends OPTIONS request

OPTIONS /users/1 HTTP/1.1
Origin: http://localhost:3000
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: Authorization, Content-Type

Dhyan do:
Ye PUT request nahi hai.
Ye sirf permission maang raha hai.

# Step 2: Server replies

HTTP/1.1 204 No Content

Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Authorization, Content-Type

Matlab server bol raha hai:

✔ Haan
PUT allowed hai

✔ Authorization header allowed hai

✔ Content-Type allowed hai

# Step 3: Browser sends actual request

Ab browser asli request bhejta hai:

PUT /users/1

Authorization: Bearer token
Content-Type: application/json

Ab server response de deta hai.

# Agar server permission na de?

Suppose server ne reply kiya:

Access-Control-Allow-Methods: GET

Lekin tum PUT bhejna chahte the.

Browser turant bol dega:
CORS Error
Method PUT is not allowed.

Aur actual PUT request kabhi bheji hi nahi jayegi.

# Kab Preflight hoti hai?

Preflight hoti hai jab:
Method -> PUT,PATCH,DELETE
Custom headers (Authorization, X-API-Key, etc.)
Content-Type: application/json (aksar preflight trigger karta hai)

# Express mein kaise handle hoti hai?

To OPTIONS request automatically handle ho jati hai.

Ya manually:
app.options("\*", cors());
