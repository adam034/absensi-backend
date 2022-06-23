'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('records', {
      record_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'user_id',
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      },
      position_in: {
        type: Sequelize.STRING,
      },
      position_out: {
        type: Sequelize.STRING,
      },
      date_in: {
        type: Sequelize.DATE,
      },
      date_out: {
        type: Sequelize.DATE,
      },
      status_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'statuses',
          },
          key: 'status_id',
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      },
      description: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('records');
  },
};
