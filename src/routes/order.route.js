const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const {verifyToken} = require('../middleware/authToken');

/**
 * @swagger
 * /order:
 * post:
 * summary: Cria um novo pedido com transformação de dados
 * tags: [Orders]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * numeroPedido:
 * type: string
 * example: "v10089015vdb-01"
 * valorTotal:
 * type: number
 * example: 10000
 * dataCriacao:
 * type: string
 * format: date-time
 * example: "2023-07-19T12:24:11.5299601+00:00"
 * items:
 * type: array
 * items:
 * type: object
 * properties:
 * idItem:
 * type: string
 * example: "2434"
 * quantidadeItem:
 * type: integer
 * example: 1
 * valorItem:
 * type: number
 * example: 1000
 * responses:
 * 201:
 * description: Pedido criado e mapeado com sucesso
 * 400:
 * description: Erro na validação dos dados ou processamento
 */
router.post('/order', verifyToken, orderController.store);

module.exports = router;