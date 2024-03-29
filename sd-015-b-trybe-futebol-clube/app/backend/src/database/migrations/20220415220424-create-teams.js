'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      teamName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'team_name'
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
     await queryInterface.dropTable('teams');
  }
};
