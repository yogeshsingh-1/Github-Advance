// if (window.name === "oauth") {
//   const query = new URLSearchParams(window.location.search);
//   code = query.get("code");
//   if (code) {
//     window.opener.postMessage(code);
//   }
// }

console.log(window.name);
// if (window.name === "oauth") {
//   const query = new URLSearchParams(window.location.search);
//   code = query.get("code");
//   if (code) {
//     window.opener.postMessage(code);
//   }
// }



// if (window.name === "oauth" && window.opener && code) {
//   console.log(window.location.origin);
//   window.opener.postMessage(
//     { type: "GOOGLE_OAUTH_CODE", code },
//     "http://localhost:4000",
//   );
// }
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
if (window.opener && code) {
  console.log(window.location.origin)
  window.opener.postMessage(
    { type: "OAUTH_CODE", code },
    window.location.origin,
  );
}
console.log(window.location.origin)
