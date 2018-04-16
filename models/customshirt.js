'use strict';
module.exports = (sequelize, DataTypes) => {
  var CustomShirt = sequelize.define('CustomShirt', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.STRING
  }, {});
  CustomShirt.associate = function(models) {
    // associations can be defined here
    CustomShirt.belongsTo(models.User);
  };
  return CustomShirt;
};