# What is GrafanaLoki?

Grafana Loki ek log aggregation system hai, jiska use tum apni Node.js application ke logs ko collect, store, search aur analyze karne ke liye kar sakte ho.

Maan lo tumhara Express backend production mein chal raha hai aur kisi customer ko invoice create karte waqt error aa raha hai. Server par hazaaron log messages hain. Loki ki help se tum relevant error logs search karke problem investigate kar sakte ho, instead of server par manually files kholte rehna.

1. Grafana Loki kya karta hai?

Dhyan do: Loki khud application se logs collect karne ka kaam aam taur par nahi karta. Tumhe Grafana Alloy jaise agent ya kisi compatible log shipper ki zaroorat hoti hai.