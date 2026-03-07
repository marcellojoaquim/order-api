const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database.js');
const bcrypt = require('bcryptjs');


// Mapeamento do usuário que irá ter acesso as rotas de pedidos
/*
const User = db.define('users', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
*/

const User = db.define('users', {
  id: {
    type: DataTypes.INTEGER, 
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true 
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users',
  underscored: true 
});
// Encriitação e validação da senha do usuário

User.encryptPWD = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

User.comparePWD = async(password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
};

module.exports = User;