'use strict';
module.exports = (sequelize, DataTypes) => {
  const Registration = sequelize.define('Registration', {
    EventId: DataTypes.INTEGER,
    ParticipantId: DataTypes.INTEGER
  }, {});
  Registration.associate = function(models) {
    // associations can be defined here
  };
  return Registration;
};