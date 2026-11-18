# Network and Networking ?

- Jab do ya do se zyada devices aapas mein connected hote hain aur ek-dusre ke saath data/resources share kar sakte hain, us connection/system ko network kehte hain.

- Do ya do se zyada devices ke beech data/information exchange karne ka process networking kehlata hai.

# Networking ka imp concept

| Concept         | Simple meaning                                        |
| --------------- | ----------------------------------------------------- |
| **IP Address**  | Device/server ka network address                      |
| **MAC Address** | Network interface ki hardware-level identity          |
| **Port**        | Kisi application/service ka entry point               |
| **Protocol**    | Communication ke rules                                |
| **TCP**         | Reliable communication                                |
| **UDP**         | Fast communication, reliability application par       |
| **HTTP/HTTPS**  | Web communication                                     |
| **DNS**         | Domain name → IP address                              |
| **Router**      | Different networks ke beech traffic forward karta hai |
| **Switch**      | Same local network ke devices connect karta hai       |
| **Firewall**    | Traffic ko allow/block karta hai                      |
| **NAT**         | Private IP aur public IP ke beech translation         |
| **Subnet**      | Network ko smaller networks me divide karna           |

# What is DNS Lookup

A DNS (Domain Name System) lookup is the process of translating human-readable website names (e.g., google.com) into machine-readable IP addresses (e.g., 192.168.1.1).

example.com -> 192.168.1.1

# What is OpenSSH? ssh -V (V Capital)

OpenSSH ek open-source implementation hai jo SSH (Secure Shell) protocol provide karti hai.

OpenSSH ka use remote computer se securely connect karne ke liye hota hai.

Ye network ke through do computers ke beech encrypted (secure) communication establish karta hai.

SSH ka full form hai -> Secure Shell

ssh username@192.168.1.10

ssh ubuntu@ec2-xx-xx-xx-xx.compute.amazonaws.com

# What is Polling ?

Polling is a technique where the client periodically sends requests to the server to check whether the required data or status has changed.

And pooling is a different concept, such as database connection pooling, where reusable DB connections are maintained instead of creating a new connection for every request.

# What is Webhook ?

A webhook is a mechanism where one server automatically sends an HTTP request to another server when a specific event occurs.

A webhook is a server-to-server callback mechanism in which a service sends an HTTP request to a predefined URL when a particular event occurs.

Webhook = Event happens → Server automatically notifies another server.

# Polling: "Has the payment completed?" → repeatedly asks.

# Webhook: "Payment completed!" → gateway tells you automatically.

# What is Reverse Proxy ?

A Reverse Proxy is a server that sits between the client and your backend server.

Instead of the client directly communicating with your Node.js application, the client sends requests to the Reverse Proxy, which forwards those requests to your backend server.

Why do we need Reverse Proxy?

1. Security: Hide your internal application ports from direct public access.
2. SSL/TLS: Handle HTTPS certificates.
3. Routing: Forward different URLs to different backend applications.
4. Compression: Compress responses.
5. Load Balancing: Distribute requests across multiple backend servers.

# What is Load Balancing?

Load Balancing means distributing incoming requests across multiple backend servers instead of sending every request to one server.

Suppose your ERP application has 10,000 users.

If all users send requests to one Node.js server, that server may become overloaded.

Instead, you can run three Node.js instances.

Why do we need Load Balancing?

1. Distribute traffic across multiple servers.
2. Prevent one server from becoming overloaded.
3. Improve application availability.
4. Support horizontal scaling.
5. Route traffic away from unhealthy servers when health checks are configured.

# Difference between Reverse Proxy and Load Balancer?

This is the most important distinction.
Reverse Proxy Load Balancer
Acts as an intermediary between clients and backend servers. Distributes traffic across multiple backend servers.
Can forward requests to one server or multiple servers. Usually works with multiple server instances.
Provides SSL termination, routing, caching, etc. Provides traffic distribution and availability.
Can work with a single backend. Needs multiple backends to distribute traffic.
Example: Nginx, Caddy Example: Nginx, HAProxy, AWS ALB

Remember:

- Reverse Proxy = Receives and forwards requests.
- Load Balancer = Decides which backend server should receive a request.
