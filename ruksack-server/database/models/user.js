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
    // associations can be defined here
  };

  User.prototype.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, role: this.role}, process.env.APP_KEY);
    return token;
  }

  User.prototype.getSalt = function() {
    return this.salt;
  }
  return User;
};