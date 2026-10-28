const oauthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
const redirect_uri = "http://localhost:5500/callback.html";
const client_id =
  "640249440952-svt79p7s7d6c5oon3aaab5dtsroakfie.apps.googleusercontent.com";
const query = new URLSearchParams({
  response_type: "code",
  client_id: client_id,
  scope: "openid email profile",
  redirect_uri: redirect_uri,
});

window.addEventListener("message", async (event) => {
  console.log(event);
});
// Open Google oauth popup
let popup;
function openPopUp() {
  popup = window.open(`${oauthUrl}?${query}`, "oauth", "width=500,height=500");
}

// Listener popup open karne se pehle register karo

// window.addEventListener("message", (event) => {
//   if (event.origin !== window.location.origin) return;

//   console.log(event.data);
// });
