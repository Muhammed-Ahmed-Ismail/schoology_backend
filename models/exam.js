'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Exam.belongsTo(models.Course , {foreignKey:'courseId' , as :'course'})
      // Exam.belongsToMany(models.Student, { through: 'StudentExam' , foreignKey:'examId'}); //automatic many to many 
      Exam.belongsTo(models.StudentExam, {foreignKey:'examId' , as :'exam'}); //manual many to many
      
    }
  }
  Exam.init({
    name: DataTypes.STRING,
    link: DataTypes.STRING,
    date: DataTypes.DATE,
    courseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Exam',
  });
  return Exam;
};