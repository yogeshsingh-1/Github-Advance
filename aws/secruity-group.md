# Security Group
Security Group ek virtual firewall hai jo EC2 instance ke aage laga hota hai. Ye decide karta hai ki kaunsa traffic instance ke andar aa sakta hai (Inbound) aur kaunsa traffic bahar ja sakta hai (Outbound). Iske liye hum rules define karte hain.

# Security Group

A **Security Group** acts like a **virtual firewall** for an AWS EC2 instance.

It controls **who can connect to your instance** and **what traffic is allowed to leave the instance** by using a set of inbound and outbound rules.

## Types of Rules

### 1. Inbound Rules (Incoming Traffic)

These rules control the traffic **coming into** your EC2 instance.

Examples:

- SSH → Port **22**
- HTTP → Port **80**
- HTTPS → Port **443**

---

### 2. Outbound Rules (Outgoing Traffic)

These rules control the traffic **leaving** your EC2 instance.

For example:

- Accessing the internet
- Downloading packages using `apt`
- Connecting to a database
- Calling external APIs

---

## Example

Suppose you have a Node.js application running on an EC2 instance.

To access it:

- Allow **SSH (22)** → So you can log in to the server.
- Allow **HTTP (80)** → So users can access your website.
- Allow **HTTPS (443)** → For secure (SSL/TLS) connections.

If Port **80** is not allowed in the Security Group, users won't be able to open your website, even if Nginx or your application is running correctly.

---

## Key Points

- A Security Group is attached to an EC2 instance.
- It acts as a **virtual firewall**.
- It controls both **inbound** and **outbound** traffic.
- It is **stateful**, meaning if inbound traffic is allowed, the response traffic is automatically allowed—you don't need a separate outbound rule for the response.


# Note 
AWS mai aane wale traffic (Inbound rule ) ko define kar skte hai. but jaane wale rule (Outbound rule) ko define nhi kar skte hai.