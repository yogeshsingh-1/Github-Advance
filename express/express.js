import express from "express";
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin:", "*");
  next();
});

app.listen(8000, () => console.log(`server is listening on port 8080`));
