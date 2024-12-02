'use strict'; 
const fs = require('fs');
const path = require('path');
// const restaurants = require('../public/jsons/restaurants.json'); 
// console.log(restaurants); // 檢查 restaurants.json 的內容是否正確

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 讀取並解析 JSON 檔案
    const restaurantsData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/jsons/restaurants.json'), 'utf-8'));
    
    // 匯入資料
    await queryInterface.bulkInsert('Restaurants', restaurantsData.results.map(restaurant => ({
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description,
      createdAt: new Date(),
      updatedAt: new Date()
    })));
  },

  async down (queryInterface, Sequelize) {
    // 刪除 Restaurants 表中的所有資料
    await queryInterface.bulkDelete('Restaurants', null, {});
  },
};
