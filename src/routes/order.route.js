const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller')
const { verifyToken } = require('../middleware/authToken');

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Cria um order
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.post('/order', verifyToken, orderController.store);

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Buscar uma Order pelo id
 *     responses:
 *       200:
 *         description: Ok
 *       404:
 *         description: Not Found
 */
router.get('/order/:id', verifyToken, orderController.show);

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Busar todas Orders
 *     responses:
 *       200:
 *         description: ok
 *       400:
 *         description: Bad Request
 */
router.get('/order', verifyToken, orderController.findAll);

/**
 * @swagger
 * /order:
 *   put:
 *     summary: Atualizar uma Order pelo id
 *     responses:
 *       200:
 *         description: Ok
 *       404:
 *         description: Not Found
 */
router.put('/order/:id', verifyToken, orderController.updateOrder);

/**
 * @swagger
 * /order:
 *   delete:
 *     summary: remover um pedido
 *     responses:
 *       200:
 *         description: Ok
 *       404:
 *         description: Not Found
 *      400:
 *        description: Bad Request
 */
router.delete('/order/:id', verifyToken, orderController.deleteOrder);


module.exports = router;