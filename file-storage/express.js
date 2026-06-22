import express from "express";
import fs from "node:fs/promises";
const app = express();

app.use(express.json());

app.listen(8000, () => console.log(`server is listening on port 8080`));
