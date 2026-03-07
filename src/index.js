const express = require('express');
const sequelize= require('sequelize');
const authRoute = require('./routes/auth.route');
const User = require('./models/User');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const db = require('./config/database');
const port = 3000;

const app = express();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Order API',
    version: '1.0.0',
  },
};

(async () => {
  db.authenticate().then(()=>{
    console.log('conexao com sucesso')
  }).catch((err)=>{
    console.log(err)
  })
})();

(async () => {
  await User.sync();
})();

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js', './routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/auth', authRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(port, ()=>{
  console.log(`server running at port ${port}`);
})