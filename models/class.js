'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Class extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Class.hasMany(models.Meeting, {foreignKey: "classId"})
            Class.hasMany(models.Exam, {foreignKey: "classId"})
            Class.hasMany(models.File, {foreignKey: "classId"})
            Class.belongsToMany(models.Teacher,{through:"teachers_classes"})
        }

        async isThatValidMeeting(date, period) {
            let count = await this.countMeetings({where: {date, period}})

            return (count === 0)
        }
    }

    Class.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Class',
        tableName: 'classes',

    });
    return Class;
};