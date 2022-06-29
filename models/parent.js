'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Parent.init({
    relation: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER
  }, {
    sequelize,
    tableName:"parents",
    modelName: 'Parent',
  });
  return Parent;
};