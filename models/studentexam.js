'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentExam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StudentExam.belongsTo(models.Student)
      StudentExam.belongsTo(models.Exam)
    }
  }
  StudentExam.init({
    studentId: DataTypes.INTEGER,
    examId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StudentExam',
  });
  return StudentExam;
};