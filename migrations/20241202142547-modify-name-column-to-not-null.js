'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) { 
    // 修改 name 欄位，新增 allowNull: false
    await queryInterface.changeColumn('restaurants', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) { 
    // 還原 name 欄位到原始狀態
    await queryInterface.changeColumn('restaurants', 'name', {
      type: Sequelize.STRING,
      allowNull: true, // 回到允許 NULL
    });
  }
};
