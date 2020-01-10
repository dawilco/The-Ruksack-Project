'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EventSections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      EventId: {
        type: Sequelize.INTEGER
      },
      AddressId: {
        type: Sequelize.INTEGER
      },
      fee: {
        type: Sequelize.INTEGER
      },
      registrationOpen: {
        type: Sequelize.DATE
      },
      registrationClose: {
        type: Sequelize.DATE
      },
      start: {
        type: Sequelize.DATE
      },
      end: {
        type: Sequelize.DATE
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('EventSections');
  }
};