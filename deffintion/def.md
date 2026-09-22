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
