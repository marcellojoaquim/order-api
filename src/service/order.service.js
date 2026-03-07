// Criação de um Order e mapeamento da model para normalização dos dados
const { Order, Item } = require('../models/index');
const db = require('../config/database');

class OrderService {

  // Criar uma nova Order
  async createOrder(orderDataFromApi) {
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

  // Buscar Order por id
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

  // Buscar todas as Orders
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

  // atualizar uma Order

  async updateOrder(id, orderDataFromApi) {
    const t = await db.transaction();

    try {
      const order = await Order.findByPk(id);
      //validar se existe antes de proceguir com as alterações
      if (!order) {
        throw new Error('Pedido não encontrado');
      }

      const mappedOrderData = {
        value: orderDataFromApi.valorTotal,
        creationDate: orderDataFromApi.dataCriacao
      };

      await order.update(mappedOrderData, { transaction: t });

      await Item.destroy({ where: { orderId: id }, transaction: t });

      const newItems = orderDataFromApi.items.map(item => ({
        orderId: id,
        productId: item.idItem,
        quantity: item.quantidadeItem,
        price: item.valorItem
      }));

      await Item.bulkCreate(newItems, { transaction: t });

      await t.commit();

      return await Order.findByPk(id, { include: [{ model: Item, as: 'items' }] });

    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  // Deletar uma Order
  async deleteOrder(id) {
    const t = await db.transaction();

    try {
      // Valida se existe antes de proceguir com a deleção
      const order = await Order.findByPk(id);
      
      if (!order) {
        const error = new Error('Pedido não encontrado para exclusão');
        error.status = 404;
        throw error;
      }
      //remoção em cascata
      await Item.destroy({
        where: { orderId: id },
        transaction: t
      });

      await Order.destroy({
        where: { orderId: id },
        transaction: t
      });

      await t.commit();
      return { message: `Pedido ${id} removido com sucesso.` };

    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}

module.exports = new OrderService();