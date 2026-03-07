// Criação de um Order e mapeamento da model para normalização dos dados

const Order = require('../models/Order');
const Item = require('../models/Item');
const db = require('../config/database');

class OrderService {
  async createOrderWithMapping(orderDataFromApi) {
    const t = await db.transaction();

    try {
      const mappedData = {
        orderId: orderDataFromApi.numeroPedido,
        value: orderDataFromApi.valorTotal,
        creationDate: orderDataFromApi.dataCriacao,
        items: orderDataFromApi.items.map(item => ({
          productId: item.idItem,
          quantity: item.quantidadeItem,
          price: item.valorItem
        }))
      };

      const newOrder = await Order.create(mappedData, {
        include: [{ model: Item, as: 'items' }],
        transaction: t
      });

      await t.commit();
      return newOrder;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}

module.exports = new OrderService();