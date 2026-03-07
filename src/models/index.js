const Sequelize = require('sequelize');
const Order = require('./Order');
const Item = require('./Item');

Order.hasMany(Item, { foreignKey: 'orderId', as: 'items' });
Item.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });


(async () => {
  await Order.sync();
  await Item.sync();
})();

module.exports = {Order, Item};