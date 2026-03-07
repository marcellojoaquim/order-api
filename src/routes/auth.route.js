const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');


/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Cria um user
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/signup', authCtrl.signUp);


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Gera o token jwt
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/login', authCtrl.logIn);

module.exports = router;