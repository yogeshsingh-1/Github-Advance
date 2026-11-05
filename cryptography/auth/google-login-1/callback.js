console.log("Callback loaded:", location.origin);

// const params = new URLSearchParams(location.search);

// const code = params.get("code");
// const error = params.get("error");

// console.log("Google Code:", code);
// console.log("Google Error:", error);

// window.addEventListener("message", (event) => {
//   console.log("Hi yogesh", event);
//   // if (data.type === "oauth_verify") {
//   // }
// });

// if (error) {
//   console.error("Google OAuth Error:", error);
//   setTimeout(() => window.close(), 300);
// }

// if (code && window.name == "oauth" && window.opener) {
//   // debugger;
//   // window.opener.postMessage({ code, type: "oauth_code" });
//   window.opener.postMessage({ msg: "Send Succesfully", type: "oauth_code" });

//   console.log("Message sent successfully");

//   setTimeout(() => window.close(), 300);
// }

// const channel = new BroadcastChannel("oauth");

// console.log("Callback initialized");

// channel.postMessage({
//   type: "OAUTH_RESULT",
//   code: code,
// });

const id = document.getElementById("status");
const loader = document.getElementById("loader");
const showStatus = (message, isSuccess = false) => {
  id.style.color = isSuccess ? "green" : "red";
  id.textContent = message;
};

const closeWindow = () => {
  setTimeout(() => window.close(), 1000);
};
const updateUI = (status, message) => {
  id.textContent = message;
  if (!status) {
    loader.innerHTML = `<div class="spinner"></div>`;
    id.style.color = "#475569";
  } else if (status === 200) {
    loader.innerHTML = `<div class="success-icon">✓</div>`;
    id.style.color = "#16a34a";
  } else {
    loader.innerHTML = `<div class="error-icon">✕</div>`;
    id.style.color = "#dc2626";
  }
};

const authenticate = async () => {
  const params = new URLSearchParams(window.location.search);
  const sid = params.get("sid");

  if (!sid) {
    updateUI(null, "Google Authentication Failed.");
    showStatus("Google Authentication Failed.");
    return;
  }
  updateUI(null, "Google Authentication Verification.");
  showStatus("Google Authentication Verification.");
  try {
    const response = await fetch("http://localhost:4000/auth/signed-cookie", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sid }),
    });
    const data = await response.json();

    if (data.status === 200) {
      updateUI(data.status, data.msg || "Authentication Successful.");
      showStatus(data.msg, true);
      return;
    } else {
      updateUI(data.status, data.msg || "Google Authentication Failed.");
      showStatus(data.msg || "Google Authentication Failed.");
    }
  } catch (error) {
    console.error("Authentication Error:", error);
    showStatus("Google Authentication Failed.");
  } finally {
    closeWindow();
  }
};

authenticate();
