'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        name: 'Upstate Cycling Classic',
        type: 'Road Race',
        notes: 'The Upstate Cycling Classic Presented by Clemson Univeresity Club Cycling Team and Topview Sports USA Cycling Open Category Races and SECCC Collegiate Races There will be a road race, criterium, and time trial.More info TBD',
        start: '04-02-2020 18:000:00 EST',
        end: '04-01-2020 22:000:00 EST',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Swamp Fox Classic',
        type: 'Crit',
        notes: 'Welcome to the 3rd Annual Swamp Fox Ultra. This event is a footrace ... I will place them along the route as soon as we start the race',
        start: '04-07-2020 18:000:00 EST',
        end: '04-05-2020 22:000:00 EST',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};
