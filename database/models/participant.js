'use strict';
module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define('Participant', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    comment: DataTypes.TEXT,
    gender: DataTypes.TEXT,
    birthday: DataTypes.DATEONLY
  }, {});
  Participant.associate = function(models) {
    Participant.belongsToMany(models.Event,{through: 'Registration'});
    Participant.belongsTo(models.User);
  };
  return Participant;
};  