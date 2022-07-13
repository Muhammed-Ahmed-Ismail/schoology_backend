'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.belongsTo(models.Role, {foreignKey: 'roleId', as: 'role'})
            User.hasOne(models.Student,{foreignKey:'userId' })
            User.hasOne(models.Teacher,{foreignKey:'userId' })
            User.hasOne(models.Parent,{foreignKey:'userId' })
        }
    }

    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    }, {
        sequelize,
        tableName: "users",
        modelName: 'User',
    });
    return User;
};

