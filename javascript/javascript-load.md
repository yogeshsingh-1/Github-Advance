# Script tag ke saare important options :-

HTML ke <script> tag mein JavaScript load karne ke multiple options hote hain. Inka purpose hai decide karna ki JavaScript kab download hogi, kab execute hogi, aur HTML parsing ko block karegi ya nahi.

HTML mein JavaScript load karne ke ye main options hain:

1. Normal script
2. defer
3. async
4. type="module"
5. type="module" with async
6. defer with async (generally avoid combining unnecessarily)
7. type="importmap" (module imports configure karne ke liye)

Bhai, HTML ke <script> tag ke ye saare options samajhne ke liye bas 3 cheezein clear karni hain:
1. Download: JavaScript file browser mein kab download hogi.
2. Execute: JavaScript code kab run hoga.
3. HTML parsing: Browser HTML ko read karke DOM kab banayega.

# Normal script: Default behavior

1. HTML parsing start hoti hai.

2. Script milti hai, HTML parsing rukti hai.

3. JavaScript download aur execute hoti hai.

4. HTML parsing dobara continue hoti hai.

# defer attribute
<script src="./app.js" defer></script>

defer ka matlab hai: script download karte raho, HTML parsing ko mat roko, aur HTML parse hone ke baad script execute karo.

# async attribute
async ka matlab hai: script ko asynchronously download karo aur jaise hi download complete ho, execute kar do.

# type="module"
Ye modern JavaScript modules load karne ke liye use hota hai.
Module system mein tum import aur export use kar sakte ho.

- Module scripts by default defer jaisa behavior karti hain.
- HTML parsing ke saath module files download ho sakti hain.
- Main module ki dependencies bhi load hoti hain.
- Module execute hone se pehle uski required dependencies ready honi chahiye.
- Module code strict mode mein execute hota hai.
- Top-level variables aur functions automatically window ka part nahi bante.
- Modules ko file:// se kholne par CORS errors aa sakte hain, isliye local development server use karna better hai.
Important: type="module" ke saath defer likhna zaroori nahi hai.

# type="module" with async
<script type="module" src="./app.js" async></script>

Normal module script HTML parsing complete hone ke baad execute hoti hai. Lekin async module script tab execute ho sakti hai jab uska module aur uski dependencies ready ho jaayein, bhale hi HTML parsing abhi chal rahi ho.

# defer with async
<script src="./app.js" defer async></script>

Classic external script ke liye async aur defer dono present hon to async behavior apply hota hai. Script download complete hote hi execute ho sakti hai.
Yaani defer ka ordered execution wala benefit yahan nahi milega.

Module scripts mein defer ka koi extra effect nahi hota, kyunki modules default se deferred hote hain. async add karne se async execution behavior apply hota hai.
Recommendation: Dono attributes ko ek saath tabhi use karo jab tumhe exactly async behavior chahiye aur tumhara reason clear ho. Warna ek hi attribute choose karo. HTML ko unnecessary riddles dene ki zaroorat nahi.


# 
Normal = download aur execute ke liye HTML parsing ruk sakti hai.

defer = download parallel, execution baad mein aur order maintained.

async = download parallel, execution jaldi aur order guaranteed nahi.

module = modern imports/exports + default deferred behavior.

module async = module ready hote hi execute ho sakta hai.

defer async = classic scripts mein async behavior.

importmap = module imports ke naam resolve karne ka configuration map.