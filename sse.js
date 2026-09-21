import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(app.settings);

app.set("rahul", "gupta");

app.get("/event", (req, res) => {
  //   // 1. Tell browser that this is SSE
  //   res.setHeader("Content-Type", "text/event-stream");

  //   // 2. Don't cache SSE response
  //   res.setHeader("Cache-Control", "no-cache");

  //   // 3. Keep connection alive
  //   res.setHeader("Connection", "keep-alive");

  //   console.log("Client connected to SSE");
  //   res.write("data: Hello from server\n\n");
  req.pipe(res);
  //   res.end()
});
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
