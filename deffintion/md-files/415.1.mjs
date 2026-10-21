import express from "express";

const app = express();

app.get("/users/:id", async (req, res) => {
  const userData = await getUser(req.params.id);
  res.json(userData);
});

app.listen(4000, () => {
  console.log("Server started on 4000");
});

async function getUser(userId) {
  const response = await fetch(`https://fakestoreapi.com/users/${userId}`);
  return await response.json();
}
