// Google ke dwara official library hai. and ye publicly key ko fetch karega and kid ko compare karega and correct public key ko use karake hum data ko verify karega and humare audience ko bhi hmre cliend_id se compare kar dega.

// id_token ko verify karne ke baad jo data milta hai ,

// aud -> humare client id hota jise verify karna chaiye

import { OAuth2Client } from "google-auth-library";
import env from "dotenv/config";
const client = new OAuth2Client({
  clientId: process.env.client_id,
  clientSecret: process.env.client_Secret,
});
async function verifyIdToken(id_token = "") {
  if (!id_token.length) {
    return null;
  }
  try {
    const loginTicket = await client.verifyIdToken({ idToken: id_token }); // It give me envelope and payload
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
