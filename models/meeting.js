'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meeting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Meeting.belongsTo(models.Class,{foreignKey:"classId",as:"class"})
      Meeting.belongsTo(models.Course,{foreignKey:"courseId",as:"course"})
      Meeting.belongsTo(models.Teacher,{foreignKey:"teacherId",as:"teacher"})
    }
  }
  Meeting.init({
    link: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Meeting',
    tableName:'meetings'
  });
  return Meeting;
};