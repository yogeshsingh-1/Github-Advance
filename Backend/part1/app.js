import express from "express";
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:5173");
});
app.get("/api", (req, res) => {
  return res.status(200).json({ status: 200, data: true });
});
app.listen(5000, () => {
  console.log(`server is listening on port 5000`);
});
