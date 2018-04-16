'use strict';
module.exports = (sequelize, DataTypes) => {
  var Shirt = sequelize.define('Shirt', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  Shirt.associate = function(models) {
    // associations can be defined here
  };
  return Shirt;
};