console.log("Callback loaded:", location.origin);

const params = new URLSearchParams(location.search);

const code = params.get("code");
const error = params.get("error");

console.log("Google Code:", code);
console.log("Google Error:", error);

if (error) {
  console.error("Google OAuth Error:", error);
}

if (code && window.name == "oauth" && window.opener) {
  debugger;
  const channel = new BroadcastChannel("oauth");

  console.log("Callback channel initialized");

  // channel.postMessage({
  //   type: "OAUTH_RESULT",
  //   code: code,
  // });
  window.opener.postMessage({ code ,type:"oauth_code"});

  console.log("Message sent successfully");

  setTimeout(() => {
    channel.close();
    window.close();
  }, 500);
}
