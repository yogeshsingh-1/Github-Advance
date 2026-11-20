import { Umzug, SequelizeStorage } from "umzug";
import sequelize from "../config/dbConnection.js";

const umzug = new Umzug({
  migrations: { glob: "migrations/*.js" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({
    sequelize,
    tableName: "migrations",
    columnName: "migration_file",
    timestamps: true,
  }),
  name: "migrations",
  logger: console,
});

// Checks migrations and run them if they are not already applied. To keep
// track of the executed migrations, a table (and sequelize model) called SequelizeMeta
// will be automatically created (if it doesn't exist already) and parsed.

export default umzug;
