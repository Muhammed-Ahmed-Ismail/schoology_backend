'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Teacher extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Teacher.belongsTo(models.User, {foreignKey: 'userId', as: 'user'})
            Teacher.belongsTo(models.Course,{foreignKey:"courseId"})
            Teacher.hasMany(models.Meeting, {foreignKey: 'teacherId'})
            Teacher.hasMany(models.Exam, {foreignKey: 'teacherId'})
            Teacher.hasMany(models.File, {foreignKey: 'uploaderId'})
            Teacher.belongsToMany(models.Class,{through:"teachers_classes"})
        }

        async isThatValidMeeting(date, period) {
            let count = await this.countMeetings({where: {date, period}})

            return (count === 0)
        }

    }

    Teacher.init({

        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, {
        sequelize,
        tableName: "teachers",
        modelName: 'Teacher',
    });
    return Teacher;
};