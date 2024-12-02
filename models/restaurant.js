'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const restaurant = sequelize.define('restaurant', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name_en: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    google_map: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  // class restaurant extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   static associate(models) {
  //     // define association here
  //   }
  // }
  // restaurant.init(
  //   {
  //     name: {
  //       type: DataTypes.STRING,
  //       allowNull: false,
  //     },
  //     name_en: {
  //       type: DataTypes.STRING,
  //       allowNull: false,
  //     },
  //     category: {
  //       type: DataTypes.STRING,
  //       allowNull: false,
  //     },
  //     image: {
  //       type: DataTypes.STRING,
  //       allowNull: false,
  //     },
  //     location: {
  //       type: DataTypes.STRING,
  //       allowNull: false,
  //     },
  //     phone: {
  //       type: DataTypes.STRING,
  //       allowNull: false,
  //     },
  //     google_map: {
  //       type: DataTypes.STRING,
  //       allowNull: false,
  //     },
  //     rating: {
  //       type: DataTypes.DECIMAL(2, 1),
  //       allowNull: false,
  //     },
  //     description: {
  //       type: DataTypes.STRING,
  //       allowNull: false,
  //     },
  //   } , {
  //   sequelize,
  //   modelName: 'restaurant',
  });
  return restaurant;
};