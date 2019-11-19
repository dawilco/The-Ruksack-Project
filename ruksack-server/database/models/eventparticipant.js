'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventParticipant = sequelize.define('EventParticipant', {
    EventId: DataTypes.INTEGER,
    ParticipantId: DataTypes.INTEGER
  }, {});
  EventParticipant.associate = function(models) {
    // associations can be defined here
  };
  return EventParticipant;
};