const a = new Map();
a.set("name", "Yogesh");
console.log(a.get("name"));
a.set("age", "27");
a.set("email", "yogeshs368@gmail.com");
console.log("a", a);
console.log(Object.fromEntries(a));
const x = new Map(Object.entries(Object.fromEntries(a)));
console.log("X", x);
