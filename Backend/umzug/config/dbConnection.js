import { Sequelize } from "sequelize";
import dbConfigJson from "./config.json" with { type: "json" };
const { username, password, database, host, dialect } =
  dbConfigJson.development;
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  port: 5432,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
    acquire: 30000,
  },
});
export default sequelize;
