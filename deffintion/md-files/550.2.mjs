import express from "express";
import { writeFile } from "node:fs/promises";

const app = express();

app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log(req.body);
  writeFile("webhook-data.json", JSON.stringify(req.body, null, 2));
  res.json({ message: "Got the data." });
});

app.listen(4000, () => {
  console.log(`Server running on http://localhost:4000`);
});
