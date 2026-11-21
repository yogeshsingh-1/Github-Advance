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
  await queryInterface.sequelize.query(
    `
    INSERT INTO public.student
(id, "name", "createdAt", "updatedAt")
VALUES(4,'Snu',now(),now());
`,
  );
}

export { up };
