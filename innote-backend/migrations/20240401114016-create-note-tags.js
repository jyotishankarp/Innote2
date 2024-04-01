'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('note_tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tag_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'tags', // The target table
          key: 'tag_id',      // The target column
        },
      },
      note_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'notes', // The target table
          key: 'note_id',      // The target column
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('note_tags');
  }
};