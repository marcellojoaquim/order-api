//Camada controller

const OrderService = require('../service/order.service');

const store = async (req, res) => {
  try {
    const order = await OrderService.createOrderWithMapping(req.body);
    return res.status(201).json(order);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao processar pedido', details: error.message });
  }
};

module.exports = {store};