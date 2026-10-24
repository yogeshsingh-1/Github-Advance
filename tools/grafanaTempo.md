# What is Grafana Tempo?

Grafana Tempo ek distributed tracing backend hai, jiska use tum Node.js application mein kisi request ka complete journey track karne aur ye identify karne ke liye karte ho ki request slow kahan ho rahi hai.

Simple example: Tumhare ERP backend mein invoice API ko response dene mein 3 seconds lag rahe hain. Tempo ki help se tum dekh sakte ho ki time Express route mein laga, business logic mein, PostgreSQL query mein, ya kisi doosri service ko call karne mein.

1. Grafana Tempo kaise kaam karta hai?

2. Trace aur Span kya hote hain?
   Ye do concepts Tempo samajhne ke liye important hain.

- Trace: Ek request ka end-to-end journey.
- Span: Us journey ka ek particular operation, jaise database query ya HTTP call.
  Maan lo tumhari API ye kaam karti hai:
