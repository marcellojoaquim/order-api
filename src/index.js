const express = require('express');
const sequelize= require('sequelize');
const authRoute = require('./routes/auth.route');
const User = require('./models/User');

const db = require('./config/database');
const port = 3000;

const app = express();

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

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/auth', authRoute);

app.listen(port, ()=>{
  console.log(`server running at port ${port}`);
})