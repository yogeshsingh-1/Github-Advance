# Publish-Subscribe (Pub/Sub) Architecture

## What is Pub/Sub?

**Publish-Subscribe (Pub/Sub)** is a messaging pattern where a **Publisher** sends messages (events) to a **Message Broker**, and one or more **Subscribers** receive those messages.

The publisher and subscribers **do not know about each other**, making the system **loosely coupled**.

---

# Real-Life Example

Imagine you upload a video to YouTube.

When the upload is complete, many tasks happen:

- Send notifications
- Generate thumbnail
- Update search index
- Process video quality (1080p, 720p, etc.)
- Update analytics

Instead of YouTube directly calling every service, it publishes a **VideoUploaded** event.

Every interested service automatically receives the event.

---

# Architecture

```text
                  Publish Event
                        |
                        V
               +------------------+
               | Message Broker   |
               +------------------+
              /    |      |      \
             /     |      |       \
            V      V      V        V
       Email   Inventory  SMS   Invoice
       Service   Service Service Service
```

---

# Components

## 1. Publisher

The publisher creates and sends messages.

Example:

```text
Order Service
```

Publishes:

```text
OrderPlaced
```

The publisher does **not** know who receives the message.

---

## 2. Message Broker

The broker receives messages from publishers and delivers them to subscribers.

Popular Message Brokers:

- Apache Kafka
- RabbitMQ
- Redis Pub/Sub
- Google Pub/Sub
- AWS SNS
- Azure Service Bus

Responsibilities:

- Receive messages
- Deliver messages
- Store messages (depending on broker)
- Retry failed deliveries
- Route messages

---

## 3. Subscriber

Subscribers listen for specific events.

Example:

```text
Email Service
```

When it receives:

```text
OrderPlaced
```

It sends a confirmation email.

---

# Complete Flow

```text
Customer

   |

Place Order

   |

Order Service

   |

Publish Event (OrderPlaced)

   |

Message Broker

   /   |   |   \

Email Inventory SMS Invoice
```

---

# Problem Without Pub/Sub

Suppose a customer places an order.

The Order Service needs to:

- Send Email
- Update Inventory
- Send SMS
- Generate Invoice

Without Pub/Sub:

```text
            +----------------+
            | Order Service  |
            +----------------+
               |   |   |   |
               |   |   |   |
               V   V   V   V
           Email Inventory SMS Invoice
```

Problems:

- Tight coupling
- Slow response
- Difficult to maintain
- If one service fails, the whole request may fail

---

# Solution Using Pub/Sub

```text
            +----------------+
            | Order Service  |
            +----------------+
                    |
           Publish OrderPlaced
                    |
                    V
           +------------------+
           | Message Broker   |
           +------------------+
             |    |    |    |
             V    V    V    V
          Email Inventory SMS Invoice
```

Now the Order Service only publishes an event.

Every subscriber works independently.

---

# Why Do We Use Pub/Sub?

## 1. Loose Coupling

Without Pub/Sub:

```text
Order ---> Email
Order ---> SMS
Order ---> Inventory
Order ---> Invoice
```

With Pub/Sub:

```text
Order

  |

Broker

  |

Subscribers
```

Publisher doesn't know subscribers.

---

## 2. Asynchronous Processing

Without Pub/Sub:

```text
Save Order

↓

Wait Email

↓

Wait Inventory

↓

Wait SMS

↓

Return Success
```

The user waits.

With Pub/Sub:

```text
Save Order

↓

Publish Event

↓

Return Success

↓

Background Services Continue Processing
```

Much faster.

---

## 3. Scalability

Suppose Email Service receives thousands of requests.

We can simply add more workers.

```text
Email Queue

     |

-------------------------

|         |            |

Worker1 Worker2 Worker3
```

Multiple workers process messages simultaneously.

---

## 4. Reliability

If Inventory Service is temporarily down:

```text
Inventory Service

↓

Down
```

The broker can keep the message (depending on the broker) and deliver it later.

---

## 5. Easy to Add Features

Need WhatsApp notifications?

Simply create:

```text
WhatsApp Service
```

Subscribe it to:

```text
OrderPlaced
```

No changes are required in the Order Service.

---

# Advantages

| Advantage          | Description                                            |
| ------------------ | ------------------------------------------------------ |
| Loose Coupling     | Services don't depend on each other                    |
| Better Performance | Background processing                                  |
| High Scalability   | Easy to add more consumers                             |
| Easy Maintenance   | Less code dependency                                   |
| Fault Tolerance    | Broker can retry or buffer messages (broker-dependent) |
| Easy Extension     | Add new subscribers without changing publishers        |

---

# Disadvantages

