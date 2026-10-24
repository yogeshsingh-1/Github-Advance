# What is Prometheus ?

Prometheus ek monitoring tool hai jo tumhari application ke metrics collect aur store karta hai. Matlab application kitni fast chal rahi hai, CPU kitna use ho raha hai, kitni requests aa rahi hain aur kitne errors ho rahe hain, ye sab track kar sakte ho.

1. Prometheus kya karta hai?

Metrics collect karta hai

Jaise total HTTP requests, request duration, error count, CPU aur memory usage.

Metrics store karta hai

Time-series format mein data store hota hai, yani kis time par metric ki value kitni thi.

Queries aur alerts

PromQL naam ki query language se metrics analyze kar sakte ho aur conditions ke basis par alerts trigger kar sakte ho.

Grafana Loki: Application logs mein kya hua?

# Maan lo tumhara Node.js backend production mein chal raha hai. Prometheus ye metrics monitor kar sakta hai:

- Request count: Kitni API requests aayi hain?
- Error rate: Kitni requests fail hui hain, jaise HTTP 500?
- Response time: API response dene mein kitna time le rahi hai?
- CPU usage: Server kitna CPU use kar raha hai?
- Memory usage: Application kitni RAM use kar rahi hai?

# What is promql?

PromQL (Prometheus Query Language) ek query language hai jiska use hum Prometheus se metrics ka data retrieve, filter aur calculate karne ke liye karte hain.

Simple example: Tum apne Node.js backend mein dekhna chahte ho ki server par kitni requests aa rahi hain, kitni requests fail ho rahi hain aur CPU usage kitna hai. Ye sab metrics Prometheus mein collect ho sakte hain aur PromQL se tum inhe query kar sakte ho.
