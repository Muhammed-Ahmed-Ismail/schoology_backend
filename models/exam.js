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
      Exam.hasMany(models.StudentExam,{foreignKey:"examId"}, { onDelete: 'cascade' });
      Exam.belongsTo(models.Class, {  foreignKey:'classId' , as:'class'});
      Exam.belongsTo(models.Teacher, {  foreignKey:'teacherId' , as:'teacher'});

    }
  }
  Exam.init({
    name: DataTypes.STRING,
    link: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    submitted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    courseId: DataTypes.INTEGER,
    teacherId: {
      type:DataTypes.INTEGER,
      references:{
        model:"teachers",
        key:"id"
      }
    },
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