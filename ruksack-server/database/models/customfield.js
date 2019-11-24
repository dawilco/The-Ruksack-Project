'use strict';
module.exports = (sequelize, DataTypes) => {
  const CustomField = sequelize.define('CustomField', {
    type: DataTypes.ENUM,
    title: DataTypes.STRING,
    required: DataTypes.BOOLEAN,
    EventId: DataTypes.INTEGER
  }, {});
  CustomField.associate = function(models) {
    CustomField.belongsTo(models.Event);
  };
  return CustomField;
};