'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('meetings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      link: {
        allowNull: false,
        type: Sequelize.STRING
      },
      date_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      teacherId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "teachers",
          key: "id"
        }

      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      classId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references: {
          model: "classes",
          key: "id"
        }
      },
      courseId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "courses",
          key: "id"
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
    await queryInterface.dropTable('meetings');
  }
};