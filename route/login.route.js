import { Router } from "express";

const AuthRouter = Router({ mergeParams: true });

AuthRouter.get("/add/:login", (req, res) => {
  console.log(req.params);
  console.log("path", req.path);
  console.log("url", req.url);
  console.log("baseurl", req.baseUrl);
  console.log("original Url", req.originalUrl);
  console.log(req.companyId);
  // console.log("route", req.route);
  console.log("Internal Route");
  console.log("Header", req.header);
  console.log("Headers", req.headers);
  res.end(`Internal Route ${req.companyId}`);
});

export default AuthRouter;
