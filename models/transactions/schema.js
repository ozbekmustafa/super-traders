const Sequelize = require('sequelize');
const { sequelize } = require('../../config/db_connection.js');

const Transactions = sequelize.define('transactions', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  portfolio_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  share_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  transaction_type: {
    type: Sequelize.ENUM('BUY', 'SELL'),
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  }
});
sequelize.sync();
module.exports = { Transactions };