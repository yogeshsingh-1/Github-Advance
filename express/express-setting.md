<!-- Express application settings — global variables ka alternative   -->

Express application ke andar aisi settings hoti hain jo poori app ka behavior control karti hain.

Basically ye ek centralized config/flag system hai jisse aap apni pure app ka behavior control aur toggle kar sakte ho, bina global variables ke mess ke.

# Internal storage

Express internally in sabko `app.settings` object mein store karta hai.
console.log(app.settings) // => { 'view engine': 'ejs', 'trust proxy': true, ... }

Ex: jaise ki view engine kaunsa use ho, JSON responses kaise format hon, trust proxy hai ya nahi, etc.

Instead of global variables use karne ke, Express ek centralized app.settings object maintain karta hai. Isse:

Sab jagah consistent tareeke se config store/access hoti hai
Middleware or routes kahin bhi check kar sakte hain ki koi setting on hai ya nahi
Environment ke hisaab se (dev/production) behavior change kar sakte ho.

# app.set(name, value) — kaise use karte hain

Ye key-value pair set karta hai. Value kuch bhi ho sakti hai — string, number, boolean, object, function.
app.set('title', 'My Blog'); // string value
app.set('view engine', 'ejs'); // Express ki built-in setting
app.set('port', 3000); // number value
app.set('trust proxy', true); // boolean value

# app.get() use karte ho:

ye key se value nikal skte hai.
app.get('title'); // => 'My Blog'
app.get('port'); // => 3000

# app.enable() / app.disable() — boolean value set karne ke liye shortcut like app.set

Agar sirf true/false set karna hai, to ye shortcuts hain:
app.enable('trust proxy'); // same as: app.set('trust proxy', true)
app.disable('trust proxy'); // same as: app.set('trust proxy', false)

# app.enabled() / app.disabled() — boolean value check karne ke liye

if (app.enabled('trust proxy')) {
// proxy trust logic
}

# Note ->

Use in middleware
Use for sending response based on setting

1. if (app.get('env') === 'development') {
   app.enable('json spaces');
   }

2. app.set('maintenance mode', false);

// kisi middleware mein:
app.use((req, res, next) => {
if (app.enabled('maintenance mode')) {
return res.status(503).send('Site under maintenance');
}
next();
});

# Question -> ye setting client side or another server side expose nhi hoti kya ? ye ushe node process mai rhti hai kya?

Point Status
Client ko expose hota hai? ❌ Nahi (jab tak khud na bhejo)
Dusre server/process ko milta hai? ❌ Nahi, har process apna alag
Kahan store hota hai? RAM (Node process memory)
Restart ke baad bachta hai? ❌ Nahi, reset ho jaata hai
