'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contactos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
        unique: true,
      },
      comentario: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      direccion_ip: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIP: true,
        },
      },
      fecha_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contactos');
  },
};