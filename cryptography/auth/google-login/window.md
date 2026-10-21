# windpw.open(url,target,feature)

JavaScript mein window.open() ka use kisi URL ko new browser tab ya popup window mein open karne ke liye hota hai.

# windpw.opener

window.opener current window ko open karne wali doosri window ka reference deta hai.
Maan lo tumhare paas do files hain:
- index.html: original page
- popup.html: popup page

window.opener ka use new window ya popup se us original window ko access karne ke liye hota hai jisne us popup ko open kiya tha.

window.open() popup kholta hai, aur popup ke andar window.opener original window ka reference deta hai.

Property Use
window.opener Us window ka reference jisne current window open kiya
window.parent Current page ko contain karne wali parent window, usually iframe mein
window.top Sabse outermost browsing window

window.opener -> null (null value ka matalab hai ki ishe hmne hath se open kiya hai.)

# window.opener.close()

# window.name

window.name JavaScript ki ek property hai jisme tum current browser window ya tab ka naam store kar sakte ho. Iska use popup ko identify karne aur usi named window ko dobara reuse karne mein hota hai.
Ek important difference: window.name window ka naam hai, HTML page ka filename nahi.

# window.opener.postMessage("Hi from PopUp.");
