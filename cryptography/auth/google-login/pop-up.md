# Pop in javascript ?

JavaScript mein window.open() ka use kisi URL ko new browser tab ya popup window mein open karne ke liye hota hai.

1. Syntax
   window.open(url, target, features);

- url: Kaunsa page open karna hai.
- target: Page kahan open hoga.
- features: Popup window ki settings, jaise width aur height.


2. Examples
Example 1: New tab open karna
window.open("https://google.com", "_blank");


Google ek new tab mein open hoga, agar browser allow kare.
Example 2: Same tab mein open karna
window.open("https://google.com", "_self");


Current tab mein Google open hoga. Normal navigation ke liye window.location.href bhi use kar sakte ho.
Example 3: Popup window open karna
window.open(
  "https://example.com",
  "_blank",
  "width=600,height=400"
);


Browser support aur settings ke hisaab se 600 × 400 dimensions ki popup window khul sakti hai.
3. target ke important values
Target	Meaning
_blank	New tab/window
_self	Current tab
_parent	Parent browsing context
_top	Top-level browsing context
4. Button click par popup open karna
<button onclick="openGoogle()">Open Google</button>

<script>
  function openGoogle() {
    window.open("https://google.com", "_blank");
  }
</script>


Yahan popup user ke button click se open hota hai, isliye browser ke use allow karne ki possibility zyada hoti hai. Browsers aam taur par bina user interaction ke khulne wale popups ko block kar dete hain.
5. Tumhare Google OAuth code mein iska use
Tumne likha tha:
window.open("/", "_blank", "width=600,height=400");


Iska matlab hai current website ka root page ek naye browsing context mein kholne ki koshish karna.
Lekin dhyan do: window.open() apne aap Google login nahi karta, na hi token generate karta hai. Ye sirf page kholne ke liye hai.
Agar tum Google login ko popup mein kholna chahte ho, toh Google authorization URL ko window.open() mein pass karna hoga, aur callback communication aur state validation bhi properly handle karni hogi.