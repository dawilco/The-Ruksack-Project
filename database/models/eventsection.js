'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventSection = sequelize.define('EventSection', {
    title: DataTypes.STRING,
    EventId: DataTypes.INTEGER,
    AddressId: DataTypes.INTEGER,
    fee: DataTypes.INTEGER,
    registrationOpen: DataTypes.DATE,
    registrationClose: DataTypes.DATE,
    start: DataTypes.DATE,
    end: DataTypes.DATE
  }, {});
  EventSection.associate = function(models) {
    EventSection.belongsTo(models.Event);
  };
  return EventSection;
};