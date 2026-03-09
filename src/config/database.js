// Arquivo de configuracao de conexão com o banco de dados
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    },
  }
);

// funcao para testar a conexão e retornar no console.
// Usei para um feedback mais rápido durante o desenvolvimento
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Sucesso na conn com o banco');
  } catch (error) {
    console.error('Erro na conn com o banco', error);
  }
}

testConnection();

module.exports = sequelize;