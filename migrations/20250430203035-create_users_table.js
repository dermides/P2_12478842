'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      googleId: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      correo: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: { 
        type: Sequelize.DATE, 
        defaultValue: Sequelize.NOW, 
        allowNull: false 
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
    
  }
};
