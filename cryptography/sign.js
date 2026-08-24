import express from "express";
// import CookieOptions from "cookie-parser";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
const app = express();
const cookieOption = {};
app.use(cookieParser("12345",{
    
}));
// app.get("/", (req, res) => {
//   const uid = req.cookies.uid;
//   if (uid) {
//     try {
//       const payload = jwt.verify(uid, process.env.key);
//       const initialTime = new Date(payload.iat * 1000);
//       const expiryTime = new Date(payload.exp * 1000);
//       console.log(initialTime.toString());
//       console.log(expiryTime.toString());
//       if (expiryTime > initialTime) {
//         return res.status(200).json({
//           status: 1,
//           message: "Cookie Find.",
//         });
//       } else {
//         return res.status(200).json({
//           status: 1,
//           message: "Token Expired.",
//         });
//       }
//     } catch (e) {
//       // {"name":"TokenExpiredError","message":"jwt expired","expiredAt":"2026-08-19T07:55:40.000Z"}
//       if (e.name === "TokenExpiredError") {
//         return res.status(401).json({
//           status: 0,
//           message: "Token Expired.",
//           code: "TOKEN_EXPIRED",
//         });
//       }
//       return res.status(200).json({
//         status: 0,
//         error: e,
//       });
//     }
//   } else {
//     return res.status(200).json({
//       status: 1,
//       message: "Cookie Missed.",
//     });
//   }
// });
app.get("/", (req, res) => {
  const uid = req.cookies.uid;

  if (!uid) {
    return res.status(401).json({
      status: 0,
      message: "Cookie Missing.",
      code: "COOKIE_MISSING",
    });
  }

  try {
    const payload = jwt.verify(uid, process.env.key);

    const initialTime = new Date(payload.iat * 1000);
    const expiryTime = new Date(payload.exp * 1000);

    console.log("Initial Time:", initialTime.toString());
    console.log("Expiry Time:", expiryTime.toString());

    return res.status(200).json({
      status: 1,
      message: "Cookie Found.",
    });
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      return res.status(401).json({
        status: 0,
        message: "Token Expired.",
        code: "TOKEN_EXPIRED",
      });
    }

    return res.status(401).json({
      status: 0,
      message: "Invalid Token.",
      code: "INVALID_TOKEN",
    });
  }
});
app.get("/cook", (req, res) => {
  const token = jwt.sign({ uid: "1234567890" }, process.env.key, {
    algorithm: "HS256",
    expiresIn: "1m",
  });
  console.log(token);
  res.cookie("uid", token, {
    maxAge: 2 * 60 * 1000,
    sameSite: "lax",
  });
  return res.status(200).json({
    status: 1,
    message: "Data send succesful.",
  });
});
app.listen(5000, "0.0.0.0", (e) => {
  if (e) {
    console.log(e);
    process.exit(1);
  }
  console.log(`server is listening on port ` + 5000);
});
