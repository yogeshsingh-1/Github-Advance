"use strict";
/** @type {import('sequelize-cli').Migration} */
import { Sequelize } from "sequelize";
async function up({ context }) {
  /**
   * Add altering commands here.
   *
   * Example:
   * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
   */
  // await queryInterface.Sequelize.query();
  const { queryInterface, schema } = context;
  await queryInterface.createTable( { tableName: "solo", schema }, { id: Sequelize.INTEGER });
  await queryInterface.sequelize.query(
    `ALTER TABLE "${schema}"."student" ADD CONSTRAINT "student_unique" UNIQUE (name);
`,
  );
}

export { up };
