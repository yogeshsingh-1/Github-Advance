const query = new URLSearchParams(window.location.search);

const code = query.get("code");
if (code) {
  fetchRequest();
}

// window.opener()
// Open Google PopUp page function
function openGoogle() {
  const query = new URLSearchParams({
    response_type: "code",
    client_id: client_id,
    scope: "openid email profile",
    redirect_uri: "http://localhost:5500",
    // state:""
  });
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${query}`;
  const width = 500;
  const height = 500;

  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  window.open(
    authUrl,
    "auth-popup",
    `width=${width},height=${height},left=${Math.round(left)},top=${Math.round(top)}`,
  );
}
async function fetchRequest() {
  debugger;
  let payload = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      client_id,
      client_secret: client_Secret,
      redirect_uri: "http://localhost:5500",
      grant_type: "authorization_code",
    }),
  });
  payload = await payload.json();
  console.log(payload);
  console.log(payload.id_token); // This is jwt token (header, payload and signature)
  const userInfo = payload.id_token.split(".")[1]; //there we user payload

  console.log(atob(userInfo)); // base64 to string
}

if (window.name == "auth-popup") {
  console.log("My window running for oath...");
  window.opener.postMessage("Hi from PopUp.");
}

// https://accounts.google.com/o/oauth2/v2/auth?response_type=null&client_id=640249440952-svt79p7s7d6c5oon3aaab5dtsroakfie.apps.googleusercontent.com&scope=openid+email+profile&redirect_uri=http%3A%2F%2Flocalhost%3A5500
