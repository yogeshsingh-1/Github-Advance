# What is a Session?

Session ek mechanism hai jiske through application multiple HTTP requests ke beech user ki identity ya related information ko maintain kar sakti hai.

HTTP protocol by default stateless hai. Matlab server ko automatically yaad nahi rehta ki do alag requests same user ne bheji hain.

but session ko hum only authentication ke liye use nhi karte hum ushe other cheezo ke liye bhi use karte hai like add to cart function without login.

session ko hum cookie mai storage karte hai. jo ki hme refer karta hai user related information.

sessionId hume help karti for getting a session related data from server.
session id hume help karti hai , ki jo data server per store hai ushe get karne per.

ye data hum server ki memory/RAM , ya server ki kisi file or Database/Redis mai store kar skte hai.

generatlly hum database/redis mai store karte hai.

Jab hum RAM ki baat karte hai toh iska matlab ki variable mai store kar rhe hai iska matlab ye hai ki array mai store kar rhe hai.

jab file mai store karte hai toh isko matlab hum kisi json file mai store kar rhe hai.

best practice for store sesssion - Database.
because agar server start bhi hua toh toh uska session ka data humsea Database mai persist rhga.

- A session a mechanism that allows a server to associate information with a specific user.

whether authenticated or not-accross multiple requests.

This is done by issuing a unique identifier to the client.
Depending on the implmentation, this identifier either.

1. Reference session data stored on the server (stateful)
2. Contains all necessary information itself (stateless)

enabling the server to recognize and maintain continutoy for the user's interactions

# A session is a mechanism that can identify each request are

http ek stateless protocal hai.
ki woh ek request se dusre request tak dhyaan nhi rkta hai ki ye same user ki request hai.

agar hume ye identify karna hai ki woh request same user se aa rhi hai toh hum har request ke header mai ek identityfier add karte hai(Header,cookie)

# cookie bhi ek header ho jo automatically every request mai attach ho jata hai ,when hum withCredenitails :true karte hai.

withCredentials:true

lekin jo bhi identifier hum server se send karte hai. ushe hum localstorage mai save nhi karte hai.
usko http-only cookie mai store karna chaiye ,warna woh cross site scripting ke vulnerable ho jata hai.

# Types of Session

session ko store karne ke way.

- Stateless session
  contain all session related information iteself.

client he sari session se related information ko store karega.(like cookie).
and server per kuch bhi na change kare.

- Statefull session

References session data stored on the server.

hum session ko apne memory or file or db mai store kare.

Session-related information server par store hoti hai.

Client ke paas usually ek Session ID hoti hai, jo cookie ke through server ko bheji jaati hai.

Server Session ID ki help se actual session data retrieve karta hai.

Session data store karne ke common methods:

- In-memory storage

- File storage

- Database storage

- Redis (in-memory data store)

Example: Express Session + Redis.
