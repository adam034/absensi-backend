'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nip: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        unique: true,
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'roles',
          },
          key: 'role_id',
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      },
      agency_id: {
        type: Sequelize.INTEGER,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('users');
  },
};
