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

module.exports = router;