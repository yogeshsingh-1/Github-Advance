// Google ke dwara official library hai. and ye publicly key ko fetch karega and kid ko compare karega and correct public key ko use karake hum data ko verify karega and humare audience ko bhi hmre cliend_id se compare kar dega.

// id_token ko verify karne ke baad jo data milta hai ,

// aud -> humare client id hota jise verify karna chaiye

import "dotenv/config";
import { OAuth2Client } from "google-auth-library";
const redirect_uri = "http://localhost:4000/google/callback";
const client = new OAuth2Client({
  clientId: process.env.client_id,
  clientSecret: process.env.client_Secret,
  redirectUri: redirect_uri,
  //  grant_type: "authorization_code"  -> Ye automatically send kar deta hai.
});
export async function generateAuthUrl() {
  const url = client.generateAuthUrl({
    response_type: "code",
    scope: "openid email profile",
    state: "1234",
  });
  return url;
}
export async function createToken(code) {
  const tokenResponse = await client.getToken(code);
  return tokenResponse;
}

export async function verifyIdToken(id_token = "") {
  if (!id_token.length) {
    return null;
  }
  const clientId = process.env.client_id;
  try {
    const loginTicket = await client.verifyIdToken({
      idToken: id_token,
      audience: clientId, //compare the clientId and audience
    }); // It give me envelope and payload
    const userId = loginTicket.getUserId(); // it give me userId(sub)
    const envelope = loginTicket.getEnvelope(); // it give me signature
    return loginTicket.getPayload(); // it give me user details
  } catch (error) {
    return null;
  }
}
export default verifyIdToken;

// LoginTicket hum envelope and payload deta hai.
// envelope -> Isme jwt headers hote hai.
// payload -> Isme user details hoti hai.
// console.log(loginTicket.getPayload());

// ye method hume TokenPayload deta hai. jisme users details hoti hai.
// console.log(loginTicket.getUserId());
