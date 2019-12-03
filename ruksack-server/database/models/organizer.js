'use strict';
module.exports = (sequelize, DataTypes) => {
  const Organizer = sequelize.define('Organizer', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    stripeId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  Organizer.associate = function(models) {
    Organizer.belongsTo(models.User);
  };
  return Organizer;
};