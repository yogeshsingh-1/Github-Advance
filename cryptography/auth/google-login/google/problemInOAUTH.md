# Problem in window.opener.postMessage

Cross-Origin-Opener-Policy policy would block the window.postMessage call.

यह error क्यों आ रहा है?

यही वह COOP समस्या है जिसका ज़िक्र मैंने पिछले जवाब में किया था। जब आपका popup Google के login पेज पर जाता है, तो Google अपने पेज पर यह header लगाता है:

Cross-Origin-Opener-Policy: same-origin

इसका असर यह होता है कि popup और उसे खोलने वाले पेज के बीच का connection टूट जाता है। जब popup वापस आपके localhost:5500/callback.js पर लौटता है, तब भी browser उस window.opener को block कर देता है, इसलिए postMessage नहीं चल पाता।

# समाधान 1: BroadcastChannel इस्तेमाल करें (सबसे आसान)

window.opener की जगह BroadcastChannel से दोनों पेज आपस में बात कर सकते हैं। शर्त बस यह है कि दोनों पेज एक ही origin (localhost:5500) पर हों।

callback.js (popup में):

javascript
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (code) {
const channel = new BroadcastChannel("oauth");
channel.postMessage({ code });
channel.close();
window.close();
}

मुख्य पेज में:

javascript
const channel = new BroadcastChannel("oauth");

channel.onmessage = async (event) => {
const { code } = event.data;

await fetch("http://localhost:4000/google/callback", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ code }),
});

channel.close();
};

window.open(googleAuthUrl, "oauth", "width=500,height=600");

इसमें window.opener या window.name की जाँच की ज़रूरत ही नहीं रहती, इसलिए COOP का कोई असर नहीं पड़ता।

समाधान 2: Popup की जगह redirect इस्तेमाल करें

Popup हटाकर सीधा पूरे पेज को Google पर भेजें:

window.location.href = googleAuthUrl से login शुरू करें
Google आपको callback पेज पर वापस भेजेगा
वहीं code निकालकर backend को भेजें, फिर मुख्य पेज पर redirect कर दें

यह तरीका सबसे भरोसेमंद है, क्योंकि इसमें popup और opener का झंझट ही नहीं है।

समाधान 3: localStorage event (विकल्प)
javascript
// callback.js में
localStorage.setItem("oauth_code", code);
window.close();

// मुख्य पेज में
window.addEventListener("storage", (e) => {
if (e.key === "oauth_code") {
const code = e.newValue;
localStorage.removeItem("oauth_code");
// code को backend पर भेजें
}
});
ध्यान रखने वाली बातें
Header बदलने से हल नहीं होगा: COOP header Google लगा रहा है, आप उसे बदल नहीं सकते। आपके अपने server पर Cross-Origin-Opener-Policy: unsafe-none लगाने से भी अक्सर फ़र्क नहीं पड़ता।
debugger; हटा दें और console.log भी, क्योंकि production में ये ठीक नहीं हैं।
सुरक्षा: OAuth में state parameter ज़रूर इस्तेमाल करें और callback पर उसे verify करें, ताकि कोई दूसरा आपके flow में गलत code न भेज सके।

मेरी सलाह है कि BroadcastChannel (समाधान 1) आज़माएँ, क्योंकि आपका setup पहले से popup वाला है और इसमें कम से कम बदलाव करने पड़ेंगे।
