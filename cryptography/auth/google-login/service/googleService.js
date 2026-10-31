import "dotenv/config";
import fs from "node:fs";
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
  if (!res.ok || !data?.id_token) {
    console.error("Token error:", data);
    return null;
  }
  // Create directory if it doesn't exist
  const jsonPath = "./json";
  fs.mkdirSync(jsonPath, { recursive: true });

  const filePath = `${jsonPath}/user.json`;
  let jsonData = [];
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, "utf-8");
    jsonData = fileData ? JSON.parse(fileData) : [];
  }
  // Decode ID token payload
  const idToken = data.id_token;
  const userDetails = atob(idToken.split(".")[1]); // atob() ->jwt string ko user json

  const { sub, name, email, picture } = JSON.parse(userDetails);
  // Check whether user already exists
  const findUser = jsonData.some((user) => user.id === sub);
  if (!findUser) {
    jsonData.push({ id: sub, name, email });
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
  }

  return { name, email, picture, id: sub };
}
export default receivedCallBack;
