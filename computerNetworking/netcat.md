**NC (Netcat)** ek networking utility tool hai jo Linux/Unix systems mein use hota hai. Isse "networking ka Swiss Army knife" bhi kaha jata hai kyunki ye bohot flexible hai.

## NC kya karta hai

NC (netcat) TCP aur UDP connections ke through data read/write karne ka kaam karta hai. Simple shabdon mein, ye do computers/programs ke beech raw network connection bana deta hai.

## Iske main uses

**1. Port scanning**
Check karne ke liye ki kaunse ports open hain kisi machine par:
```
nc -zv example.com 80
```

**2. Chat/messaging (simple)**
Do machines ke beech directly text messages bhejne ke liye — ek server mode mein sunta hai, dusra connect karta hai.

**3. File transfer**
Bina kisi FTP/SCP setup ke files bhej sakte ho:
```
# Receiver
nc -l 1234 > file.txt

# Sender
nc <IP> 1234 < file.txt
```

**4. Banner grabbing**
Kisi service (jaise SSH, HTTP server) ka version/info nikalna, jo security testing mein useful hai.

**5. Debugging network services**
Server-client communication test karne ke liye — jaise manually HTTP request bhej kar dekhna server kaise respond karta hai.

**6. Simple backdoor/reverse shell (security context mein)**
Penetration testing aur cybersecurity mein iska use hota hai, lekin ye sensitive area hai isliye main uske technical details nahi de sakta — ye malicious use ke liye bhi kaafi common tool hai.

**7. Port forwarding / proxying**
Traffic ko ek port se dusre port tak redirect karne ke liye.

## Kyun useful hai

- Lightweight hai, zyada tar Linux distros mein pre-installed hota hai
- Scripting mein easily use ho jata hai
- Network troubleshooting ke liye quick aur simple tool hai
- Bina complex setup ke raw TCP/UDP connections test kar sakte ho

Agar tum koi specific use-case try kar rahe ho (jaise file transfer ya port scanning), bata dena — main us specific command ka example de sakta hoon.