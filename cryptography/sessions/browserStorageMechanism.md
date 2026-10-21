# Browser session storage mechanism:-
Application tab → Storage mein jo Local Storage, Session Storage, Cookies aur Extension Storage dikhte hain, ye browser ke alag-alag data storage mechanisms hain.


1. Local Storage
Website storage
Jab website JavaScript se localStorage.setItem() call karti hai, tab data store hota hai.
localStorage.setItem("userId", "101");


- Browser restart ke baad bhi data usually rehta hai.
- Same origin ki pages ise access kar sakti hain.
- Tab close karne se data delete nahi hota.

2. Session Storage
Per-tab storage
Jab website sessionStorage.setItem() call karti hai, tab data store hota hai.
sessionStorage.setItem("step", "2");


- Current tab ke page session se associated hota hai.
- Reload karne par data rehta hai.
- Tab close hone par us tab ka session storage normally clear ho jata hai.


3. Cookies
Website and server
Cookies server ke Set-Cookie response header se ya JavaScript ke document.cookie se set ho sakti hain, agar unke attributes allow karein.
document.cookie = "theme=dark; path=/";


- Requests ke saath automatically bheji ja sakti hain, cookie rules ke according.
- Session cookies aur persistent cookies dono hoti hain.
- HttpOnly cookies JavaScript se accessible nahi hoti.

4. Extension Storage
Browser extension
Ye Chrome extension ka storage hota hai, normal website ka nahi.
// Chrome extension ke context mein
chrome.storage.local.set({
  userId: 101
});


- Extension ko storage permission chahiye.
- Data extension ke context mein manage hota hai.
- chrome.storage.local ka data aam taur par browser restart ke baad bhi rehta hai.


## Browser Storage

### 1. Cookie
- **Kahan store hoti hai:** Browser mein
- **Kaun create karta hai:** Server ya Frontend JavaScript
- **Use:** User session, authentication, preferences

### 2. Session Data
- **Kahan store hota hai:** Server par, jaise Redis ya Database
- **Kaun create karta hai:** Backend
- **Use:** User ki session information store karna

### 3. Local Storage
- **Kahan store hota hai:** Browser mein
- **Kaun create karta hai:** Frontend JavaScript
- **Use:** Data ko browser mein persistently store karna

### 4. Session Storage
- **Kahan store hota hai:** Browser mein, current tab ke page session ke liye
- **Kaun create karta hai:** Frontend JavaScript
- **Use:** Temporary tab-related data store karna

### 5. Extension Storage
- **Kahan store hota hai:** Browser extension ke storage mein
- **Kaun create karta hai:** Browser Extension Code
- **Use:** Extension ka data store karna