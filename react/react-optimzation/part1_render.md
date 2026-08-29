# Agar react mai kisi parent per koi state hai toh ushe parent ke render hone per pure child bhi re-render hote hai.

Agar kisi parent component mein state hai aur us state ko update kiya jata hai, toh parent component re-render hota hai.

Parent ke re-render hone par uske child components bhi by default re-render ho sakte hain, kyunki parent apne JSX ko dobara evaluate karta hai.

```
Solution: State ko Lower Level par Rakhna

Agar state ka use sirf kisi particular child component mein ho, toh us state ko parent mein rakhne ki zarurat nahi hai.

State ko usi component mein rakhna better hai jahan uski actual requirement hai.

- Important Rule

Keep state as close as possible to the component that actually needs it.
```

# 
