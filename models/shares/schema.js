const Sequelize = require('sequelize');
const { sequelize } = require('../../config/db_connection');

const Shares = sequelize.define('shares', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  symbol: {
    type: Sequelize.STRING(3),
    allowNull: false,
    unique: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  }
});
sequelize.sync();
module.exports = { Shares };