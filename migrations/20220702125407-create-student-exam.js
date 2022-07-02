'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StudentExams', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      studentId: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:"students",
          key:"id"
        }
      },
      examId: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:"exams",
          key:"id"
        }
      },
      score: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('StudentExams');
  }
};