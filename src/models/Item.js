/*
abela: Items
○ Coluna: orderId
○ Coluna: productId
○ Coluna: quantity
○ Coluna: price
*/

const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database.js');

const Item = db.define('Items', {
  idItem: {
    type: DataTypes.INTEGER, 
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  quantidadeItem: {
    type: DataTypes.INTEGER, 
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  valorItem: {
      
  }
})