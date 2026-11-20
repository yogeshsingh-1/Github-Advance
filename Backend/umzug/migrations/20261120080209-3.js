"use strict";
/** @type {import('sequelize-cli').Migration} */
import { Sequelize } from "sequelize";
async function up({ context: queryInterface }) {
  /**
   * Add altering commands here.
   *
   * Example:
   * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
   */
  // await queryInterface.Sequelize.query();
  await queryInterface.createTable(
    "solo",
    { id: Sequelize.INTEGER },
   
  );
  await queryInterface.sequelize.query(
    `ALTER TABLE "student" ADD CONSTRAINT "student_unique" UNIQUE (name);
`,
    
  );
}

export { up };
