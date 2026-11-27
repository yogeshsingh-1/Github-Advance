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
  await queryInterface.sequelize.query(
    `
    INSERT INTO "${schema}".student
(id, "name", "createdAt", "updatedAt")
VALUES(1,'Yogesh',now(),now());
`,
  );
}

export { up };
