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
      StudentExam.belongsTo(models.Student , { foreignKey:'studentId' , as :'student'})
      StudentExam.belongsTo(models.Exam , { foreignKey:'examId' , as :'exam'}, { onDelete: 'cascade' })
    }
  }
  StudentExam.init({
    studentId: {
      type:DataTypes.INTEGER,
      primaryKey:true

    },
    examId:{
      type:DataTypes.INTEGER,
      primaryKey:true
    },
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'StudentExam',
  });
  return StudentExam;
};