import fs from "node:fs";
import express from "express";
import umzug from "./utils/umzug.js";
import sequelize from "./config/dbConnection.js";
const app = express();

app.get("/migration/up", async (req, res) => {
  res.status(200);
  try {
    const pendingMigrations = await umzug.pending();
    const executedMigration = await umzug.executed();
    console.log("executedMigration", executedMigration);
    if (pendingMigrations.length) {
      const result = await umzug.up();
      console.log("migration counting", result);
    }

    return res.json({ staus: true, msg: "Migration run succesfully." });
  } catch (error) {
    console.log(error);
    return res.json({ staus: false, msg: "Something went wrong." });
  }
});
// const a = fs.readFileSync("abs", "hex");
app.listen(4000, (err) => {
  console.log(`server is listening on 4000`);
});
