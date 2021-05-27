'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type:DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type:DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    hashedPassword: {
      allowNull:false,
      type:DataTypes.STRING.BINARY}
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
