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
  await queryInterface.createTable(
    { tableName: "student", schema },
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
  );
}

export { up };
