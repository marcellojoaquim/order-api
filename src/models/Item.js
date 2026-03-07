/*
abela: Items
○ Coluna: orderId
○ Coluna: productId
○ Coluna: quantity
○ Coluna: price
*/

const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database.js');


const Item = db.define('Item', {
  productId: {
    type: DataTypes.STRING, 
    primaryKey: true,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER, 
    allowNull: false
  },
  price: {
      type: DataTypes.FLOAT,
      allowNull: false
  }
})


module.exports = Item;