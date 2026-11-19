// Google ke dwara official library hai. and ye publicly key ko fetch karega and kid ko compare karega and correct public key ko use karake hum data ko verify karega and humare audience ko bhi hmre cliend_id se compare kar dega.

// id_token ko verify karne ke baad jo data milta hai ,

// aud -> humare client id hota jise verify karna chaiye

import "dotenv/config";
import { OAuth2Client } from "google-auth-library";
const redirect_uri = process.env.redirect_uri;

const client = new OAuth2Client({
  clientId: process.env.client_id,
  clientSecret: process.env.client_Secret,
  redirectUri: redirect_uri,
  //  grant_type: "authorization_code"  -> Ye automatically send kar deta hai.
});
// This is return oauth login url
export async function generateAuthUrl(state = "") {
  const url = client.generateAuthUrl({
    response_type: "code",
    scope: ["openid", "email", "profile"],
    state: state ? state : "1234",
    // Get refresh token with the help of 2 options prompt and access_type
    // prompt: "consent",
    // access_type: "offline",

    // agar aap aisa chate hai use humesa apna google account select kare toh prompt open ho for select account
    prompt: "consent", // "select_account"
    login_hint: "yogeshs368@gmail.com", // ye hum direct bina kisi account ko select karaye bina login karwa dega
  });
  return url;
}

// Start - Based on Code get id_token using google-auth-libray
export async function createToken(code) {
  const tokenResponse = await client.getToken(code);
  console.log(tokenResponse);
  return tokenResponse;
}

// Start - Based on id_token verify using google-auth-libray
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
export async function getUserInfoUsingAccessToken(accessToken) {
  try {
    return await client.getTokenInfo(accessToken);
  } catch (e) {
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
