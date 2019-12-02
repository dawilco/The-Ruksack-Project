'use strict';
module.exports = (sequelize, DataTypes) => {
  const Promoter = sequelize.define('Promoter', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    stripeId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  Promoter.associate = function(models) {
    // associations can be defined here
  };
  return Promoter;
};