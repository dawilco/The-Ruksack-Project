'use strict';
module.exports = (sequelize, DataTypes) => {
  const CustomField = sequelize.define('CustomField', {
    type: DataTypes.ENUM({
      values: ['textField','radio','checkbox','select']
    }),
    title: DataTypes.STRING,
    required: DataTypes.BOOLEAN,
    values: DataTypes.ARRAY(DataTypes.STRING),
    EventId: DataTypes.INTEGER
  }, {});
  CustomField.associate = function(models) {
    CustomField.belongsTo(models.Event);
  };
  return CustomField;
};