let date = new Date("2026-08-19T07:38:21.757Z");
console.log(date.toString());
console.log(date.getHours());
date.setHours(date.getHours(), date.getMinutes() + 30);
console.log(date.toString());
