'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gender: {
        allowNull: false,
        type: Sequelize.ENUM,
        values:['male','fmale']
      },
      birth_date: {
        type: Sequelize.DATEONLY,
        allowNull:false

      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:"users",
          key:"id"
        }
// 
      },
      classId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:"classes",
          key:"id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('students');
  }
};