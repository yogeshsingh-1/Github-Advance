import "dotenv/config";
import fs from "fs";
const tokenUrl = "https://oauth2.googleapis.com/token";
const client_id = process.env.client_id;
const client_secret = process.env.client_Secret;
const redirect_uri = "http://localhost:5500/callback.html";

async function receivedCallBack(code) {
  const body = new URLSearchParams({
    code,
    client_id,
    client_secret,
    redirect_uri,
    grant_type: "authorization_code",
  });
  const res = await fetch(`${tokenUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  const data = await res.json();
  fs.writeFileSync("cust.json", JSON.stringify(data, null, 2));
  const idToken = data?.id_token;
  if (!idToken) {
    return null;
  }
  // atob() ->jwt string ko user json
  return atob(idToken.split(".")[1]);
}
export default receivedCallBack;
