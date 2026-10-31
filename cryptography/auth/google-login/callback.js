console.log("Callback loaded:", location.origin);

const params = new URLSearchParams(location.search);

const code = params.get("code");
const error = params.get("error");

console.log("Google Code:", code);
console.log("Google Error:", error);

window.addEventListener("message", (event) => {
  console.log("Hi yogesh", event);
  // if (data.type === "oauth_verify") {
  // }
});

if (error) {
  console.error("Google OAuth Error:", error);
  setTimeout(() => window.close(), 300);
}

if (code && window.name == "oauth" && window.opener) {
  debugger;
  window.opener.postMessage({ code, type: "oauth_code" });

  console.log("Message sent successfully");

  setTimeout(() => window.close(), 300);
}

// const channel = new BroadcastChannel("oauth");

// console.log("Callback initialized");

// channel.postMessage({
//   type: "OAUTH_RESULT",
//   code: code,
// });
