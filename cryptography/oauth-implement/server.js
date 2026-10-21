import express from "express";
import cors from "cors";

const port = 4000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5500",
    credentials: true,
  }),
);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
