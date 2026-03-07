// Criação de um Order e mapeamento da model para normalização dos dados
const { Order, Item } = require('../models/index');
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

  async getOrderById(id) {
    try {
      const order = await Order.findByPk(id, {
        include: [{ 
          model: Item, 
          as: 'items'
        }]
      });

      if (!order) {
        const error = new Error('Pedido não encontrado');
        error.status = 404;
        throw error;
      }

      return order;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const order = await Order.findAll(
        {
          include: [{
            model: Item,
            as: 'items'
          }]
        });
        return order;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new OrderService();