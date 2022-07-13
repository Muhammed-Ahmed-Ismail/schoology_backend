'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Student.belongsTo(models.User , {foreignKey: 'userId' , as : 'user'})
      Student.hasMany(models.Parent , {foreignKey: 'studentId' , as : 'parent'})
      Student.belongsTo(models.Class , {foreignKey: 'classId' , as : 'class'})
      // Student.belongsToMany(models.Exam, { through: 'StudentExam'  , foreignKey:'studentId'}) ;
      // Student.belongsTo(models.StudentExam, {foreignKey:'studentId' , as :'student'}); //manual many to many


    }
  }
  Student.init({
    gender: {
      type: DataTypes.ENUM,
      values:['male','female'],
      allowNull: false
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName:"students",
    modelName: 'Student',
  });
  return Student;
};