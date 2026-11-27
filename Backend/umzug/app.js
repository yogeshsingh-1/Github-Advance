import fs from "node:fs";
import express from "express";
import getUmzugInstance from "./utils/umzug.js";
import sequelize from "./config/dbConnection.js";
const app = express();

app.get("/migration/up", async (req, res) => {
  res.status(200);
  try {
    const schema = req.headers?.schemaname;
    const umzug = new getUmzugInstance(schema);
    const pendingMigrations = await umzug.pending({ schema });
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
app.get("/create/schema", async (req, res) => {
  res.status(200);
  try {
    const schema = req.headers?.schemaname;
    await sequelize.query(`create schema if not exists "${schema}"`);
    return res.json({ staus: true, msg: "Schema created succesfully." });
  } catch (error) {
    console.log(error);
    return res.json({ staus: false, msg: "Something went wrong." });
  }
});
// const a = fs.readFileSync("abs", "hex");
app.listen(4000, (err) => {
  console.log(`server is listening on 4000`);
});
