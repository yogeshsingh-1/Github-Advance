const oauthUrl = "https://accounts.google.com/o/oauth2/v2/auth";

const redirect_uri = "http://localhost:4000/callback.html";
const query = new URLSearchParams({
  response_type: "code",
  client_id: client_id,
  scope: "openid email profile",
  redirect_uri: redirect_uri,
});
// Listener popup open karne se pehle register karo

// window.addEventListener("message", (event) => {
//   if (event.origin !== window.location.origin) return;

//   console.log(event.data);
// });
window.addEventListener("message", async (event) => {
  if (event.origin !== window.location.origin) return;
  console.log(event.data.code);
  const code = event.data.code;
  const baseUrl = "https://oauth2.googleapis.com";
  const query = new URLSearchParams({
    code: code,
    client_id: client_id,
    client_secret: client_Secret,
    redirect_uri: redirect_uri,
  });
  const response = await fetch(`${baseUrl}?${query}`, {
    method: "POST",
    body: JSON.stringify(code),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  console.log("Received:", event.data);
});
// Open Google oauth popup
let popup;
function openPopUp() {
  popup = window.open(`${oauthUrl}?${query}`, "oauth", "width=500,height=500");
}
