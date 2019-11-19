'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    notes: DataTypes.TEXT,
    eventStart: DataTypes.DATE
  }, {});
  Event.associate = function(models) {
    Event.belongsToMany(models.Participant, {through: 'EventParticipants'})
  };
  return Event;
};