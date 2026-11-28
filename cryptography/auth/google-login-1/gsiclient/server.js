import express from "express";
import { OAuth2Client } from "google-auth-library";
const googleClient = new OAuth2Client({
  client_id:
    "640249440952-saeo22sdb511is4309tho9m408gbjrqj.apps.googleusercontent.com",
});
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   res.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
//   res.set("Access-Control-Allow-Credentials", "true");
  next();
});
app.post("/google/callback", async (req, res) => {
  const idToken = req.body.token;
  const result = await googleClient.verifyIdToken({ idToken });
  console.log(result.getPayload());
  return res.status(200).json(result.getPayload());
});
app.listen(3000, () => console.log(`server is listening on port 3000`));
