'use strict';
module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define('Participant', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    comment: DataTypes.TEXT,
    gender: DataTypes.TEXT
  }, {});
  Participant.associate = function(models) {
    // associations can be defined here
    Participant.belongsToMany(models.Event,{through: 'Registration'});
  };
  return Participant;
};