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
let popup;

window.addEventListener("message", ({ data }) => {
  debugger;
  if (data.code && data.type === "oauth_code") {
    console.log("Code", data.code);
    // popup.close();
    // setTimeout(() => pop.close(), 5000);
    const apiInfo = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: data.code,
      }),
    };
    fetch(`http://localhost:4000/google/callback`, apiInfo)
      .then(async (res) => {
        res = await res.json();
        popup.postMessage({ status: res.status, type: "oauth_verify" });
        if (res.redirectUrl) {
          // window.location.href = res.redirectUrl;
          window.parent.location.href = res.redirectUrl;
          sessionStorage.setItem("user", JSON.stringify(res?.data));
        }
      })
      .catch((e) => console.error("OAuth callback error:", e));
  }
});
// console.log(channel)

function openPopUp() {
  const width = 500;
  const height = 600;

  // Calculate center position
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;
  popup = window.open(
    `${oauthUrl}?${query.toString()}`,
    "oauth",
    `width=${width},height=${height},left=${Math.round(left)},top=${Math.round(top)}`,
  );
}

// const channel = new BroadcastChannel("oauth");

// channel.onmessage = ({ data }) => {
//   console.log(data);
//   debugger;
//   console.log("HI from Yogesh:", data.code);
//   if (data.code) {
//     const apiInfo = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         code: data.code,
//       }),
//     };
//     fetch(`http://localhost:4000/google/callback`, apiInfo)
//       .then(async (res) => {
//         res = await res.json();
//         console.log(window.location.href);
//         console.log(res);
//         if (res.redirectUrl) {
//           window.location.href = res.redirectUrl;
//           sessionStorage.setItem("user", res?.data);
//         }
//       })
//       .catch((e) => console.error("OAuth callback error:", e));
//   }
// };
