import jwt from "jsonwebtoken";
// public key for verify google jwt id_token
const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApIpnzA2ezyEERJSxiqpL
BmMeIqATH+V6iuBtKIibXEyYovujrx8niqTeO6RIyXT6uDUUv0V2kJ8V/iWYFxzX
Y1BqK9IfcAmjg0XUDoyTVkoyLsF0gj299LH+zw5vCvy8jmamFIZKAbKcQ5hpHvSi
ttM1vl+6vVL+i2GxyGbMA9aY6Hq15NylS1t7ELTYfQimlnvxcb7/DM0cuS5U1Sfb
CZMCpKhh0nrSlYds240oxpCJOV2rBahs/Ea5c7tezS1nwVC9W/E+bR9TF6BHkC/f
v+E8DcWfkI/6geaJzBhINNxBfjx+w1+WUp2Jz3YYFWEfeQjxMqu+Fg6cGxwk7V16
uQIDAQAB
-----END PUBLIC KEY-----
`; //pemKey
function verifyIdToken(id_token = "") {
  if (!id_token.length) {
    return;
  }
  const data = jwt.verify(id_token, publicKey, {
    algorithms: ["RS256"],
  });
  //  after coming user details , Verify aud(audience) using client_id
  if (data.aud === process.env.client_id) {
    return data;
  }
  return;
}

export default verifyIdToken;