| Disadvantage         | Description                                     |
| -------------------- | ----------------------------------------------- |
| Complex Architecture | Requires a message broker                       |
| Hard Debugging       | Difficult to trace events                       |
| Eventual Consistency | Data updates may not happen immediately         |
| Duplicate Messages   | Consumers should handle duplicate events safely |
| Ordering Issues      | Message order may not always be guaranteed      |

---

# Where Can We Use Pub/Sub?

## 1. E-Commerce

Events:

- OrderPlaced
- PaymentCompleted
- ProductAdded
- ShipmentCreated

Subscribers:

- Email Service
- Inventory Service
- Billing Service
- Notification Service

---

## 2. Banking

Events:

- MoneyTransferred
- PaymentSuccess
- AccountCreated

Subscribers:

- Notification
- Fraud Detection
- Audit Logs

---

## 3. ERP Systems

Events:

- SalesInvoiceCreated
- DeliveryChallanCreated
- PurchaseCreated

Subscribers:

- Inventory
- Accounting
- GST
- Email

---

## 4. Social Media

Events:

- NewPost
- NewComment
- NewLike
- FollowUser

Subscribers:

- Notification
- Analytics
- Recommendation Engine

---

## 5. IoT

Events:

- TemperatureChanged
- DeviceOnline
- DeviceOffline

Subscribers:

- Monitoring
- Alert Service
- Dashboard

---

## 6. Chat Applications

Events:

- MessageSent
- UserOnline
- UserOffline

Subscribers:

- Notification
- Chat Server
- Database

---

# Redis Pub/Sub Example (Node.js)

## Publisher

```javascript
import { createClient } from "redis";

const publisher = createClient();

await publisher.connect();

await publisher.publish(
  "order",
  JSON.stringify({
    orderId: 101,
    customer: "John",
  }),
);
```

---

## Subscriber

```javascript
import { createClient } from "redis";

const subscriber = createClient();

await subscriber.connect();

await subscriber.subscribe("order", (message) => {
  console.log(JSON.parse(message));
});
```

Output:

```text
{
    orderId: 101,
    customer: "John"
}
```

---

# Redis Pub/Sub vs RabbitMQ vs Kafka

| Feature         | Redis Pub/Sub      | RabbitMQ    | Kafka                     |
| --------------- | ------------------ | ----------- | ------------------------- |
| Message Storage | ❌ No              | ✅ Yes      | ✅ Yes                    |
| Persistence     | ❌ No              | ✅ Yes      | ✅ Yes                    |
| Retry Support   | ❌ No              | ✅ Yes      | ✅ Yes                    |
| Ordering        | Basic              | Queue-based | Strong Partition Ordering |
| Best For        | Live notifications | Task queues | Event streaming           |
| Speed           | Very Fast          | Fast        | Very Fast                 |

---

# ERP Example

Suppose a Sales Invoice is created.

Publisher:

```text
Sales Service
```

Publishes:

```text
SalesInvoiceCreated
```

Subscribers:

```text
Inventory Service
```

Action:

```text
Reduce Stock
```

---

```text
Accounting Service
```

Action:

```text
Create Ledger Entry
```

---

```text
GST Service
```

Action:

```text
Generate E-Invoice
```

---

```text
Email Service
```

Action:

```text
Send Invoice Email
```

The Sales Service does not know who processes the event.

---

# Interview Questions

## What is Pub/Sub?

A messaging pattern where publishers send events to a broker, and subscribers receive those events independently.

---

## Why use Pub/Sub?

- Loose coupling
- Asynchronous communication
- Better scalability
- Better reliability
- Easier maintenance

---

## What is a Message Broker?

A system that receives, stores (if supported), and delivers messages between publishers and subscribers.

Examples:

- Kafka
- RabbitMQ
- Redis Pub/Sub

---

## Is Pub/Sub synchronous?

No.

It is generally **asynchronous**, meaning the publisher does not wait for subscribers to finish processing.

---

## When should we avoid Pub/Sub?

Avoid Pub/Sub when:

- Immediate response is required
- Request-response communication is needed
- User is waiting for instant data

Examples:

- Login
- Password validation
- Fetch user profile
- Payment verification before checkout

---

# Summary

```text
               Publisher
                    |
                    | Publish Event
                    V
          +----------------------+
          |   Message Broker     |
          +----------------------+
            |       |        |
            |       |        |
            V       V        V
        Email   Inventory   SMS
        Service  Service   Service
```

## Key Points

- Publisher sends events.
- Broker delivers events.
- Subscribers process events.
- Publisher and subscribers are independent.
- Pub/Sub improves scalability, performance, and maintainability.
- Commonly used in Microservices, ERP, Banking, E-Commerce, IoT, and Real-Time Systems.
