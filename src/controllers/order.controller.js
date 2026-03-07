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

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderService.getOrderById(id);
    return res.status(200).json(order);
  } catch (error) {
    const status = error.status || 400;
    return res.status(status).json({ error: error.message });
  }
};

const findAll = async(req, res) => {
  try {
    var orders = []
    orders = await OrderService.findAll();
    return res.status(200).json(orders); 
  } catch (error) {
    const status = error.status || 400;
    return res.status(status).json({error: error.message})
  }
}

module.exports = {store, show, findAll};