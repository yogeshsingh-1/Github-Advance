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

window.addEventListener("message", ({ data }) => {
  if (data.code && data.type === "oauth_code") {
    const apiInfo = {
      method: "POST",
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
        console.log(window.location.href);
        console.log(res);
        if (res.redirectUrl) {
          window.location.href = res.redirectUrl;
          sessionStorage.setItem("user", res?.data);
        }
      })
      .catch((e) => console.error("OAuth callback error:", e));
  }
});
// console.log(channel)

let popup;

function openPopUp() {
  popup = window.open(
    `${oauthUrl}?${query.toString()}`,
    "oauth",
    "width=500,height=600",
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
