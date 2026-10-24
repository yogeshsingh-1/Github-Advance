# Wireshark

# Grafana Tempo

# Prometheus

Grafana Tempo hume batata hai ki ek API request application ke andar kahan-kahan gayi, har step mein kitna time laga, aur delay kis step par hua.

Grafana Tempo hume kya-kya batata hai?

1. Request ka flow: Request kaun-kaun si services se guzri.
2. Har step ka duration: Database query, API call ya doosre operation mein kitna time laga.
3. Bottleneck: Request slow kahan hui.
4. Errors aur failed operations: Agar instrumentation error information record karti hai, toh trace mein failure ka context dekh sakte ho.
5. Services ke beech relationship: Ek service ne doosri service ko kab call kiya aur unke spans kaise connected hain.

Grafana Tempo: Request slow kahan hui?

# Prometheus

Prometheus ek monitoring tool hai jo tumhari application ke metrics collect aur store karta hai. Matlab application kitni fast chal rahi hai, CPU kitna use ho raha hai, kitni requests aa rahi hain aur kitne errors ho rahe hain, ye sab track kar sakte ho.

1. Prometheus kya karta hai?

Metrics collect karta hai

Jaise total HTTP requests, request duration, error count, CPU aur memory usage.

Metrics store karta hai

Time-series format mein data store hota hai, yani kis time par metric ki value kitni thi.

Queries aur alerts

PromQL naam ki query language se metrics analyze kar sakte ho aur conditions ke basis par alerts trigger kar sakte ho.

Grafana Loki: Application logs mein kya hua?
