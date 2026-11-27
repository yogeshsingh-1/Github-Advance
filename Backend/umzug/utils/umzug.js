import { Umzug, SequelizeStorage } from "umzug";
import sequelize from "../config/dbConnection.js";

function getUmzugInstance(schema) {
  const modelName = "migrations";
  // Remove previously registered model
  if (sequelize.isDefined(modelName)) {
    sequelize.modelManager.removeModel(sequelize.model(modelName));
  }
  const umzug = new Umzug({
    migrations: { glob: "migrations/*.js" },
    context: {
      queryInterface: sequelize.getQueryInterface(),
      schema: schema,
    },
    storage: new SequelizeStorage({
      sequelize,
      modelName: modelName,
      tableName: modelName,

      // modelName: `migrations_${schema}`,
      // tableName: `migrations_${schema}`,
      columnName: "migration_file",
      timestamps: true,
      schema,
    }),
    name: "migrations",
    logger: {
      info: () => {},
      warn: () => {},
      error: () => {},
      debug: () => {},
    },
  });
  return umzug;
}

// Checks migrations and run them if they are not already applied. To keep
// track of the executed migrations, a table (and sequelize model) called SequelizeMeta
// will be automatically created (if it doesn't exist already) and parsed.

export default getUmzugInstance;
