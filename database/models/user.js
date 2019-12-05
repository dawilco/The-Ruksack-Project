const jwt = require('jsonwebtoken');
require('dotenv').config();

'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    role: DataTypes.ENUM({
      values: ['participant','organizer']
    }),
    password: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasOne(models.Participant);
    User.hasOne(models.Organizer);
  };

  User.prototype.generateAuthToken = function() {
    const token = jwt.sign({id: this.id, role: this.role}, process.env.APP_KEY);
    return token;
  }

  User.prototype.getSalt = function() {
    return this.salt;
  }
  return User;
};