# What is wireshark?

Wireshark ek network analysis tool hai jiska use hum network ke through jaane wale data packets ko capture aur analyze karne ke liye karte hain. Simple words mein, ye batata hai ki tumhara computer network par doosre systems ke saath kaise communicate kar raha hai.

Maan lo tum apne Node.js backend par API call karte ho:

Jab ye request network ke through travel karti hai, to data packets mein transfer hota hai. Wireshark in packets ko capture karke unki details inspect karne mein help karta hai.

Tum dekh sakte ho:

- Kaunse IP address se communication ho rahi hai.
- Kaunsa protocol use ho raha hai, jaise TCP, UDP, DNS ya HTTP.
- Kaunse ports par communication ho rahi hai.
- TCP connection establish ho raha hai ya fail.
- Network mein packets drop ya retransmit ho rahe hain ya nahi.

Wireshark network interface, jaise Wi-Fi ya Ethernet, par visible packets capture karta hai. Ye har network ka saara traffic automatically nahi dekh sakta, kyunki visibility interface, permissions, encryption aur network configuration par depend karti hai.