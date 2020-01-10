'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    notes: DataTypes.TEXT,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    OrganizerId: DataTypes.INTEGER
  }, {});
  Event.associate = function(models) {
    Event.belongsToMany(models.Participant, {through: 'Registration'});
    Event.belongsTo(models.Organizer);
    Event.hasMany(models.CustomField);
    Event.hasMany(models.EventSection);
  };
  return Event;
};