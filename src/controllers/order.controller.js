//Camada controller

const OrderService = require('../service/order.service');
// Salva uma Order
const store = async (req, res) => {
  try {
    const order = await OrderService.createOrder(req.body);
    return res.status(201).json(order);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao processar pedido', details: error.message });
  }
};
// Retornar uma Order por id
const show = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderService.getOrderById(id);
    return res.status(200).json(order);
  } catch (error) {
    const status = error.status || 400;
    return res.status(status).json({ error: 'Erro ao buscar pedido',  details: error.message });
  }
};
// Retorna todas as Orders
const findAll = async(req, res) => {
  try {
    let orders = []
    orders = await OrderService.findAll();
    return res.status(200).json(orders); 
  } catch (error) {
    const status = error.status || 400;
    return res.status(status).json({error: 'Erro ao buscar todos os pedido',  details: error.message})
  }
}
//Atuaiza uma order
const updateOrder = async(req, res) => {
  try {
    const {id} = req.params;
    const order = await OrderService.updateOrder(id, req.body);

    return res.status(200).json(order);
  } catch (error) {
    const status = error.status || 404;
    return res.status(status).json({error: 'Erro ao atualizar pedido',  details: error.message})
  }
}

const deleteOrder = async(req, res) => {
  try {
    const {id} = req.params;
    const result = await OrderService.deleteOrder(id);
    return res.status(200).json(result);
  } catch (error) {
    const status = error.status || 400;
    return res.status(status).json({error: 'Erro ao remover pedido', details: error.message})
  }
}

module.exports = {store, show, findAll, updateOrder, deleteOrder};