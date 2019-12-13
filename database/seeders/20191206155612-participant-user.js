'use strict';
const crypto = require('crypto');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const salt = Date.now();
    const pPassword = crypto.createHash('sha256').update('participant'+salt).digest('base64');
    const oPassword = crypto.createHash('sha256').update('organizer'+salt).digest('base64');

    return queryInterface.bulkInsert('Users', [
      {
        email: 'participant@gmail.com',
        role: 'participant',
        password: pPassword,
        salt: salt,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'organizer@gmail.com',
        role: 'organizer',
        password: oPassword,
        salt: salt,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
