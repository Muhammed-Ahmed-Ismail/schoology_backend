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
      Exam.belongsTo(models.Course , { foreignKey:'courseId' , as :'course'})
      // Exam.belongsToMany(models.Student, { through: 'StudentExam' , foreignKey:'examId'}); //automatic many to many 
      // Exam.belongsTo(models.StudentExam, ); //manual many to many //{foreignKey:'examId' , as :'exam'} ##removed
      Exam.belongsTo(models.Class, {  foreignKey:'classId' , as:'class'});
      
    }
  }
  Exam.init({
    name: DataTypes.STRING,
    link: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    courseId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER
    //ClassId
    //StudentExamId
  }, {
    sequelize,
    modelName: 'Exam',
    tableName:'exams'

  });
  return Exam;
};