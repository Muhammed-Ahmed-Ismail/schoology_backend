'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Course.hasMany(models.Exam, {foreignKey: "courseId"})
            Course.hasMany(models.Teacher, {foreignKey: 'courseId', as: 'teachers'})

        }
    }

    Course.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Course',
        tableName: 'courses',

    });
    return Course;
};
