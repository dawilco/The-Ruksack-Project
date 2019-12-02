'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    notes: DataTypes.TEXT,
    registrationOpen: DataTypes.DATE,
    registrationClose: DataTypes.DATE,
    eventStart: DataTypes.DATE,
    eventEnd: DataTypes.DATE,
    AddressId: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    Event.belongsToMany(models.Participant, {through: 'Registration'});
    Event.belongsTo(models.Address);
    Event.hasMany(models.CustomField);
  };
  return Event;
};