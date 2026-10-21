import express from "express";
const app = express();

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});
app.get("/", (req, res) => {
  const obj = {
    name: "Yogesh Singh",
    age: 25,
    email: "yogeshs368@gmail.com",
    highestQualification: "MCA",
  };
  res.set({
    "Content-Type": "application/md",
    "Content-Disposition": 'attachment; filename="anurag.md"',
  });
  res.sendFile(`${process.cwd()}/headers.md`);
});
console.log(process.cwd());
app.listen(8000, () => console.log(`server is listening on port 8080`));
