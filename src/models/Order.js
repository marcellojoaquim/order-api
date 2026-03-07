// Entidade Order

const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database.js');
const Item = require('./Item.js');

const Order = db.define('Order', {
  orderId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  value: {
    type: DataTypes.FLOAT
  },
  creationDate: {
    type: DataTypes.DATE
  }
})

Order.hasMany(Item, 
  {
    foreignKey: 'orderId', 
    as: 'items' 
  });

module.exports = Order;