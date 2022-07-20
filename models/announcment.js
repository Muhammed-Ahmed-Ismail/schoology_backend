'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Announcment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Announcment.belongsTo(models.User , { foreignKey:'senderId' , as :'sender'}) 
    }
  }
  Announcment.init({
    announcment: DataTypes.TEXT,
    senderId: DataTypes.INTEGER,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Announcment',
  });
  return Announcment;
};