# How Prometehus work?

Prometheus work karta hai , Pull mechanism per.

Prometheus by default Pull Mechanism par work karta hai. Iska matlab Prometheus khud tumhari application ya Exporter se metrics fetch karta hai.

Prometheus generally HTTP protocol par work karta hai.

# types of meteric sending mechanism (Pull vs Push)

- Pull
  Pull mechanism Push mechanism
  Prometheus metrics fetch karta hai
  Exporter endpoint expose karta hai
  Prometheus ka default model

- Push
  Application ya sender metrics bhejta hai
  Receiver ko data bheja jata hai
  Pushgateway jaise tools se possible

# Promethus metrics?

Metric kisi system ya application ki performance, condition ya activity ko measure karne wali numerical value hoti hai.

Maan lo tumhari Node.js application server par chal rahi hai. Tumhe pata karna hai:

- CPU kitna use ho raha hai?
- RAM kitni use ho rahi hai?
- Kitni API requests aa rahi hain?
- Kitni requests fail ho rahi hain?
- API response dene mein kitna time le rahi hai?
  In sab cheezon ko measure karne ke liye jo numerical data milta hai, use metrics kehte hain.

Durso ke liye jeena chod doh. live for you.

# Promethus Exporter?

Exporter ka kaam metrics ko Prometheus ke samajhne layak format mein expose karna hai.

Exporter: Metrics expose karne wala program.

Metrics ko readable format mein expose karta hai

# Promethus Agent?

Agent ek software/process hota hai jo server ya application se metrics collect karne mein help karta hai aur unhe monitoring system tak pahunchata hai.

Agent ko example se samjho
Maan lo tumhare paas 3 servers hain:

- Server A: Node.js application
- Server B: PostgreSQL database
- Server C: Linux server

Tumhe in teeno ki CPU, memory aur performance monitor karni hai.

# Prometheus mein Agent aur Exporter kya hain?
